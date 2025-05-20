<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;

class SessionController extends Controller
{
    public function create()
    {
        return view('auth.login');
    }

    public function store()
    {
       
       $validatedAttributes = request()->validate([
           'email' => ['required', 'email'],
           'password' => ['required']
       ]);

       if ( !Auth::attempt($validatedAttributes)) {
        throw ValidationException::withMessages([
            'email'=> 'Please check your credentials',
        ]);
       }
       
        request()->session()->regenerate();
       
        return redirect('/jobs');
    }

    public function destroy()
    {
        Auth::logout();
        return redirect('/login');
    }
}