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
use Illuminate\Support\Facades\Storage;
use File;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function profile(Request $request)
    {

        if ($request->getAll){
            $user = Profile::select('users.*','profiles.id AS id_profile','profiles.foto','profiles.latar_belakang','profiles.tujuan','profiles.ruang_lingkup','profiles.ttd')
            ->join('Users', 'users.id', '=', 'profiles.id_user')
            ->orderBy('id', 'DESC')
            ->get();

            return response(UserResource::collection($user));
        }else if($request->id){
            $user = Profile::select('users.*','profiles.id AS id_profile','profiles.foto','profiles.latar_belakang','profiles.tujuan','profiles.ruang_lingkup','profiles.ttd')
            ->join('Users', 'users.id', '=', 'profiles.id_user')
            ->where('users.id', $request->id)
            ->first();
        }else{
            $user = Profile::select('users.*','profiles.id AS id_profile','profiles.foto','profiles.latar_belakang','profiles.tujuan','profiles.ruang_lingkup','profiles.ttd')
            ->join('Users', 'users.id', '=', 'profiles.id_user')
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
            $user->isComplete = true;
            $user->save();
    
            return response()->json([
                'data' => $user
            ],200);
        

    }
    public function updateFoto(Request $request)
    {
        $id = Auth::user()->id;
        $validator = Validator::make($request->all(), [
            'foto' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'messages' => 'Error validation',
                'error' =>  $validator->errors()
            ]);
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

        return response()->json([
            'data' => $user
        ],200);
    }

    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'password' => 'required',
            'newPassword' => 'required|min:6',
            'confirm_newPassword' => 'required|min:6|same:newPassword'
        ]);

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
}
