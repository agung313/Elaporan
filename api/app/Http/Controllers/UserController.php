<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    public function update(Request $request, $id)
    {
        $user = User::findorNew($id);
        $user->foto = $request->foto;
        $user->save();
    }

    public function destroy($id)
    {
        
    }
}
