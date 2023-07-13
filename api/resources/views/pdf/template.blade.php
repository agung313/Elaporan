<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laporan</title>
    <style>
        .tabell {
            border: 1px solid black;
            border-collapse: collapse;
        }
    </style>
</head>
<body>
    <div style="text-align: center;">
        <h2>LAPORAN KERJA HARIAN</h2>
        <h2 style="text-transform: uppercase">{{$user->jabatan}} BAPPEDA KOTA PEKANBARU TA.{{$user->tahun}}</h2>
    </div>
    <div style="margin-top: 50px;">
        <table>
            <tr>
                <td>Unit</td>
                <td>: {{$user->jabatan}}</td>
            </tr>
            <tr>
                <td>Tempat</td>
                <td>: Badan Perencanaan  Pembangunan  Daerah  Kota  Pekanbaru</td>
            </tr>
            <tr>
                <td>Nama</td>
                <td>: {{$user->name}}</td>
            </tr>
            <tr>
                <td>Periode</td>
                <td>: {{$user->bulan}} {{$user->tahun}}</td>
            </tr>
        </table>
    </div>

    <div style="margin-top:50px;">
        <h3>A. PENDAHULUAN</h3>
        
        <table style="margin: auto;" class="tabell">
            <tr class="tabell">
                <td class="tabell" style="width: 200px; text-align: center;">Latar Belakang</td>
                <td class="tabell" style="width: 400px; padding: 10px; text-align: justify;">{{$user->latar_belakang}}</td>
            </tr>
            <tr class="tabell">
                <td class="tabell" style="width: 200px; text-align: center;">Maksud dan Tujuan</td>
                <td class="tabell" style="width: 400px; padding: 10px; text-align: justify;">{{$user->tujuan}}</td>
            </tr>
            <tr class="tabell">
                <td class="tabell" style="width: 200px; text-align: center;">Ruang Lingkup</td>
                <td class="tabell" style="width: 400px; padding: 10px; text-align: justify;">
                    <table>
                        {{-- {{dd(json_decode($user->ruang_lingkup))}} --}}
                        @foreach (json_decode($user->ruang_lingkup) as $key => $item)
                            <tr>
                                <td>{{$key+1 ."."}}</td>
                                <td>{{$item}}</td>
                            </tr>
                        @endforeach
                    </table>
                </td>
            </tr>
        </table>
    </div>

    <div style="margin-top:50px; margin-bottom: 100px;">
        <h3>B. ISI LAPORAN</h3>
        <p style="margin-left: 20PX;">1. URAIAN KEGIATAN</p>
        
        <table style="margin: auto; margin-bottom: 50px;" class="tabell">
            <tr class="tabell">
                <th class="tabell" style="text-align: center; height: 50px; width: 30px;">No.</th>
                <th class="tabell" style="text-align: center; height: 50px; width: 150px;">Hari/Tanggal</th>
                <th class="tabell" style="text-align: center; height: 50px; width: 260px;">Jenis Kegiatan</th>
                <th class="tabell" style="text-align: center; height: 50px; width: 260px;">Uraian Kegiatan</th>
            </tr>
            @foreach ($absensi as $key => $item)
                <tr class="tabell">
                    <td class="tabell" style="text-align: center; width: 20px; padding: 10px;">{{$key+1 ."."}}</td>
                    <td class="tabell" style="text-align: center; padding: 10px;">{{$item->tanggal}}</td>
                    <td class="tabell" style="padding: 10px;">
                        <table>
                            @foreach ($laporan as $key => $lapor)
                                @if ($lapor->id_absensi == $item->id)
                                    <tr>
                                        <td>{{$key+1}}</td>
                                        <td>{{$lapor->judul_kegiatan}}</td>
                                    </tr>
                                @endif
                            @endforeach
                        </table>
                    </td>
                    <td class="tabell" style=" padding: 10px;">
                        <table>
                            @foreach ($laporan as $key => $lapor)
                                @if ($lapor->id_absensi == $item->id)
                                    <tr>
                                        <td>{{$key+1}}</td>
                                        <td>{{$lapor->uraian_kegiatan}}</td>
                                    </tr>
                                @endif
                            @endforeach
                        </table>
                    </td>
                </tr>
            @endforeach
        </table>

        <p style="margin-left: 20PX;">2. KENDALA</p>
        
        <table style="margin: auto;" class="tabell">
            <tr class="tabell">
                <th class="tabell" style="text-align: center; height: 50px; width: 30px;">No.</th>
                <th class="tabell" style="text-align: center; height: 50px; width: 330px;">Jenis Kendala</th>
                <th class="tabell" style="text-align: center; height: 50px; width: 330px;">Solusi</th>
            </tr>
            <tr class="tabell">
                <td class="tabell" style="text-align: center; width: 30px; padding: 10px;">1.</td>
                <td class="tabell" style="width: 250px; padding: 10px;">{{$kendala->kendala}}</td>
                <td class="tabell" style="width: 250px; padding: 10px;">{{$kendala->solusi}}</td>
            </tr>
        </table>
        <div style="height: 50px;"></div>
        <table style="margin: auto;">
            <tr >
                <td style="text-align: center; vertical-align: text-top;text-transform: uppercase">
                    <p>{{$user->jabatan}}</p>
                    <p>BAPPEDA KOTA PEKANBARU</p>
                    <p style="text-transform: uppercase; margin-top: 100px; font-weight: bold;">{{$user->name}}</p>
                </td>
                <td style="width: 150px;"></td>
                <td style="text-align: center; vertical-align: text-top;">
                    <p>DIKETAHUI</p>
                    <p>KASUBAG UMUM</p>
                    <p style="text-transform: uppercase; margin-top: 100px; font-weight: bold; text-decoration: underline;">IWAN KURNIAWAN, S.E</p>
                    <p style="margin-top: -10px;">NIP. 19840118 200212 1 004</p>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>