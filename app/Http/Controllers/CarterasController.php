<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Globalvar;
use Illuminate\Support\Facades\DB;
use App\Traits\MetodosGenerales;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CarterasController extends Controller
{
    public $global = null;
    use MetodosGenerales;

    public function __construct()
    {
        $this->global = new Globalvar();
        $this->middleware(['permission:editar-carteras'])->except('carteraPrede');
    }

    public function listar($state = 'nothing')
    {
        $datos = $this->cargarDatosGenerales();
        $auth = $datos->auth;
        $globalVars = $datos->globalVars;
        $clientes = $datos->clientes;
        $carteras = DB::table($this->global->getGlobalVars()->tablaCarteras)->get();
        $token = csrf_token();
        return Inertia::render('Carteras/Carteras', compact('auth', 'globalVars', 'token', 'state', 'clientes', 'carteras'));
    }

    public function index()
    {
    }

    public function create()
    {
    }

    function carteraPrede(Request $request)
    {
        $imei = DB::table('asesores')->where('id', '=', $request->id)->first();
        DB::table('cartera_prede')
            ->updateOrInsert(
                ['asesor' => $request->id],
                ['variable' => $request->cartera]
            );
        return response()->json($imei, 200, []);
    }

    public function store(Request $request)
    {
        DB::table($this->global->getGlobalVars()->tablaCarteras)->insert([
            'Nombre' => $request->nombre
        ]);
        return Redirect::route('cartera.list', 'Cartera ' . $request->nombre . ' creada!');
    }

    public function show(Request $request)
    {
        // Eliminar cartera
        $validar = false;
        $clientes = DB::table('clientes')->where('Cobro', '=', $request->cartera)->first();
        if ($clientes != null) {
            $validar = true;
        }
        $prestamos = DB::table('prestamos')->where('Cobro', '=', $request->cartera)->first();
        if ($prestamos != null) {
            $validar = true;
        }
        $abonos = DB::table('abonos')->where('Cobro', '=', $request->cartera)->first();
        if ($abonos != null) {
            $validar = true;
        }
        if ($validar) {
            return Redirect::route('cartera.list', 'La cartera a eliminar tiene clientes, préstamos o abonos!');
        } else {
            DB::table($this->global->getGlobalVars()->tablaCarteras)->where('id', '=', $request->id)->delete();
            //Sacar cartera de unable asesores
            $asesores = DB::table('asesores')->where('unable', 'like', '%' . $request->cartera . '%')->get();
            foreach ($asesores as $ase) {
                $get = $ase->unable;
                $tok = strtok($get, ",");
                $array = [];
                while ($tok !== false) {
                    $array[] = $tok;
                    $tok = strtok(",");
                }
                $filter = [];
                foreach ($array as $item) {
                    if ($item != $request->cartera) {
                        $filter[] = $item;
                    }
                }
                DB::table('asesores')->where('id', '=', $ase->id)->update([
                    'unable' => implode(",", $filter)
                ]);
            }
            return Redirect::route('cartera.list', 'Cartera eliminada!');
        }
    }

    public function edit(string $id, Request $request)
    {
        $asesor = DB::table('asesores')->where('id', '=', $id)->first();
        DB::table('asesores')->where('id', '=', $id)->update([
            'unable' => $request->carteras
        ]);
        return Redirect::route('user.list', 'Carteras habilitadas para asesor ' . $asesor->nombre . ' actualizadas!');
    }

    public function update(Request $request, string $id)
    {
    }

    public function destroy(string $id)
    {
    }
}
