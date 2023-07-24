<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Absensi;
use App\Models\Laporan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use App\Http\Resources\Absen as AbsenResource;


class AbsensiController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index(Request $request)
    {
        if($request->detail){
            $absen = Absensi::where('id_user', Auth::user()->id)->where('id', $request->id)->get();
        }else{
            $absen = Absensi::where('id_user', Auth::user()->id)->get();
        }

        return response(AbsenResource::collection($absen));
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
                ['waktu_pulang' => $waktu],
                ['keterangan_pulang' => $request->keterangan_pulang]
            );

            return response()->json([
                'messages' => 'absensi pulang berhasil',
                'data' => $absen
            ]);

        }else{
            if($request->foto){
                $path = $request->file('foto')->store('public');

                $absen = Absensi::create([
                    'id_user' => $id,
                    'status' => $request->status,
                    'foto' => $path,
                    'keterangan_hadir' => $request->keterangan_hadir,
                    'waktu_hadir' => $waktu,
                    'tanggal' => $tanggal
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
                    'waktu_hadir' => $waktu,
                    'tanggal' => $tanggal
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
        $cek = Absensi::leftJoin('users','users.id','id_user')->where('id_user', $id)->where('tanggal',$tanggal)->first();
        $status;

        if ($cek != null){
            if ($cek->status == 'sakit' || $cek->status == 'izin'){
                $status = 'tidak perlu absen pulang';
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

    function acceptIzin() {
        if (Auth::user()->role == 'admin' || (Auth::user()->role == 'kasum')){
            $absen = Absensi::findorNew($id);
            $absen->status = $request->status;
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

}