<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Absensi;
use App\Models\Laporan;
use App\Models\Libur;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use App\Http\Resources\Absen as AbsenResource;
use App\Http\Resources\AbsenPengajuan as AbsenPengajuanResource;

class AbsensiController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index(Request $request)
    {
        if($request->detail){

            // $absen = Absensi::where('id_user', Auth::user()->id)->where('id', $request->id)->get();
            $absen = Absensi::select('absensis.*','users.name AS nama','users.jabatan AS jabatan','profiles.foto AS fotoProfile')
                            ->join('users','users.id','absensis.id_user')
                            ->join('profiles','profiles.id_user', 'users.id')
                            ->where('absensis.id', $request->id)
                            ->first();
            $hari = Carbon::createFromFormat('Y-m-d', $absen->tanggal, 'Asia/Jakarta')->isoFormat('dddd');
            $tanggal =  Carbon::parse($absen->tanggal)->isoFormat('D MMMM Y');
            $absen->tanggal = $hari.', '.$tanggal;

            $absen->fotoProfile = URL('storage/'.$absen->fotoProfile);
            $absen->foto = URL('storage/'.$absen->foto);

            return response()->json([
                'messages' => 'fetch data detail successfully',
                'data' => $absen
            ],200);            

        }else if($request->isApprove){
            $absen = Absensi::where('isApprove', false)->get();

        }elseif ($request->izinSakit) {

            $absen = Absensi::select('absensis.*', 'users.name','users.jabatan')->join('users','users.id','absensis.id_user')->where('isApprove',0)->get();

            return response(AbsenPengajuanResource::collection($absen));
            // return ['data'=> $absen];

        }else{
            $absen = Absensi::where('id_user', Auth::user()->id)->orderBy('tanggal','DESC')->get();
        }
        

        return response(AbsenResource::collection($absen));
    }

    // get jumlah pengajuan sakit/izin belum di approve
    function countNoAcc(Request $request){
        $id = Auth::user()->id; 
        $data = Absensi::where('id_user', $id)->where('isApprove',0)->count();
        
        return response()->json([
            'messages' => 'success',
            'data' => $data
        ]);
    }

    public function store(Request $request)
    {
        $id = Auth::user()->id;
        $tanggal = Carbon::now()->toDateString();
        $waktu = Carbon::now()->toTimeString();

        $absensi = Absensi::where('id_user', $id)
            ->whereDate('tanggal', $tanggal)
            ->first();
        
        if($absensi !== null){
    
            $absen = Absensi::updateOrCreate(
                ['id_user' => $id, 'tanggal' => $tanggal],
                ['waktu_pulang' => $waktu,'keterangan_pulang' => $request->keterangan_pulang]
            );

            return response()->json([
                'messages' => 'absensi pulang berhasil',
                'data' => $absen
            ]);

        }else{
            if($request->foto){
                $path = $request->file('foto')->store('public');
                $path = preg_replace('/public/','', $path);

                $absen = Absensi::create([
                    'id_user' => $id,
                    'status' => $request->status,
                    'foto' => $path,
                    'keterangan_hadir' => $request->keterangan_hadir,
                    'waktu_hadir' => $request->status == 'hadir' || $request->status == 'hadir kegiatan' ? $waktu : null,
                    'tanggal' => $tanggal,
                    'longtitude' => $request->status == 'hadir' || $request->status == 'hadir kegiatan' ? $request->longtitude : null,
                    'latitude' => $request->status == 'hadir' || $request->status == 'hadir kegiatan' ? $request->latitude : null,
                    'isApprove' => $request->status == 'hadir' || $request->status == 'hadir kegiatan' ? true : false
                ]);

                return response()->json([
                    'messages' => 'absensi hadir berhasil',
                    'data' => $absen
                ]);

            }else{
                $absen = Absensi::create([
                    'id_user' => $id,
                    'status' => $request->status,
                    'keterangan_hadir' => $request->keterangan_hadir,
                    'waktu_hadir' => $request->status == 'hadir' || $request->status == 'hadir kegiatan' ? $waktu : null,
                    'tanggal' => $tanggal,
                    'longtitude' => $request->status == 'hadir' || $request->status == 'hadir kegiatan' ? $request->longtitude : null,
                    'latitude' => $request->status == 'hadir' || $request->status == 'hadir kegiatan' ? $request->latitude : null,
                    'isApprove' => $request->status == 'hadir' || $request->status == 'hadir kegiatan' ? true : false
                ]);

                return response()->json([
                    'messages' => 'absensi hadir berhasil',
                    'data' => $absen
                ]);
            }
        }
    }

    //belum jadi karena ngk nampak tampilan seperti apa
    function absenAdmin(Request $request, $id){
        if (Auth::user()->role == 'admin' || (Auth::user()->role == 'kasum')){
            $absen = Absensi::findorNew($id)([
                'status' => $request->status,
                'keterangan_hadir' => $request->keterangan_hadir,
                'waktu_hadir' => $request->waktu,
                'tanggal' => $request->tanggal
            ]);

            return response()->json([
                'messages' => 'absensi berhasil',
                'data' => $absen
            ],200);
        }else{
            return response()->json([
                'messages' => 'anda tidak memiliki akses',
            ],402);
        } 
    }

    function cekAbsen() {

        $id = Auth::user()->id;
        $tanggal = Carbon::now()->toDateString();
        $waktu = Carbon::now()->toTimeString();
        $absenPulang = Carbon::parse('12:00:00');
        $cek = Absensi::where('tanggal',$tanggal)->first();
        $status;

        if ($cek != null){
            if ($cek->status == 'Sakit'){
                $status = 'Anda sakit';
            }else if($cek->status == 'Izin'){
                $status = 'Anda izin';
            }else if (Carbon::now()->gte($absenPulang)){
                $status = 'sudah bisa absen pulang';
            }else{
                $status = 'belum bisa absen pulang';
            }
            
        }else{
            $status = 'belum absen datang';
        }
        

        if ($cek){
            $cek->status = $status;
        }

        return response()->json([
            'data' => $cek,
            'status' => $cek == null ? $status : $cek->status,

        ]);
    }

    function acceptIzin(Request $request, $id) {
        if (Auth::user()->role == 'admin' || (Auth::user()->role == 'kasum')){

            $cekStatus = Absensi::select('status')->where('id', $id)->first();
            
            //accept izin
            $absen = Absensi::findorNew($id);
            $absen->isApprove = $request->status;
            $absen->catatan_kasum = $request->catatan;
            $absen->save();

            return response()->json([
                'messages' => 'absen create successfully',
                'data' => $absen
            ],200);
        }else{
            return response()->json([
                'messages' => 'anda tidak memiliki akses',
            ],402);
        } 
    }

    function updateLibur(Request $request){
        $role = Auth::user()->role;
        $hari = Carbon::createFromFormat('Y-m-d', $request->tanggal, 'Asia/Jakarta')->isoFormat('dddd');
        if($role == 'admin' || $role == 'kasum'){
            
            $libur = Libur::create([
                'tanggal' => $request->tanggal,
                'ket' => $request->ket,
                'day' => $hari
            ]);

            return response()->json([
                'messages' => 'update tanggal libur berhasil',
                'data' => $libur
            ]);
        }else{
            return response()->json([
                'messages' => 'anda tidak memiliki akses',
            ],402);
        }
    }

    function listLibur(Request $request){
        $role = Auth::user()->role;
        if($role == 'admin' || $role == 'kasum'){
            
            $libur = Libur::all();

            return response()->json([
                'messages' => 'list tanggal libur',
                'data' => $libur
            ]);
        }else{
            return response()->json([
                'messages' => 'anda tidak memiliki akses',
            ],402);
        }
    }

}