<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Profile;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\User as UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function profile(Request $request)
    {
        $user = Profile::select('users.*','profiles.id AS id_profile','profiles.foto','profiles.latar_belakang','profiles.tujuan','profiles.ruang_lingkup')
            ->join('Users', 'users.id', '=', 'profiles.id_user')
            ->where('users.id', Auth::user()->id)
            ->first();
        
        return response(new UserResource($user));
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'latar_belakang' => 'required|string|max:700',
            'tujuan' => 'required|string|max:700',
            'ruang_lingkup' => 'required',
            // 'ttd' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'messages' => 'Error validation',
                'error' =>  $validator->errors()
            ]);
        }

        $idProfile = Profile::select('id')->where('id_user', $id)->first();

        if ($request->file) {
            $path = $request->file('foto')->store('public');
        }

        $user = Profile::findorNew($idProfile->id);
        $user->foto = $request->foto ? $path : null;
        $user->id_user = $id;
        $user->latar_belakang = $request->latar_belakang;
        $user->tujuan = $request->tujuan;
        $user->ruang_lingkup = $request->ruang_lingkup;
        // $user->ttd = $request->ttd;
        // $user->isComplete = true;
        $user->save();

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
