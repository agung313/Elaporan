<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Profile;
use Illuminate\Support\Facades\URL;

class AllUser extends JsonResource
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
            'jabatan' => $this->jabatan,
            'URL' => $this->foto ? URL('storage/'. $this->foto) : null,

        ];
    }
}
