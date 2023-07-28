<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;
use App\Models\Absensi;
use App\Models\Laporan;
use Carbon\Carbon;

class Lapor extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
       
        return [
            'id' => $this->id,
            'id_absensi' => $this->id_absensi,
            'judul_kegiatan' => $this->judul_kegiatan,
            'uraian_kegiatan' => $this->uraian_kegiatan
        ];
    }
}
