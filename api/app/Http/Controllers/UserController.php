<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index(Request $request)
    {
        if($request->jabatan){
            $user = User::where('jabatan', $request->jabatan)->get();
        }else if ($request->isActive){
            $user  = User::where('isActive', $request->isActive)->get();
        }else{
            $user = User::where('isActive', true)->paginate(10);
        }
    }

    public function update(Request $request, $id)
    {
        
    }

    public function destroy($id)
    {
        //
    }
}
