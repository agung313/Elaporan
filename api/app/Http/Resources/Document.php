<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Document extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $pdf = PDF::loadView('pdf.templateTest', ['data' => $laporan]);
        
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
}
