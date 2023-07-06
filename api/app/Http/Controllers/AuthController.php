<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Profile;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum', ['except' => ['login','register']]);
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

        $cekEmail = User::where('email', $credentials['email'])->first();

        $deviceNow = $request->header('User-Agent');

        if ($cekEmail->device !== $deviceNow) {
            return response()->json(['messages' => 'Device tidak cocok'], 401);
        }

        if ($cekEmail->isActive == false){
            return response()->json(['messages' => 'Akun sudah di nonaktifkan'], 401);
        }

        if (!$cekEmail) {
            return response()->json([
                'messages' => 'maaf email tidak terdaftar'
            ],402);

        } else if (Auth::attempt($credentials)) {
            $authUser = Auth::user();
            $success['token'] =  $authUser->createToken('MyAuthApp')->plainTextToken;
            $success['email'] = $authUser->email;
            $success['nama'] =  $authUser->name;
            $success['role'] = $authUser->role;
            $success['menu'] = $authUser->menu;

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
            'password_confirmation' => 'required|min:6|same:password',
            'jabatan' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'messages' => 'Error validation',
                'error' =>  $validator->errors()
            ]);
        }

        $userAgent = $request->header('User-Agent');

        $existingUser = User::where('device', $userAgent)->first();

        // if ($existingUser) {
        //     return response()->json(['error' => 'Device sudah terdaftar'], 422);
        // }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'user',
            'jabatan' => $request->jabatan,
            'device' => $userAgent,
            'menu' => json_encode(['tes','test'])
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
        return response()->json([
            'messages' => 'success',
            'data' => $user
        ]);
    }

    public function logout()
    {
        Auth::user()->tokens()->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ],200);
    }
}
