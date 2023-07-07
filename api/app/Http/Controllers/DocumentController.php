<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PDF;
use App\Models\Absensi;
use App\Models\Laporan;
use App\Models\Document;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\Document as DocumentResource;

class DocumentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index()
    {
        //
    }

    public function store(Request $request)
    {
        $idUser = Auth::user()->id;

        $getTahun = Carbon::now();
        $tahun = $getTahun->year;

        $query = Laporan::select('laporans.*','absensis.tanggal','absensis.waktu_hadir',
                        'absensis.waktu_pulang','profiles.latar_belakang','profiles.tujuan','profiles.ruang_lingkup')
                ->join('Absensis', 'absensis.id', '=', 'laporans.id_absensi')
                ->join('Users', 'users.id', '=', 'absensis.id_user')
                ->join('Profiles', 'profiles.id_user', '=', 'users.id')
                ->where('users.id', $idUser)
                ->get();

        $laporans = $query->map(function ($laporan) use ($tahun) {
            $laporan->tahun = $tahun;
            return $laporan;
        });

        $this->cetakPDF($laporans);

    }

    public function cetakPDF($laporans)
    {
        dd($laporans);
        $pdf = PDF::loadView('pdf.template', ['data' => $laporan]);
        
        // Simpan file PDF ke dalam storage
        $filePath = storage_path('app/public/pdf/hasil.pdf');

        $directory = dirname($filePath);
            if (!File::isDirectory($directory)) {
                File::makeDirectory($directory, 0755, true, true);
            }

        // Save the PDF to the specified file path
        $pdf->save($filePath);

        $path = Storage::disk('public')->putFile('pdf', $filePath);

        $now = Carbon::now();
        $bulan = $now->format('M Y');

        //store pdf path ke database
        $document = New Document;
        $document->id_user = $idUser;
        $document->path = $path;
        $document->status = 'KASUM';
        $document->bulan = $bulan;
        $document->saran = $request->saran;
        $document->kendala = $request->kendala;
        $document->save();

        return response()->json([
            'messages' => 'laporan diteruskan ke kasubag umum'
        ]);
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
