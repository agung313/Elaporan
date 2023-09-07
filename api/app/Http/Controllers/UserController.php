<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Profile;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\User as UserResource;
use App\Http\Resources\AllUser as AllUserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use File;
use Carbon\Carbon;
use PDF;
setlocale(LC_TIME, 'id_ID');


class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum',['except' => ['setComplete','checkTime']]);
    }

    function checkTime()  {
        
        $currentTime = Carbon::now();

        // $formattedTime = $currentTime->format('Y-m-d H:m:s');

        return $currentTime;        
    }

    public function profile(Request $request)
    {

        if (Auth::user()->role == 'admin' || Auth::user()->role == 'kasum'){


            if ($request->id) {

                $user = Profile::select('users.*','profiles.id AS id_profile','profiles.foto','profiles.latar_belakang','profiles.tujuan','profiles.ruang_lingkup','profiles.ttd')
                ->join('users', 'users.id', '=', 'profiles.id_user')
                ->where('users.id', $request->id)
                ->first(); 

            }elseif ($request->getAll) {
                
                $user = Profile::select('users.*','profiles.id AS id_profile','profiles.foto','profiles.latar_belakang','profiles.tujuan','profiles.ruang_lingkup','profiles.ttd')
                ->join('users', 'users.id', '=', 'profiles.id_user')
                ->where('role','user')
                ->orderBy('name','ASC')
                ->get();
                
                return response(AllUserResource::collection($user));    


            }else{

                $user = Profile::select('users.*','profiles.id AS id_profile','profiles.foto','profiles.latar_belakang','profiles.tujuan','profiles.ruang_lingkup','profiles.ttd')
                ->join('users', 'users.id', '=', 'profiles.id_user')
                ->where('users.id', Auth::user()->id)
                ->first(); 
    
            }      
        } else{

            $user = Profile::select('users.*','profiles.id AS id_profile','profiles.foto','profiles.latar_belakang','profiles.tujuan','profiles.ruang_lingkup','profiles.ttd')
            ->join('users', 'users.id', '=', 'profiles.id_user')
            ->where('users.id', Auth::user()->id)
            ->first(); 

        }
        
        return response(new UserResource($user));
    }

    public function update(Request $request)
    {
        $users = Auth::user();

        if($users->role != "kasum" || $users->role != "admin"){

            if($request->file != true){
                $validator = Validator::make($request->all(), [
                    'latar_belakang' => 'required|string|max:700',
                    'tujuan' => 'required|string|max:700',
                    'ruang_lingkup' => 'required'
                ]);
        
                if ($validator->fails()) {
                    return response()->json([
                        'messages' => 'Error validation',
                        'error' =>  $validator->errors()
                    ]);
                }
            }
        }
        
            $idProfile = Profile::select('*')->where('id_user', $users->id)->first();


            if ($request->file) {
                $path = $request->file('foto')->store('public');
                $path2 = $request->file('ttd')->store('public');
            }
    
            $user = Profile::findorNew($idProfile->id);

            $user->foto = $request->file('foto') ? $path : $idProfile->foto;
            $user->ttd = $request->file('ttd') ? $path2 : $idProfile->ttd;
            $user->id_user = $users->id;
            $user->latar_belakang = $request->latar_belakang == null ? $idProfile->latar_belakang : $request->latar_belakang;
            $user->tujuan = $request->tujuan == null ? $idProfile->tujuan : $request->tujuan;
            $user->ruang_lingkup = $request->ruang_lingkup == null ? $idProfile->ruang_lingkup : $request->ruang_lingkup;
            $user->save();

            $this->setComplete($users->id);
    
            return response()->json([
                'data' => $user
            ],200);
        

    }

    public function updateFoto(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'foto' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'messages' => 'Error validation',
                'error' =>  $validator->errors()
            ]);
        }        

        if (Auth::user()->role == 'admin') {

            $id = $request->id;

        }else {
            $id = Auth::user()->id;
        }


        $idProfile = Profile::select('id')->where('id_user', $id)->first();

        $user = Profile::findorNew($idProfile->id);


        if ($user->foto) {

            $fotoPath = storage_path()."/app/public".$user->foto;
            File::delete($fotoPath);

        }
        $path = $request->file('foto')->store('public/foto_profile');
        $path = preg_replace('/public/','', $path);


        $user->foto = $path;
        $user->update();
        
        $this->setComplete($id);

        return response()->json([
            'data' => $user
        ],200);
    }

    public function updateTtd(Request $request)
    {
        $id = Auth::user()->id;

        $validator = Validator::make($request->all(), [
            'ttd' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'messages' => 'Error validation',
                'error' =>  $validator->errors()
            ]);
        }
        $idProfile = Profile::select('id')->where('id_user', $id)->first();

        $user = Profile::findorNew($idProfile->id);


        if ($user->ttd) {

            $ttdPath = storage_path()."/app/public".$user->ttd;
            File::delete($ttdPath);

        }

        $decodedTTd = base64_decode($request->ttd);

        // Generate a unique filename
        $filename = uniqid() . '.png'; // Change the extension as needed

        // Specify the storage path
        $storagePath = storage_path('app/public/ttd');

        // Save the decoded data to the storage path
        file_put_contents($storagePath . '/' . $filename, $decodedTTd);

        // $path = $request->file('ttd')->store('public/ttd');
        // $path = preg_replace('/public/','', $path);


        $user->ttd = '/ttd/'.$filename;
        $user->update();

        $this->setComplete($id);

        return response()->json([
            'data' => $user
        ],200);
    }

    public function changePassword(Request $request)
    {

        if (Auth::user()->role == 'admin') {
            
            $validator = Validator::make($request->all(), [
                'password' => 'required',
                'newPassword' => 'required|min:6'
            ]);
        }else{
            $validator = Validator::make($request->all(), [
                'password' => 'required',
                'newPassword' => 'required|min:6',
                'confirm_newPassword' => 'required|min:6|same:newPassword'
            ]);
        }


        if ($validator->fails()) {
            return response()->json([
                'messages' => 'Error validation', 
                'error' => $validator->errors()
            ]);
        }

        $users = Auth::user();

        $inputOldPassword = $request->password;
        $databaseOldPassword = $users->password;

        $isPasswordMatched = Hash::check($inputOldPassword, $databaseOldPassword);

        if($isPasswordMatched == false){
            $response = [
                'success' => false,
                'message' => 'Error validation',
                'data' => [
                    'password' => [
                        'Password yang anda masukkan salah.'
                    ]
                ]
            ];

            return response()->json($response, 422);
            
        }else{
            $user = User::findOrNew($users->id);
            $user->password = Hash::make($request->newPassword);
            $user->save();

            return response()->json([
                'data' => $user
            ],200);
        }
    }

    function updateAccount(Request $request, $id){

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'jabatan' =>'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'messages' => 'Error validation',
                'error' =>  $validator->errors()
            ]);
        } 

        $user = User::findOrNew($id);
        
        $user->name = $request->name;
        $user->email = $request->email;
        $user->jabatan = $request->jabatan;
        $user->save();

        return response()->json([
            'messages' => 'update data succesfully'
        ],201);
    }

    function setComplete($id){
        
        $sql = Profile::where('id_user',$id)
                        ->whereNotNull('foto')
                        ->whereNotNull('ttd')
                        ->whereNotNull('latar_belakang') 
                        ->whereNotNull('tujuan')
                        ->whereNotNull('ruang_lingkup')                       
                        ->get();
 

        if ($sql) {

            $profile = Profile::where('id_user',$id)->first();
            $profile->update(['isComplete' => true]);
        }

    }

    function history(Request $request){
        $role = Auth::user()->role;
        // dd($role);

        if($role != 'kasum'){
            return response()->json([
                'messages' => 'anda tidak memiliki akses untuk melakukan aksi'
            ],401);
        }

        if($request->pdf == true){
            $bulan = $request->bulan;
            $tahun = $request->tahun;
            $namaBulan = Carbon::create()->month($bulan)->isoFormat('MMMM');
            $tanggal = Carbon::now()->format('d F Y');
            $user = DB::table('users')
                ->select('users.name',
                    DB::raw('SUM(CASE WHEN absensis.status = "hadir" THEN 1 ELSE 0 END) as totalHadir'),
                    DB::raw('SUM(CASE WHEN absensis.status = "izin" THEN 1 ELSE 0 END) as totalIzin'),
                    DB::raw('SUM(CASE WHEN absensis.status = "sakit" THEN 1 ELSE 0 END) as totalSakit'),
                    DB::raw('SUM(CASE WHEN absensis.status = "hadir kegiatan" THEN 1 ELSE 0 END) as totalHadirKegiatan'),
                    DB::raw('SUM(CASE WHEN absensis.status = "tidak hadir" THEN 1 ELSE 0 END) as totalTidakHadir')
                )
                ->leftJoin('absensis', function ($join) use ($bulan, $tahun) {
                    $join->on('users.id', '=', 'absensis.id_user')
                        ->whereRaw('MONTH(absensis.tanggal) = ? AND YEAR(absensis.tanggal) = ?', [$bulan, $tahun]);
                })
                ->where('users.role', 'user')
                ->groupBy('users.name')
                ->get();

            $getFoto = Profile::select('profiles.ttd')
                ->join('users','users.id','=','profiles.id_user')
                ->where('users.role', 'kasum')
                ->first();

            $query = User::where('role', 'kasum')->first();

            if ($query) {
                $query->tahun = $tahun;
                $query->bulan = $namaBulan;
                $query->URL = URL('storage'.$getFoto->ttd );
                $query->tanggal = $tanggal;
            }

            $pdf = PDF::loadView('pdf.history', ['user' => $user , 'ttd' => $query]);

            // Nama file PDF yang akan diunduh
            $filename = 'Rekap_Kehadiran_' . $namaBulan . '.pdf';

            // Menggunakan response() untuk mengirim PDF sebagai respons unduhan
            return response($pdf->output())
                ->header('Content-Type', 'application/pdf')
                ->header('Content-Disposition', 'attachment; filename="' . $filename . '"');
        }else{
            $user = Profile::select('users.*','profiles.id AS id_profile','profiles.foto','profiles.latar_belakang','profiles.tujuan','profiles.ruang_lingkup','profiles.ttd')
                ->join('users', 'users.id', '=', 'profiles.id_user')
                ->where('users.role', 'user')
                ->get();
    
            return response(UserResource::collection($user));
        }
    }
}
