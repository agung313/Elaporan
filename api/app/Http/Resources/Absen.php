<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;
use App\Models\Absensi;
use App\Models\Laporan;
use Carbon\Carbon;
use Carbon\CarbonInterface;

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
        // $photo = Absensi::find($this->id);
        $laporan = Laporan::where('id_absensi',$this->id)->first();
        $hari = Carbon::createFromFormat('Y-m-d', $this->tanggal, 'Asia/Jakarta')->isoFormat('dddd');
        $tanggal =  Carbon::parse($this->tanggal)->isoFormat('D MMMM Y');

        return [
            'id' => $this->id,
            'id_user' => $this->id_user,
            'status' => $this->status,
            'keterangan' => $this->keterangan,
            'keterangan_pulang' => $this->keterangan_pulang,
            'foto' => URL('storage/'. $this->foto),
            'hari' => $hari,
            // 'tanggal' => Carbon::parse($this->tanggal)->format('d-m-Y'),
            'tanggal' => $tanggal,
            'waktu_hadir' => $this->waktu_hadir,
            'waktu_pulang' => $this->waktu_pulang,
            'ket_hadir' => $this->waktu_hadir != null 
                ? ($waktu_hadir->lessThan($jamMasuk->copy()->subMinutes(60)) || $waktu_hadir->lessThanOrEqualTo($jamMasuk->copy()->addMinutes(30)) 
                ? 'Absen Tepat Waktu' : 'Absen Terlambat') : ($this->status == 'Izin'  ? 'Izin' : ($this->status == 'Sakit' ? 'Sakit' : 'Tidak Absen Pergi')),
            'ket_pulang' => $this->waktu_pulang != null
                    ? ($waktu_pulang->lessThan($jamPulang) 
                    ? 'Pulang cepat' : 'Pulang Tepat Waktu'): 'Tidak Absen Pulang',
            'laporan' => $laporan == null ? false : true,
            'isApprove' => $this->isApprove

        ];
    }
}
