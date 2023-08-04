<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Profile;
use Illuminate\Support\Facades\URL;

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

        return [
            'id' => $this->id,
            'nama' => $this->name,
            'email' => $this->email,
            'jabatan' => $this->jabatan,
            'URL' => URL('storage'. $this->foto),
            'latar_belakang' => $this->latar_belakang,
            'tujuan' => $this->tujuan,
            'ruang_lingkup' => $this->ruang_lingkup,
            'ttd' => URL('storage'. $this->ttd)
        ];
    }
}
