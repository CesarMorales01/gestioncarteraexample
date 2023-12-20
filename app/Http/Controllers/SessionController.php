<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Globalvar;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use App\Traits\MetodosGenerales;

class SessionController extends Controller
{
    public $global = null;
    use MetodosGenerales;

    public function __construct()
    {
        $this->global = new Globalvar();
    }

    public function index()
    {
        $datos = $this->cargarDatosGenerales();
        $auth = $datos->auth;
        $globalVars = $datos->globalVars;
        $clientes = $datos->clientes;
        $carteras = $datos->carteras;
        //Si no hay carteras redireccionar para evitar errores....
        if (count($carteras) == 0) {
            if ($auth->role[0] != 'Administrador') {
                $resp = 'Asesor sin carteras habilitadas!';
                return Redirect::route('client.list', $resp);
            } else {
                return Redirect::route('user.list', 'Habilita carteras!');
            }
        } else {
            $role = User::query()->where('email', '=', $auth->email)->first();
            $auth->role = $role->getRoleNames();
            $auth->permissions = $role->getAllPermissions();
            return Inertia::render('Dashboard', compact('auth', 'globalVars', 'clientes'));
        }
    }
}
