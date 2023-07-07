<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;
use App\Models\Absensi;
use Carbon\Carbon;

class Absen extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $jamMasuk = Carbon::parse('08:00:00');
        $jamPulang = Carbon::parse('15:50:00');
        $waktu_hadir = Carbon::parse($this->waktu_hadir);
        $waktu_pulang = Carbon::parse($this->waktu_pulang);

        $photo = Absensi::find($this->id);

        return [
            'id' => $this->id,
            'id_user' => $this->id_user,
            'status' => $this->status,
            'keterangan' => $this->keterangan,
            'keterangan_pulang' => $this->keterangan_pulang,
            'URL' => URL('storage/'. $photo->foto),
            'tanggal' => $this->tanggal,
            'waktu_hadir' => $this->waktu_hadir,
            'waktu_pulang' => $this->waktu_pulang,
            'ket_hadir' => $waktu_hadir->greaterThan($jamMasuk) && $waktu_hadir->lessThanOrEqualTo($jamMasuk->copy()->addMinutes(120)) ? 'Absen Terlambat' : 'Absen Tepat Waktu',
            'ket_pulang' => $waktu_pulang->lessThan($jamPulang) ? 'Pulang cepat' : 'Pulang Tepat Waktu'
        ];
    }
}
