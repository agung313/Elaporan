<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PDF;
use App\Models\Absensi;
use App\Models\Laporan;
use App\Models\Document;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\Document as DocumentResource;
setlocale(LC_TIME, 'id_ID');

class DocumentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index(Request $request)
    {
        if(Auth::user()->role == 'kasum' || Auth::user()->role == 'admin'){
            $document = Document::select('documents.*','users.name','users.jabatan')
                    ->join('Users','users.id', '=', 'documents.id_user')
                    ->whereMonth('documents.tanggal', $request->bulan)
                    ->where('documents.status',$request->status)
                    ->get();
        }else{
            $document = Document::select('documents.*','users.name','users.jabatan')
                        ->join('Users','users.id', '=', 'documents.id_user')
                        ->whereMonth('documents.tanggal', $request->bulan)
                        ->where('documents.status',$request->status)
                        ->where('documents.id_user',Auth::user()->id)
                        ->get();
        }

        return response()->json([
            'data' => $document
        ]);
    }

    public function store(Request $request)
    {
        $idUser = Auth::user()->id;

        $tanggal = $request->bulan;
        $carbon = Carbon::createFromFormat('m-Y', $tanggal);

        $tahun = $carbon->year;
        $saran = $request->saran;
        $kendala = $request->kendala;
        $bulan = $carbon->translatedFormat('F');

        //user
        $query = User::select('users.*','profiles.foto','profiles.latar_belakang','profiles.tujuan','profiles.ruang_lingkup')
                    ->join('Profiles','profiles.id_user', '=', 'users.id')
                    ->where('users.id', $idUser)
                    ->first();
        if ($query) {
            $query->tahun = $tahun;
            $query->saran = $saran;
            $query->kendala = $kendala;
            $query->bulan = $bulan;
        }

        //absensi
        $query2 = Absensi::select('absensis.*')
                    ->join('Users', 'users.id', '=', 'absensis.id_user')
                    ->where('users.id', $idUser)
                    ->get();

        $query2->transform(function ($item) {
            $tanggal = Carbon::createFromFormat('Y-m-d', $item->tanggal);
            $item->tanggal = $tanggal->translatedFormat('l, j F Y');
            return $item;
        });

        //laporan
        $query3 = Laporan::select('laporans.*')
                    ->join('Absensis','absensis.id', 'laporans.id_absensi')
                    ->join('Users', 'users.id', '=', 'absensis.id_user')
                    ->where('users.id', $idUser)
                    ->get();

        //validasi laporan
        $laporanIds = Laporan::pluck('id_absensi')->toArray();
        $absensiIds = Absensi::where('status', 'hadir')->whereMonth('tanggal',$request->bulan)->pluck('id')->toArray();
        $missingIds = array_diff($absensiIds, $laporanIds);

        // if ($missingIds !== null){

        //     return response()->json([
        //         'messages' => 'silahkan lengkapi laporan kerja terlebih dahulu'
        //     ],400);
        // }

        $pdf = PDF::loadView('pdf.template', ['user' => $query, 'absensi' => $query2, 'laporan' => $query3, 'kendala' => $request]);

        $filePath = storage_path('app/public/pdf/hasil.pdf');

        $directory = dirname($filePath);

        if (!File::isDirectory($directory)) {
            File::makeDirectory($directory, 0755, true, true);
        }

        $pdf->save($filePath);

        $path = Storage::disk('public')->putFile('pdf', $filePath);

        //store pdf path ke database
        $document = New Document;
        $document->id_user = $idUser;
        $document->path = $path;
        $document->status = 'verifikasi';
        $document->bulan = $request->bulan;
        $document->saran = $request->solusi;
        $document->kendala = $request->kendala;
        $document->save();

        return response()->json([
            'messages' => 'laporan diteruskan ke kasubag umum',
            'data' => $document
         ],200);
    }

    public function approve(Request $request, $id)
    {
        $role = Auth::user()->role;

        if ($role == "admin" || $role == "kasum"){

            $tanggal = $request->bulan;
            $carbon = Carbon::createFromFormat('m-Y', $tanggal);

            $tahun = $carbon->year;

            $doc = Document::where('id',$id)->first();
            $saran = $doc->saran;
            $kendala = $doc->kendala;
            $bulan = $carbon->translatedFormat('F');
            $catatan = $request->catatan;

            //user
            $query = User::select('users.*','profiles.foto','profiles.latar_belakang','profiles.tujuan','profiles.ruang_lingkup')
                        ->join('Profiles','profiles.id_user', '=', 'users.id')
                        ->where('users.id', $doc->id_user)
                        ->first();
            if ($query) {
                $query->tahun = $tahun;
                $query->saran = $saran;
                $query->kendala = $kendala;
                $query->bulan = $bulan;
                $query->catatan = $catatan;
            }

            //absensi
            $query2 = Absensi::select('absensis.*')
                        ->join('Users', 'users.id', '=', 'absensis.id_user')
                        ->where('users.id', $doc->id_user)
                        ->get();

            $query2->transform(function ($item) {
                $tanggal = Carbon::createFromFormat('Y-m-d', $item->tanggal);
                $item->tanggal = $tanggal->translatedFormat('l, j F Y');
                return $item;
            });

            //laporan
            $query3 = Laporan::select('laporans.*')
                        ->join('Absensis','absensis.id', 'laporans.id_absensi')
                        ->join('Users', 'users.id', '=', 'absensis.id_user')
                        ->where('users.id', $doc->id_user)
                        ->get();

            $pdf = PDF::loadView('pdf.template', ['user' => $query, 'absensi' => $query2, 'laporan' => $query3, 'kendala' => $request]);

            $filePath = storage_path('app/public/pdf/hasil.pdf');

            $directory = dirname($filePath);

            if (!File::isDirectory($directory)) {
                File::makeDirectory($directory, 0755, true, true);
            }

            $pdf->save($filePath);

            $pathGas = Storage::disk('public')->putFile('pdf', $filePath);
            // dd($pathGas);

            //hapus file pdf di storage
            $pathDelete = $doc->path;

            if (Storage::disk('public')->exists($pathDelete)) {
                Storage::disk('public')->delete($pathDelete);

            }

            //update file di 
            $dokument = Document::findorNew($id);
            $dokument->path = $pathGas;
            $dokument->status = "selesai";
            $dokument->save();

            return response()->json([
                'message' => 'laporan berhasil terverifikasi',
                'data' => $dokument
            ]);
        }else{
            return response()->json([
                'error' => 'error',
                'messages' => 'maaf silahkan menghubungi admin atau kasum untuk melakukan aksi'
            ],401);
        }
    }

    public function update(Request $request, $id)
    {
        //
    }
}
