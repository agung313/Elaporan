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
use Illuminate\Support\Facades\URL;

class DocumentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index(Request $request)
    {
        if(Auth::user()->role == 'kasum' || Auth::user()->role == 'admin'){

            if ($request->id_dokumen) {
                $document = Document::where('documents.id',$request->id_dokumen)->get();

            } elseif ($request->id_user) {

                $document = Document::where('id_user',$request->id_user)
                                        ->where('bulan', $request->bulan)
                                        ->where('tahun', $request->tahun)
                                        ->get();
            }elseif ($request->countNew) {

                $document = Document::where('status','diajukan')->count();

                return response()->json([
                    'jumlah' => $document
                    ],200);                
            } else {
            
                $document = Document::select('documents.*','users.name','users.jabatan','profiles.foto')
                    ->join('users','users.id', '=', 'documents.id_user')
                    ->join('profiles','profiles.id_user', '=', 'documents.id_user')
                    // ->whereMonth('documents.bulan', $request->bulan)
                    ->where('documents.status','not like','draft')
                    ->orderBy('documents.id','DESC')
                    ->orderBy('documents.status','ASC')
                    ->get();
            }

        } else{

            $document = Document::select('documents.*','users.name','users.jabatan')
                        ->join('users','users.id', '=', 'documents.id_user')
                        ->where('documents.bulan', $request->bulan)
                        ->where('documents.tahun', $request->tahun)                        
                        // ->where('documents.status',$request->status)
                        ->where('documents.id_user',Auth::user()->id)
                        ->get();
        }

        return response(DocumentResource::collection($document));
    }

    public function store(Request $request)
    {
        $idUser = Auth::user()->id;

        $kendala = $request->kendala;
        $status = $request->status;
        $tahun = $request->tahun;

        $bulan =  Carbon::create(Carbon::create(null, $request->bulan,1), 'Asia/Jakarta')->isoFormat('MMMM');

        $checkData = Document::where('id_user',$idUser)->where('bulan',$request->bulan)->where('tahun',$tahun)->first();

                
        if ($checkData) {
            //store pdf path ke database

            // if ($status == 'diajukan') {

            //     if ($this->checkLaporan($idUser, $bulan)) {
            //         return response()->json([
            //             'messages' => 'silahkan lengkapi laporan kerja terlebih dahulu'
            //         ],400);
            //     }        
            // }
                        
            $dokument = Document::findorNew($checkData->id);
            $dokument->status = $status;
            $dokument->kendala = $kendala;
            $dokument->save();

            return response()->json([
                'messages' => 'laporan diupdate',
                'data' => $dokument
                ],200);

        } else {


            // validasi laporan
            // if ($status == 'diajukan') {

            //     if ($this->checkLaporan($idUser, $bulan)) {
            //         return response()->json([
            //             'messages' => 'silahkan lengkapi laporan kerja terlebih dahulu'
            //         ],400);
            //     }        
            // }
            $getFoto = User::select('profiles.ttd')
                        ->join('profiles','profiles.id_user', '=', 'users.id')
                        ->where('users.id', $idUser)
                        ->first();

            //user
            $query = User::select('users.*','profiles.foto','profiles.latar_belakang','profiles.tujuan','profiles.ruang_lingkup','profiles.isComplete')
                        ->join('profiles','profiles.id_user', '=', 'users.id')
                        ->where('users.id', $idUser)
                        ->first();

            if ($query) {
                $query->tahun = $tahun;
                $query->kendala = $kendala;
                $query->bulan = $bulan;
                $query->URL = URL('storage/'.$getFoto->ttd );
            }


            if ($query->isComplete == false){
                return response()->json([
                    'messages' => 'silahkan lengkapi data profile anda terlebih dahulu'
                ],400);
            }


            //absensi
            $query2 = Absensi::select('absensis.*')
                        ->join('users', 'users.id', '=', 'absensis.id_user')
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
                        ->join('users', 'users.id', '=', 'absensis.id_user')
                        ->where('users.id', $idUser)
                        ->get();

            $pdf = PDF::loadView('pdf.template', ['user' => $query, 'absensi' => $query2, 'laporan' => $query3, 'kendala' => $kendala]);

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
            $document->status = $status;
            $document->bulan = $request->bulan;
            $document->kendala = $kendala;
            $document->tahun = $tahun;
            $document->save();

            return response()->json([
                'messages' => 'laporan diteruskan ke kasubag umum',
                'data' => $document
                ],200);

        }
        
    }

    function saveFile() {
        
    }


    public function checkLaporan($idUser, $bulan){
        //validasi laporan
        $laporanIds = Laporan::join('Absensis','absensis.id','=','laporans.id_absensi')
                    ->join('users','users.id', '=', 'absensis.id_user')
                    ->where('users.id', $idUser)
                    ->pluck('laporans.id_absensi')
                    ->toArray();
        $absensiIds = Absensi::where('absensis.status', 'hadir')
                    ->join('users','users.id', '=', 'absensis.id_user')
                    ->whereMonth('absensis.tanggal',$bulan)
                    ->where('users.id', $idUser)
                    ->where(function($q){
                        $q->where('absensis.status','hadir kegiatan')->orWhere('absensis.status','hadir');
                    })
                    ->pluck('absensis.id')
                    ->toArray();

        $missingIds = array_diff($absensiIds, $laporanIds);
        

        // check apakah ada selsisih antara 2 variable.Jika tidak null / jika ada selisih kembalikan tru 
        if ($missingIds !== null){
            return true;
        }        

        return false;
    }

    public function approve(Request $request, $id)
    {
        $role = Auth::user()->role;

        if ($role == "admin" || $role == "kasum"){

            $doc = Document::where('id',$id)->first();
            $saran = $doc->saran;
            $kendala = $doc->kendala;
            $bulan = $doc->bulan;
            $tahun= $doc->tahun;
            $catatan = $request->catatan;

            //user
            $query = User::select('users.*','profiles.foto','profiles.latar_belakang','profiles.tujuan','profiles.ruang_lingkup')
                        ->join('Profiles','profiles.id_user', '=', 'users.id')
                        ->where('users.id', $doc->id_user)
                        ->first();
            if ($query) {
                $query->tahun = $tahun;
                $query->kendala = $kendala;
                $query->bulan = $bulan;
                $query->catatan = $catatan;
            }

            //absensi
            $query2 = Absensi::select('absensis.*')
                        ->join('users', 'users.id', '=', 'absensis.id_user')
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
                        ->join('users', 'users.id', '=', 'absensis.id_user')
                        ->where('users.id', $doc->id_user)
                        ->get();

            $pdf = PDF::loadView('pdf.template', ['user' => $query, 'absensi' => $query2, 'laporan' => $query3, 'kendala' => $kendala, 'catatan' => $catatan]);

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
            $dokument->catatan = $catatan;
            $dokument->status = "diapprove";
            $dokument->save();

            return response()->json([
                'message' => 'laporan berhasil diapprove',
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

    public function destroy($id)
    {
        $delete = Document::findOrFail($id);

        $fotoPath = storage_path()."/app/public".$delete->path;
        File::delete($fotoPath);

        $delete->delete();

        return response()->json([
            'message' => 'kegiatan berhasil dihapus'
        ],200);
    }
}
