<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use stdClass;
use App\Models\Globalvar;
use App\Traits\MetodosGenerales;

class GastosController extends Controller
{
    public $global = null;
    use MetodosGenerales;

    public function __construct()
    {
        $this->global = new Globalvar();
        $this->middleware(['permission:ver-gastos']);
    }

    public function index()
    {
    }

    public function listar($cartera, $state = 'nothing')
    {
        $datos = $this->cargarDatosGenerales();
        $auth = $datos->auth;
        $globalVars = $datos->globalVars;
        $clientes = $datos->clientes;
        $estado = '';
        $carteras = $datos->carteras;
        //EN TABLA GASTOS SE REGISTRA EL ID DE LA CARTERA!!!!
        $carterasIds=[];
        foreach($carteras as $carte){
            $carterasIds[]=DB::table($this->global->globalVars->tablaCarteras)->where('Nombre', '=', $carte)->first();
        }
        if ($cartera != 'nothing') {
            $estado = $state;
        } else {
            $cartera = $carterasIds[0]->id;
        }
        $date = now();
        $año = date_format($date, "Y");
        $mes = date_format($date, "m");
        $ffinal = date("Y-m-t", strtotime($date));
        $finicial = $año . "-" . $mes . "-" . '01';
        $getGastos = DB::table('gastos')->select(DB::raw('SUM(valor) AS suma'))->whereBetween('fecha', [$finicial, $ffinal])->where('cartera', '=', $cartera)->get();
        $gastos = $getGastos[0]->suma;
        $listaGastos = DB::table('gastos')->where('cartera', '=', $cartera)->whereBetween('fecha', [$finicial, $ffinal])->leftJoin('categorias_gastos', 'gastos.categoriaGasto', '=', 'categorias_gastos.id')
            ->select('gastos.*', 'categorias_gastos.nombre as categoria')
            ->orderBy('gastos.id', 'desc')->get();
        $categorias = DB::table('categorias_gastos')->get();
        $token = csrf_token();
        return Inertia::render('Spend/Spend', compact('auth', 'globalVars', 'gastos', 'categorias', 'token', 'estado', 'listaGastos', 'clientes', 'carterasIds', 'cartera'));
    }

    public function create()
    {
    }

    public function listByDate($finicial, $ffinal, $cartera, $category = '')
    {
        $gastos = null;
        $listaGastos = null;
        if ($category == '') {
            $listaGastos = DB::table('gastos')->where('cartera', '=', $cartera)->whereBetween('fecha', [$finicial, $ffinal])->leftJoin('categorias_gastos', 'gastos.categoriaGasto', '=', 'categorias_gastos.id')
                ->select('gastos.*', 'categorias_gastos.nombre as categoria')
                ->orderBy('gastos.id', 'desc')->get();
            $gastos = DB::table('gastos')->select(DB::raw('SUM(valor) AS suma'))->where('cartera', '=', $cartera)->whereBetween('fecha', [$finicial, $ffinal])->get();
        } else {
            $listaGastos = DB::table('gastos')->where('cartera', '=', $cartera)->where('categoriaGasto', '=', $category)->whereBetween('fecha', [$finicial, $ffinal])->leftJoin('categorias_gastos', 'gastos.categoriaGasto', '=', 'categorias_gastos.id')
                ->select('gastos.*', 'categorias_gastos.nombre as categoria')
                ->orderBy('gastos.id', 'desc')->get();
            $gastos = DB::table('gastos')->where('cartera', '=', $cartera)->where('categoriaGasto', '=', $category)->select(DB::raw('SUM(valor) AS suma'))->whereBetween('fecha', [$finicial, $ffinal])->get();
        }
        $gastos = $gastos[0]->suma;
        $objeto = new stdClass();
        $objeto->gastos = $gastos;
        $objeto->listaGastos = $listaGastos;
        return response()->json($objeto, 200, []);
    }

    public function store(Request $request)
    {
        DB::table('gastos')->insert([
            'fecha' => $request->fecha,
            'categoriaGasto' => $request->categoria,
            'valor' => $request->valor,
            'comentario' => $request->comentario,
            'cartera' => $request->cartera
        ]);
        return Redirect::route('spend.list', [$request->cartera, 'Gasto registrado!']);
    }

    public function show(string $id)
    {
        // Borrar aca porque method in react no se puede editar....
        $gasto= DB::table('gastos')->where('id', '=', $id)->first();
        DB::table('gastos')->where('id', '=', $id)->delete();
        return Redirect::route('spend.list', [$gasto->cartera, 'Gasto eliminado!']);
    }

    public function edit(string $id)
    {
    }

    public function update(Request $request, string $id)
    {
    }

    public function destroy(string $id)
    {
    }
}
