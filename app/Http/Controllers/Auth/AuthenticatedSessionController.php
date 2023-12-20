<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Globalvar;

class AuthenticatedSessionController extends Controller
{
    public $global = null;

    public function __construct()
    {
        $this->global = new Globalvar();
    }

    public function create()
    { 
        $globalVars = $this->global->getGlobalVars();
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
            'globalVars'=>$globalVars
        ]);
    }

    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();
        $this->setSession($request);
        $request->session()->regenerate();
        return redirect()->intended(RouteServiceProvider::HOME);
    }

    public function setSession($request){
        setcookie("tipo_usuario", $request->password, time()+60*60*24*365);
        setcookie("cobrador", $request->password, time()+60*60*24*365);
        if($request->remember){
            setcookie("password", $request->password, time()+60*60*24*365);
            setcookie("email", $request->email, time()+60*60*24*365);
        }else{
            setcookie("email", "", time()-1);
            setcookie("password", "", time()-1);
        }   
    }

    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
