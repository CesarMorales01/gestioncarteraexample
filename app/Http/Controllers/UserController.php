<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Globalvar;
use Illuminate\Support\Facades\DB;
use App\Traits\MetodosGenerales;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class UserController extends Controller
{
    public $global = null;
    use MetodosGenerales;


    public function __construct()
    {
        $this->global = new Globalvar();
        $this->middleware(['role:Administrador', 'permission:editar-usuarios']);
    }

    public function listar($state = 'nothing')
    {
        $datos = $this->cargarDatosGenerales();
        $auth = $datos->auth;
        $globalVars = $datos->globalVars;
        $clientes = $datos->clientes;
        $carteras = DB::table($this->global->getGlobalVars()->tablaCarteras)->get();
        $token = csrf_token();
        $asesores = DB::table('asesores')->get();
        $roles = DB::table('roles')->get();
        foreach ($asesores as $ase) {
            $email = DB::table('users')->where('id_asesores', '=', $ase->id)->first();
            $ase->email = $email->email;
        }
        return Inertia::render('Asesores/Users', compact('auth', 'globalVars', 'token', 'state', 'clientes', 'carteras', 'asesores', 'roles'));
    }

    public function index()
    {
        $user = User::all();
        return response()->json($user, 200, []);
    }

    public function create()
    {
    }

    public function store(Request $request)
    {
        $validarCorreo = DB::table('users')->where('email', '=', $request->email)->first();
        if ($validarCorreo == null) {
            $bloqueo = '';
            if ($request->quitarBloqueo == 'false') {
                $bloqueo = $request->hora . ":" . $request->minutos . ":00";
            }
            DB::table('asesores')->insert([
                'nombre' => $request->nombre,
                'imei' => $request->contra,
                'time_blocked' => $bloqueo,
                'tipo_usuario' => $request->tipo
            ]);
            $user = User::create([
                'name' => $request->nombre,
                'email' => $request->email,
                'password' => Hash::make($request->contra),
                'id_asesores' => DB::getPdo()->lastInsertId()
            ]);
            $user->assignRole(ucwords($request->tipo));
            return Redirect::route('user.list', 'Nuevo asesor registrado!');
        } else {
            return Redirect::route('user.list', 'El e-mail ingresado ya se encuentra asociado a un usuario!');
        }
    }

    public function show(string $id)
    {
        // borrar asesor 
        DB::table('asesores')->where('id', '=', $id)->delete();
        $model = DB::table('users')->where('id_asesores', '=', $id)->first();
        DB::table('model_has_roles')->where('model_id', '=', $model->id)->delete();
        DB::table('users')->where('id_asesores', '=', $id)->delete();
        return Redirect::route('user.list', 'Asesor eliminado!');
    }

    public function actualizar(Request $request)
    {
        $bloqueo = '';
        if ($request->quitarBloqueo == 'false') {
            $bloqueo = $request->hora . ":" . $request->minutos . ":00";
        }
        DB::table('asesores')->where('id', '=', $request->id)->update([
            'nombre' => $request->nombre,
            'imei' => $request->contra,
            'time_blocked' => $bloqueo,
            'tipo_usuario' => $request->tipo
        ]);
        $user = User::where('id_asesores', '=', $request->id)->first();
        User::where('id_asesores', $request->id)->update([
            'name' => $request->nombre,
            'email' => $request->email,
            'password' => Hash::make($request->contra)
        ]);
        DB::table('model_has_roles')->where('model_id', '=', $user->id)->delete();
        $user->assignRole(ucwords($request->tipo));
        //actualizar todas las tablas...
        DB::table('prestamos')->where('asesor', '=', $user->name)->update([
            'asesor' => $request->nombre
        ]);
        DB::table('prestamos_historial')->where('asesor', '=', $user->name)->update([
            'asesor' => $request->nombre
        ]);
        DB::table('abonos')->where('asesor', '=', $user->name)->update([
            'asesor' => $request->nombre
        ]);
        DB::table('abonos_historial')->where('asesor', '=', $user->name)->update([
            'asesor' => $request->nombre
        ]);
        DB::table('caja')->where('asesor', '=', $user->name)->update([
            'asesor' => $request->nombre
        ]);
        DB::table('lista_cobrado')->where('asesor', '=', $user->name)->update([
            'asesor' => $request->nombre
        ]);
        return Redirect::route('user.list', 'Asesor actualizado!');
    }

    public function edit(string $id)
    {
        // Validar registros de asesor antes de eliminar
        $nombreAse = DB::table('asesores')->where('id', '=', $id)->first();
        $validar = false;
        $prestamos = DB::table('prestamos')->where('asesor', '=', $nombreAse->nombre)->first();
        if ($prestamos != null) {
            $validar = true;
        }
        $abonos = DB::table('abonos')->where('asesor', '=', $nombreAse->nombre)->first();
        if ($abonos != null) {
            $validar = true;
        }
        $prestamosH = DB::table('prestamos_historial')->where('asesor', '=', $nombreAse->nombre)->first();
        if ($prestamosH != null) {
            $validar = true;
        }
        $abonosH = DB::table('abonos_historial')->where('asesor', '=', $nombreAse->nombre)->first();
        if ($abonosH != null) {
            $validar = true;
        }
        return response()->json($validar, 200, []);
    }

    public function update(Request $request, string $id)
    {
    }

    public function destroy(string $id)
    {
    }
}
