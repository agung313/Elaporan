<!-- File: resources/views/pdf/template.blade.php -->

<!DOCTYPE html>
<html>
    <head>
        <title>Contoh PDF</title>
    </head>
    <body>
        <h1>Data dari Database</h1>
        <table>
            <thead>
                <tr>
                    <th>Test id dulu</th>
                    <th>test judul kegiatan dulu</th>
                </tr>
            </thead>
            <tbody>
                @foreach($data as $item)
                <tr>
                    <td>{{ $item->id }}</td>
                    <td>{{ $item->judul_kegiatan }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </body>
</html>
