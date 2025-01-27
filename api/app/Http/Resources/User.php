<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Profile;
use App\Models\Absensi;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;
use Carbon\Carbon;

class User extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $cekAbsen = Absensi::where('id_user', $this->id)
                    ->whereYear('tanggal', $request->tahun)
                    ->whereMonth('tanggal', $request->bulan)
                    ->where('isApprove', 'diterima')
                    ->where('approveAdmin', true)
                    ->get();



        $hadir = $cekAbsen->where('status', 'hadir')->count();
        $kegiatan = $cekAbsen->where('status', 'hadir kegiatan')->count();

        $totalHadir = $hadir+$kegiatan;
        $totalIzin = $cekAbsen->where('status', 'izin')->count();
        $totalSakit = $cekAbsen->where('status', 'sakit')->count();
        $totalTidakHadir = $cekAbsen->where('status', 'tidak hadir')->count();




        return [
            'id' => $this->id,
            'nama' => $this->name,
            'email' => $this->email,
            'jabatan' => $this->jabatan,
            'URL' => $this->foto ? URL('storage/'. $this->foto) : null,
            'latar_belakang' => $this->latar_belakang,
            'tujuan' => $this->tujuan,
            'ruang_lingkup' => $this->ruang_lingkup,
            'ttd' => $this->ttd ? URL('storage/'.$this->ttd ):null,
            'totalHadir' => $totalHadir,
            'totalIzin' => $totalIzin,
            'totalSakit' => $totalSakit,
            'totalTidakHadir' => $totalTidakHadir,
        ];
    }
}
