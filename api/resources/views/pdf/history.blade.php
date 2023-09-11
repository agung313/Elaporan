<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            table, th, td {
                border: 1px solid black;
                border-collapse: collapse;
            }
            th{
                align-items: center;
                text-align: center;
                background-color: lightgray;
            }
        </style>
    </head>

    <body>
        <div style="text-align: center;">
            <h2 style="text-transform: uppercase">REKAP KEHADIRAN</h2>
            <h3 style="text-transform: uppercase">THL - IT BAPPEDA KOTA PEKANBARU TA.{{$ttd->tahun}}</h3>
            <div style="margin-top: 50px; margin-left: 29px; margin-right: auto;">
                <table style="border-width: 0px;">
                    <tr>
                        <td style="border-width: 0px;">Periode</td>
                        <td style="border-width: 0px;">: {{$ttd->bulan}} {{$ttd->tahun}}</td>
                    </tr>
                </table>
            </div>

            <table style="margin-left: auto; margin-right: auto; margin-top:40px">
                <tr>
                    <th style="width: 30px;" rowspan="2">No</th>
                    <th style="width: 300px;" rowspan="2">Nama</th>
                    <th style="width: 50px;" colspan="5">Keterangan</th>
                </tr>
                <tr>
                    <th style="width: 50px;">Hadir</th>
                    <th style="width: 50px;">Hadir Kegiatan</th>
                    <th style="width: 50px;">Izin</th>
                    <th style="width: 50px;">Sakit</th>
                    <th style="width: 100px;">Tidak Hadir</th>
                </tr>
                @foreach ($user as $key => $usr)
                    <tr>
                        <td style="text-align: center;">{{$key+1}}</td>
                        <td style="text-align: left;text-transform: capitalize">{{$usr->name}}</td>
                        <td style="text-align: center;">{{$usr->totalHadir}}</td>
                        <td style="text-align: center;">{{$usr->totalHadirKegiatan}}</td>
                        <td style="text-align: center;">{{$usr->totalIzin}}</td>
                        <td style="text-align: center;">{{$usr->totalSakit}}</td>
                        <td style="text-align: center;">{{$usr->totalTidakHadir}}</td>
                    </tr>
                @endforeach
                
            </table>

            <div style="width: 100%; min-height: 250px; margin-top: 50px;">
                <div style="margin-left: 40%;">
                    <p>Pekanbaru, {{$ttd->tanggal}}</p>
                    <p style="font-weight: bold;">KASUBAG UMUM</p>
                    <div style="margin-top: 40px;mmargin-bottom:40px">
                        {{-- @php
                            echo '<img src="' . $ttd->URL . '" alt="Gambar kucing" width="100px" height="100px">';
                        @endphp --}}
                    </div>
                    <p style="font-weight: bold;margin-top:40px">{{$ttd->name}}</p>
                </div>
            </div>
        </div>
    </body>
</html>