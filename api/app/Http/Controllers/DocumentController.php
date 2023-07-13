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

    public function index()
    {
        //
    }

    public function store(Request $request)
    {
        $idUser = Auth::user()->id;

        $getTahun = Carbon::now();
        $tahun = $getTahun->year;
        $saran = $request->saran;
        $kendala = $request->kendala;
        $bulan = $getTahun->translatedFormat('F');

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

        $pdf = PDF::loadView('pdf.template', ['user' => $query, 'absensi' => $query2, 'laporan' => $query3, 'kendala' => $request]);

        $filePath = storage_path('app/public/pdf/hasil.pdf');

        $directory = dirname($filePath);
            if (!File::isDirectory($directory)) {
                File::makeDirectory($directory, 0755, true, true);
            }

        // Save the PDF to the specified file path
        $pdf->save($filePath);

        $path = Storage::disk('public')->putFile('pdf', $filePath);

        $now = Carbon::now();
        $bulan = $now->format('M Y');

        //store pdf path ke database
        $document = New Document;
        $document->id_user = $idUser;
        $document->path = $path;
        $document->status = 'Kasum';
        $document->bulan = $bulan;
        $document->saran = $request->solusi;
        $document->kendala = $request->kendala;
        $document->save();

        return response()->json([
            'messages' => 'laporan diteruskan ke kasubag umum'
        ]);

    }

    public function cetakPDF($laporans)
    {
        // dd($laporans);
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
