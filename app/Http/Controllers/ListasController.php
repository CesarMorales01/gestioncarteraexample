<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Globalvar;
use Illuminate\Support\Facades\DB;
use App\Traits\MetodosGenerales;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Redis;
use Inertia\Inertia;
use stdClass;

class ListasController extends Controller
{
    public $global = null;
    use MetodosGenerales;

    public function __construct()
    {
        $this->global = new Globalvar();
    }

    public function index()
    {
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //Servicio lista x cartera
        $listas=DB::table('lista_cobrado')->where('cobro', '=', $request->cartera)->orderBy('id', 'desc')->get();
        return response()->json($listas, 200, []);
    }

    public function show(Request $request)
    {
        //Eliminar registro
        DB::table('lista_cobrado')->where('id', '=', $request->id)->delete();
        return Redirect::route('listas.edit', $request->Cobro);
    }

    public function edit(string $cartera)
    {
        $datos = $this->cargarDatosGenerales();
        $listas = null;
        if ($datos->auth->role[0] != 'Usuario') {
            $listas = DB::table('lista_cobrado')->where('cobro', '=', $cartera)->orderBy('id', 'desc')->get();
            // Borrar lista a partir de dos meses con 3 asesores= 183 registros.
            if (count($listas) > 120) {
                DB::table('lista_cobrado')->where('id', '<', $listas[120]->id)->delete();
            }
        } else {
            $listas = DB::table('lista_cobrado')->where('cobro', '=', $cartera)->where('asesor', '=', $datos->auth->name)->orderBy('id', 'desc')->get();
        }
        $token = csrf_token();
        $carteras = $datos->carteras;
        $globalVars = $datos->globalVars;
        return Inertia::render('Listas/Listas', compact('datos', 'token', 'listas', 'cartera', 'carteras', 'globalVars'));
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
