<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;
use App\Models\Absensi;
use App\Models\Laporan;
use Carbon\Carbon;
use Carbon\CarbonInterface;

class AbsenPengajuan extends JsonResource
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

        return [
            'id' => $this->id,
            'id_user' => $this->id_user,
            'nama' => $this->name,
            'status' => $this->status,
            'hari' => $hari,
            'tanggal' => $tanggal,
            'isApprove' => $this->isApprove,
            'approveAdmin' => $this->approveAdmin

        ];
    }
}
