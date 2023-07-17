<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

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
            'URL' => URL('storage/'. $this->path),
            'saran' => $this->saran,
            'kendala' => $this->kendala,
            'nama' => $this->name,
            'jabatan' => $this->jabatan,
            'isDeleted' => $this->keterangan_pulang
        ];
    }
}
