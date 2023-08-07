<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Laporan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use App\Http\Resources\Lapor as LaporanResource;

class LaporanController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }    
    public function index(Request $request)
    {

        if($request->detail){

            $laporan = Laporan::where('id', $request->id_laporan)->get();   

        }elseif ($request->bulanan) {

            return ['data' => Auth::user()];
            exit;

            $laporan = Laporan::join('absensis','absensis.id','id_absensi')->where('id_user', $id_user)->whereMonth('tanggal', $request->bulan)->whereYear('tanggal',$request->tahun)->get();        

        }else{
            $laporan = Laporan::where('id_absensi', $request->id_absensi)->get();        
        }
        
        return response(LaporanResource::collection($laporan));
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'judul_kegiatan' => 'required|string|max:700',
            'id_absensi' => 'required|int|max:700',
            'uraian_kegiatan' => 'required|string|max:700',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'messages' => 'Error validation',
                'error' =>  $validator->errors()
            ]);
        }

        $laporan = New Laporan;
        $laporan->id_absensi = $request->id_absensi;
        $laporan->judul_kegiatan = $request->judul_kegiatan;
        $laporan->uraian_kegiatan = $request->uraian_kegiatan;
        $laporan->save();

        return response()->json([
            'data' => $laporan
        ],200);
    }

    public function calculate(Request $request)
    {
        $jabatan = Auth::user()->role;

        if($jabatan == 'pimpinan' || $jabatan == 'admin'){
            $laporanIds = Laporan::pluck('id_absensi')->toArray();
            $absensiIds = Absensi::where('status', 'hadir')->whereMonth('tanggal',$request->bulan)->pluck('id')->toArray();
            $missingIds = array_diff($absensiIds, $laporanIds);
        }else{
            //jumlah hari kegiatan yang belum di lengkapi
        }
    }

    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(), [
            'judul_kegiatan' => 'required|string|max:700',
            'uraian_kegiatan' => 'required|string|max:700',
        ]);


        if ($validator->fails()) {
            return response()->json([
                'messages' => 'Error validation',
                'error' =>  $validator->errors()
            ]);
        }

        $laporan = Laporan::findOrNew($id);
        $laporan->judul_kegiatan = $request->judul_kegiatan;
        $laporan->uraian_kegiatan = $request->uraian_kegiatan;
        $laporan->save();

        return response()->json([
            'data' => $laporan
        ],200);
    }

    public function destroy($id)
    {
        $delete = Laporan::findOrFail($id);
        $delete->delete();

        return response()->json([
            'message' => 'kegiatan berhasil dihapus'
        ],200);
    }
}
