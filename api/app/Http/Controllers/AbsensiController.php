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
use Carbon\CarbonPeriod;
use App\Http\Resources\Absen as AbsenResource;
use App\Http\Resources\Libur as LiburResource;
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

            $absen->realTanggal = $absen->tanggal;                            
            $hari = Carbon::createFromFormat('Y-m-d', $absen->tanggal, 'Asia/Jakarta')->isoFormat('dddd');
            $tanggal =  Carbon::parse($absen->tanggal)->isoFormat('D MMMM Y');
            $absen->tanggal = $hari.', '.$tanggal;


            $absen->fotoProfile = URL('storage/'.$absen->fotoProfile);
            $absen->foto = $absen->foto ? URL('storage/'.$absen->foto) : null;

            return response()->json([
                'messages' => 'fetch data detail successfully',
                'data' => $absen
            ],200);            

        }else if($request->isApprove){
            $absen = Absensi::where('isApprove', 'ditolak')->get();

        }else if ($request->izinSakit) {

            if (Auth::user()->role == 'admin') {

                $absen = Absensi::select('absensis.*', 'users.name','users.jabatan')
                                    ->join('users','users.id','absensis.id_user')
                                    ->where('isApprove','diterima')
                                    ->where(function($q){
                                        $q->where('absensis.status','izin')
                                            ->orWhere('absensis.status','sakit');
                                    })
                                    ->orderBy('approveAdmin','ASC')
                                    ->get();

            }elseif (Auth::user()->role == 'kasum') {

                $absen = Absensi::select('absensis.*', 'users.name','users.jabatan')
                                    ->join('users','users.id','absensis.id_user')
                                    ->where('isApprove','diajukan')
                                    ->get();            
            }else{

                $absen = Absensi::select('absensis.*', 'users.name','users.jabatan')
                                    ->join('users','users.id','absensis.id_user')
                                   ->where('absensis.id_user', Auth::user()->id)
                                    ->where(function($q){
                                        $q->where('isApprove','ditolak')
                                            ->orWhere('isApprove','diajukan');
                                    })
                                    ->orderBy('approveAdmin','ASC')
                                    ->get();
            }
            return response(AbsenPengajuanResource::collection($absen));
            // return ['data'=> $absen];
        }else if ($request->approveAdmin) {

            $absen = Absensi::where('approveAdmin', 0)->orderBy('id','DESC')->get();

        }else{
            $absen = Absensi::where('id_user', Auth::user()->id)->orderBy('tanggal','DESC')->get();
        }
        

        return response(AbsenResource::collection($absen));
    }

    // get jumlah pengajuan sakit/izin belum di approve
    function countNoAcc(Request $request){
        $id = Auth::user()->id; 
        $data = Absensi::where('id_user', $id)->where('isApprove','diajukan')->count();
        
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
            //buat update absensi
            
            if($absensi->isApprove == 'ditolak'){ //jika status izin/sakit di tolak admin maka dia bisa mengulangi izinnya atau dia bisa absen
                //buat hapus file dan upload file foto
                if($request->foto){
                    $pathToFile = 'path/ke/file/gambar.jpg'; // Ganti dengan path file yang sesuai
                    Storage::delete($pathToFile);

                    $path = $request->file('foto')->store('public');
                    $path = preg_replace('/public/','', $path);
                }
                
                $absen = Absensi::findOrNew($absensi->id);
                $absen->id_user = $id;
                $absen->status = $request->status;
                $absen->foto = $request->foto ? $path : null;
                $absen->keterangan_hadir = $request->keterangan_hadir;
                $absen->waktu_hadir = $request->status == 'hadir' || $request->status == 'hadir kegiatan' ? $waktu : null;
                $absen->tanggal = $tanggal;
                $absen->longitude = $request->status == 'hadir' || $request->status == 'hadir kegiatan' ? $request->longitude : null;
                $absen->latitude = $request->status == 'hadir' || $request->status == 'hadir kegiatan' ? $request->latitude : null;
                $absen->isApprove = $request->status == 'hadir' || $request->status == 'hadir kegiatan' ? 'diterima' : 'diajukan';
                $absen->save();

                return response()->json([
                    'messages' => 'absensi berhasil',
                    'data' => $absen
                ]);
            }else if($absensi->isApprove == 'diajukan' || $absensi->approveAdmin == false){ //jika sudah melakukan absen izin/sakit yang diajukan/diterima
                return response()->json([
                    'messages' => 'anda sudah absen hari ini, silahkan absen lagi besok',
                ],200);
            }else if($absensi->waktu_pulang !== null){ //jika dia sudah melakukan full absen (pulang/pergi)
                return response()->json([
                    'messages' => 'anda sudah absen hari ini, silahkan absen lagi besok',
                ],200);
            }else{
                $absen = Absensi::updateOrCreate(
                    ['id_user' => $id, 'tanggal' => $tanggal],
                    ['waktu_pulang' => $waktu,'keterangan_pulang' => $request->keterangan_pulang]
                );
    
                return response()->json([
                    'messages' => 'absensi pulang berhasil',
                    'data' => $absen
                ]);
            }
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
                    'longitude' => $request->status == 'hadir' || $request->status == 'hadir kegiatan' ? $request->longitude : null,
                    'latitude' => $request->status == 'hadir' || $request->status == 'hadir kegiatan' ? $request->latitude : null,
                    'isApprove' => $request->status == 'hadir' || $request->status == 'hadir kegiatan' ? 'diterima' : 'diajukan',
                    'approveAdmin' => 0
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
                    'longitude' => $request->status == 'hadir' || $request->status == 'hadir kegiatan' ? $request->longitude : null,
                    'latitude' => $request->status == 'hadir' || $request->status == 'hadir kegiatan' ? $request->latitude : null,
                    'isApprove' => $request->status == 'hadir' || $request->status == 'hadir kegiatan' ? 'diterima' : 'diajukan',
                    'approveAdmin' => strtolower($request->status) == 'izin' ? 0 :1
                ]);

                return response()->json([
                    'messages' => 'absensi hadir berhasil',
                    'data' => $absen
                ]);
            }
        }
    }

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

    function approveAdmin(Request $request, $id){

        if (Auth::user()->role == 'admin'){

            $startDate = Carbon::parse($request->startDate); 
            $nextDay = $startDate->copy()->addDay(); // menambah 1 hari karena hari sebelumnya sudah di inputkan
            $endDate = Carbon::parse($request->endDate);

            $dateRange = CarbonPeriod::create($nextDay, $endDate); // cek range izin

            $user = Absensi::where('id',$id)->first(); // cek data lama
            $user->approveAdmin = true;
            $user->update();        

            $insertedAbsences;

            if ($startDate->isSameDay($endDate)){
                $absen = Absensi::findOrNew($id);
                $absen->approveAdmin = true;
                $absen->save();

                $insertedAbsences[] = $absen;
            }else{
                foreach ($dateRange as $date) {
                    $absen = Absensi::create([
                        'id_user' => $user->id_user,
                        'status' => $user->status,
                        'tanggal' => $date->format('Y-m-d') 
                    ]);
    
                    $insertedAbsences[] = $absen;
                }
            }

            return response()->json([
                'messages' => 'absensi berhasil',
                'data' => $insertedAbsences
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
        $cek = Absensi::where('tanggal',$tanggal)->where('id_user',$id)->first();
        $libur = Libur::all();

        $adminDefinedSpecialDates;

        foreach ($libur as $lb) {
            $adminDefinedSpecialDates[] = $lb->tanggal; 
        }

        if (in_array($tanggal, $adminDefinedSpecialDates)) {
            $status = "hari tidak ada absen, silahkan nikmati kopi mu dengan sebatang rokok";

            return response()->json([
                'messages' => $status
            ]);
        }

        $status;

        if ($cek != null){
            if ($cek->status == 'Sakit'){
                if($cek->isApprove == 'ditolak'){
                    $status = 'pengajuan sakit anda di tolak kasum';
                }else{
                    $status = 'Anda sakit';
                }
            }else if($cek->status == 'Izin'){
                if($cek->isApprove == 'ditolak'){
                    $status = 'Pengajuan izin anda di tolak kasum';
                }else{
                    $status = 'Anda izin';
                }
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
            $absen->isApprove = $request->isApprove;
            $absen->catatan_kasum = $request->catatan;
            // $absen->approveAdmin = $request->isApprove == 'ditolak' ? false : true;

            $absen->update();

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


        if($role == 'admin' || $role == 'kasum'){

            $startDate = Carbon::parse($request->startDate); 
            $endDate = Carbon::parse($request->endDate);
    
            $dateRange = CarbonPeriod::create($startDate, $endDate); // cek range izin
            $insertedLiburs=[];

            foreach ($dateRange as $date) {

                $libur = Libur::create([
                    'tanggal' => $date->format('Y-m-d'),
                    'ket' => $request->ket,
                ]);

                $insertedLiburs[] = $libur;
            }

            return response()->json([
                'messages' => 'Data Libur Berhasil Ditambah',
                'data' => $insertedLiburs
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
            
            $libur = Libur::whereMonth('tanggal', $request->bulan)->whereYear('tanggal',$request->tahun)->get();

            return response(LiburResource::collection($libur));

        }else{
            return response()->json([
                'messages' => 'anda tidak memiliki akses',
            ],402);
        }
    }

}