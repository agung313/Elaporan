<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;
use Carbon\Carbon;
use Carbon\CarbonInterface;

class Libur extends JsonResource
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
            'tanggalFull' => $this->tanggal,
            'tanggal' => Carbon::parse($this->tanggal)->format('d'),
            'hari' => Carbon::createFromFormat('Y-m-d', $this->tanggal, 'Asia/Jakarta')->isoFormat('dddd'),
            'keterangan' => $this->ket
        ];
    }
}
