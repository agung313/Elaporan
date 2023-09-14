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
use Illuminate\Support\Facades\DB;
// use Spatie\PdfToImage\Pdf;
use TCPDF;

use App\Traits\FireNotif;

class DocumentController extends Controller
{
    use FireNotif;

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
                    // ->orderBy('documents.status','ASC')
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

        if ($status == 'diajukan') {

            if ($this->checkLaporan($idUser, $bulan, $tahun)) {
                return response()->json([
                    'messages' => 'silahkan lengkapi laporan kerja terlebih dahulu'
                ],400);
            }        
        }
        
        // $getFoto = User::select('profiles.ttd')
        //             ->join('profiles','profiles.id_user', '=', 'users.id')
        //             ->where('users.id', $idUser)
        //             ->first();

        $getNama = User::select('name')->where('role','kasum')->first();

        //user
        $query = User::select('users.*','profiles.ttd','profiles.foto','profiles.latar_belakang','profiles.tujuan','profiles.ruang_lingkup','profiles.isComplete')
                    ->join('profiles','profiles.id_user', '=', 'users.id')
                    ->where('users.id', $idUser)
                    ->first();

        if ($query) {
            $query->tahun = $tahun;
            $query->kendala = $kendala;
            $query->bulan = $bulan;
            // $query->URL = URL('storage'.$getFoto->ttd );
            $query->nama_kasum = $getNama->name;
        }


        if ($query->isComplete == false){
            return response()->json([
                'messages' => 'silahkan lengkapi data profile anda terlebih dahulu'
            ],400);
        }

        //absensi
        $query2 = Absensi::whereMonth('tanggal', $request->bulan)
                    ->whereYear('tanggal', $request->tahun)                    
                    ->where('id_user', $idUser)
                    ->get();

        $query2->transform(function ($item) {
            $tanggal = Carbon::createFromFormat('Y-m-d', $item->tanggal);
            $item->tanggal = $tanggal->translatedFormat('l, j F Y');
            return $item;
        });

        //laporan
        $query3 = Laporan::select('laporans.*')
                    ->join('absensis','absensis.id', 'laporans.id_absensi')
                    ->whereMonth('absensis.tanggal', $request->bulan)
                    ->whereYear('absensis.tanggal', $request->tahun)                    
                    ->where('id_user', $idUser)
                    ->get();

        $arrLaporan = array();


        foreach ($query3 as $lp) {

            if (!array_key_exists($lp->id_absensi,$arrLaporan)) {
                $arrLaporan[$lp->id_absensi]=[];            
            }
            array_push($arrLaporan[$lp->id_absensi], $lp);
            
        }
        
        $pdf = PDF::loadView('pdf.template', ['user' => $query, 'absensi' => $query2, 'laporan' => $arrLaporan, 'kendala' => $kendala]);

        // $testPDF = $this->generatePDF($query, $query2, $query3);

        $filePath = storage_path('app/public/pdf/hasil.pdf');

        $directory = dirname($filePath);

        if (!File::isDirectory($directory)) {
            File::makeDirectory($directory, 0755, true, true);
        }
        
        $pdf->save($filePath); 

        $path = Storage::disk('public')->putFile('pdf', $filePath);
        $stream = $pdf->stream();
        
        // $filePath = storage_path('app/public/pdf/hasil.pdf');
        
        File::put($filePath, $stream);

        // dd('stoppp');

        $checkData = Document::where('id_user',$idUser)->where('bulan',$request->bulan)->where('tahun',$tahun)->first();
                
        if ($checkData) {
            //store pdf path ke database

            if ($status == 'diajukan') {

                if ($this->checkLaporan($idUser, $bulan,$tahun)) {
                    return response()->json([
                        'messages' => 'silahkan lengkapi laporan kerja terlebih dahulu'
                    ],400);
                }        
            }
                        
            $dokument = Document::findorNew($checkData->id);
            $dokument->status = $status;
            $dokument->kendala = $kendala;
            $dokument->path= $path;
            $dokument->save();

            return response()->json([
                'messages' => 'laporan diupdate',
                'data' => $dokument
                ],200);

        } else{

            //store pdf path ke database
            $document = New Document;
            $document->id_user = $idUser;
            $document->path = $path;
            $document->status = $status;
            $document->bulan = $request->bulan;
            $document->kendala = $kendala;
            $document->tahun = $tahun;
            $document->save();

        }    
        if ($document && strtolower($document->status) == 'diajukan') {

            $this->notifKasum('Pengajuan Laporan Bulanan','Anda Menerima Pengajuan Laporan Bulanan');
        }

        return response()->json([
            'messages' => 'laporan diupload',
            'data' => $document
            ],200);        
    }

    public function generatePDF($query, $query2, $query3)
{
    $pdf = new TCPDF();
    $pdf->SetPrintHeader(true);
    $pdf->SetPrintFooter(true);
    $pdf->AddPage();

    // Buat konten PDF sesuai dengan template Anda
    $pdf->SetFont('helvetica', '', 12);
    $pdf->SetTextColor(0, 0, 0);

    // Tambahkan konten ke PDF, misalnya:
    // $pdf->Cell(0, 10, 'Hello, TCPDF!', 0, 1);

    // Menggunakan template HTML
    $template = view('pdf.template1', [
        'user' => $query, 
        'absensi' => $query2,
        'laporan' => $query3,
    ])->render();
    
    $pdf->writeHTML($template, true, false, true, false, '');

    // Simpan PDF atau kirim sebagai respons
    // $pdf->Output('example.pdf', 'I'); // I: Tampilkan dalam browser, D: Simpan ke file
    $pdf->Output(storage_path('app/public/pdf/hasil.pdf'), 'F');
}



    // cek apakah ada laporan yg sudah diajukan/ diapprove kasum pada bulan dan tahun tsb dg id user
    function checkLaporanDiajukan(Request $request) {
        
        $id_user = $request->idUser;
        $bulan = $request->bulan;
        $tahun = $request->tahun;

        if (Auth::user()->role == 'user' ) {
            $id_user = Auth::user()->id;
        }

        $doc = Document::where('tahun', $tahun)
                        ->where('bulan', $bulan)
                        ->where('id_user', $id_user)
                        ->first();

        return response()->json([
            'message' => 'berhasil mengambil data',
            'data' => $doc ? $doc->status : null
        ]);

    }

    public function checkLaporan($idUser, $bulan, $tahun){

        $idAbsensi = Absensi::select('id')
                            ->whereMonth('absensis.tanggal', $bulan)
                            ->whereYear('absensis.tanggal', $tahun)                    
                            ->where('id_user', $idUser)
                            ->get();
        
        $check = Laporan::select('id_absensi')->whereIn('id_absensi', $idAbsensi)->groupBy('id_absensi')->get();

        if (count($idAbsensi) !== count($check)) {
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

            $getFoto = User::select('profiles.ttd','users.name')
                    ->join('profiles','profiles.id_user', '=', 'users.id')
                    ->where('users.id', Auth::user()->id)
                    ->first();
            //user
            $query = User::select('users.*','profiles.ttd','profiles.foto','profiles.latar_belakang','profiles.tujuan','profiles.ruang_lingkup')
                        ->join('profiles','profiles.id_user', '=', 'users.id')
                        ->where('users.id', $doc->id_user)
                        ->first();
            if ($query) {
                $query->tahun = $tahun;
                $query->kendala = $kendala;
                $query->bulan = $bulan;
                $query->catatan = $catatan;
                $query->nama_kasum = $getFoto->name;
                $query->URL_Kasum = $getFoto->ttd;
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
                        ->join('absensis','absensis.id', 'laporans.id_absensi')
                        ->join('users', 'users.id', '=', 'absensis.id_user')
                        ->where('users.id', $doc->id_user)
                        ->get();
            $arrLaporan = array();


            foreach ($query3 as $lp) {
    
                if (!array_key_exists($lp->id_absensi,$arrLaporan)) {
                    $arrLaporan[$lp->id_absensi]=[];            
                }
                array_push($arrLaporan[$lp->id_absensi], $lp);
                
            }

            $pdf = PDF::loadView('pdf.template', ['user' => $query, 'absensi' => $query2, 'laporan' => $arrLaporan, 'kendala' => $kendala, 'catatan' => $catatan]);

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
            $dokument->status = $request->status;
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
