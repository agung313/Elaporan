<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;
class Document extends JsonResource
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
            'id_user' => $this->id_user,
            'status' => $this->status,
            'bulan' =>  $this->bulan, 'Asia/Jakarta',
            'URL' => URL('storage/'. $this->path),
            'tahun' => $this->tahun,
            'fotoProfile' => URL('storage/'. $this->foto),
            'saran' => $this->saran,
            'kendala' => $this->kendala,
            'catatan' => $this->catatan,
            'nama' => $this->name,
            'jabatan' => $this->jabatan,
            'isDeleted' => $this->keterangan_pulang
        ];
    }
}
