<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Auth extends JsonResource
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
            'role' => $this->role,
            'longitude' => "101.540909",
            'lantitude' => "0.517099"
        ];
    }
}
