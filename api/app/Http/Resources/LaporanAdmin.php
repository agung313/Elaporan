<?php

namespace App\Http\Resources;
use App\Models\Absensi;
use App\Models\Laporan;
use Carbon\Carbon;

use Illuminate\Http\Resources\Json\JsonResource;

class LaporanAdmin extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $hari = Carbon::createFromFormat('Y-m-d', $this->tanggal, 'Asia/Jakarta')->isoFormat('dddd');
        $tanggal =  Carbon::parse($this->tanggal)->isoFormat('D MMMM Y');
        $detail = Laporan::where('id_absensi', $this->id)->get();
        $temp = [
            'kegiatan' => $this->status == 'hadir' ? 'Kehadiran' : $this->status,
            'waktu_hadir' =>  $this->status == 'hadir' || $this->status == 'hadir kegiatan' ? $this->waktu_hadir. ' WIB' : null,
            'waktu_pulang' =>  $this->status == 'hadir' || $this->status == 'hadir kegiatan' ? $this->waktu_pulang. ' WIB' : null
        ];

        $mergedKegiatan = $detail->prepend($temp);
        
        return [
            'id' => $this->id,
            'hari' => $hari,
            'tanggal' => $tanggal,
            'status' => $this->status,
            'foto' => $this->URL,
            'keterangan_hadir' => $this->keterangan_hadir,
            'keterangan_pulang' => $this->keterangan_pulang,
            'kegiatan' => $mergedKegiatan
        ];
    }
}
