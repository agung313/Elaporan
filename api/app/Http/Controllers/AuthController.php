<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Profile;
use App\Models\Perangkat;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\Auth as AuthResource;

use App\Traits\FireNotif;

class AuthController extends Controller{

    use FireNotif;
    
    public function __construct()
    {
        $this->middleware('auth:sanctum', ['except' => ['login','tes','register']]);
    }

    function tes() {

        // $this->actionFire();
        $data = $this->notifKasum('Agenda', 'Agenda Dooong');

        return response()->json([
            'messages' => 'Success',
            'data' =>  $data
        ]);        
            
    }
    public function login(Request $request)
    {
     
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|min:6'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'messages' => 'Error validation',
                'error' =>  $validator->errors()
            ]);
        }


        $credentials = [
            'email' => $request->email,
            'password' => $request->password
        ];

        $cekAkun = User::where('email', $credentials['email'])->get();

        if ($cekAkun->count() == 0){

            return response()->json(['messages' => 'Akun Tidak Terdaftar'], 401);
        }

        $cekEmail = User::where('email', $credentials['email'])->first();
        $deviceNow = $request->device;


        if ($cekEmail->isActive == false){
            return response()->json(['messages' => 'Akun Anda Belum Aktif'], 401);
        }

        if (Auth::attempt($credentials)) {

            if ($cekEmail->role == 'user') {

                if (is_null($cekEmail->device)) {

                    $otherDevice = User::where('role','user')->where('device', $deviceNow)->get()->count();

                    if ($otherDevice > 0) {
                        return response()->json([
                            'messages' => 'perangkat sudah digunakan akun lain'
                        ],401);
                    }
    
                }else if ($cekEmail->device !== $deviceNow) {
                    return response()->json(['messages' => 'Perangkat Anda Tidak Sesuai'], 401);
                }


            } 

            $cekEmail->device = $deviceNow;
            $cekEmail->update();

            

            $authUser = Auth::user();
            $success['token'] =  $authUser->createToken('MyAuthApp')->plainTextToken;
            $success['email'] = $authUser->email;
            $success['nama'] =  $authUser->name;
            $success['role'] = $authUser->role;
            $success['longitude'] = '101.540909';
            $success['lantitude'] = '0.517099';

            Perangkat::create([
                'id_user' => Auth::user()->id,
                'token_perangkat' => $request->token_fb,
            ]);                   


            return response()->json([
                'messages' => 'Loggin successfully',
                'data' => $success
            ],200);
        }else { 
            return response()->json([
                'messages' => 'maaf password yang anda masukkan salah'
            ],402);
        }
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|min:6',
            'password_confirmation' => 'required_with:password|min:6|same:password',
            'jabatan' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'messages' => 'Error validation',
                'error' =>  $validator->errors()
            ]);
        }

        $userAgent = $request->device;

        $existingUser = User::where('device', $userAgent)->whereNotNull('device')->get()->count();

        //cek device 
        
        if ($existingUser) {
            return response()->json(['error' => 'Perangkat anda telah terdaftar, silakan login menggunakan akun anda'], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'user',
            'jabatan' => $request->jabatan,
            'device' => $userAgent,
            // 'menu' => json_encode(['tes','test'])
        ]);

        $profile = Profile::create([
            'id_user' => $user->id
        ]);

        $token = $user->createToken('MyAuthApp')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    public function me()
    {
        $user = Auth::user();
        
        return response(new AuthResource($user));
    }

    public function logout(Request $request)
    {
        $id_user = Auth::user()->id;
        $token_fb = $request->token_fb;
        $now = Carbon::now();
        
        $signedout = Auth::user()->tokens()->delete();

        if ($signedout) {
            
            $perangkat = Perangkat::where('id_user', $id_user)->where('token_perangkat', $token_fb)->first();
            $perangkat->time_logout  = $now->toDateTimeString();
            $perangkat->update();
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ],200);
    }
}
