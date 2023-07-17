<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Laporan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class LaporanController extends Controller
{
    public function index(Request $request)
    {
        //
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'judul_kegiatan' => 'required|string|max:700',
            'id_absensi' => 'required|string|max:700',
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

        return response()->noContent();
    }
}
