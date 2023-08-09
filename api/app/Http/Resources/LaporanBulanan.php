<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;
use App\Models\Absensi;
use App\Models\Laporan;
use Carbon\Carbon;

class LaporanBulanan extends JsonResource
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
        
        return [
            'id' => $this->id,
            'hari' => $hari,
            'tanggal' => $tanggal,
            'kegiatan' => $detail,
            // 'judul_kegiatan' => $this->judul_kegiatan,
            // 'uraian_kegiatan' => $this->uraian_kegiatan
        ];
    }
}
