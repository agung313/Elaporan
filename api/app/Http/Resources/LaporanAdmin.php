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
            'foto' => $this->URL,
            'waktu_hadir' => $this->waktu_hadir. ' WIB',
            'waktu_pulang' => $this->waktu_pulang. ' WIB'
        ];

        $mergedKegiatan = $detail->prepend($temp);
        
        return [
            'id' => $this->id,
            'hari' => $hari,
            'tanggal' => $tanggal,
            'status' => $this->status,
            'kegiatan' => $mergedKegiatan
        ];
    }
}
