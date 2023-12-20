<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Globalvar;
use Inertia\Inertia;
use stdClass;
use App\Traits\MetodosGenerales;

class PrestamosController extends Controller
{
    public $global = null;
    use MetodosGenerales;

    public function __construct()
    {
        $this->global = new Globalvar();
        $this->middleware(['permission:editar-prest'])->only('actualizarPrestamo');
        $this->middleware(['permission:eliminar-prest'])->only('edit');
    }

    public function listByDateShow($cartera)
    {
        $datos = $this->cargarDatosGenerales();
        $auth = $datos->auth;
        $globalVars = $datos->globalVars;
        $clientes = $datos->clientes;
        $token = csrf_token();
        $estado = '';
        // Carteras para mostrar en el select
        $carteras=$datos->carteras;
        //Cobrado en el dia
        $objeto = new stdClass();
        $objeto->ffinal = $this->cargarFechasHoy()->finicial;
        $objeto->finicial = $this->cargarFechasHoy()->ffinal;
        $prestamos = null;
        $datosInformes = new stdClass();
        //Carteras para el metodo get abonos
        $arrayCarte=[];
        $arrayCarte []=$cartera;
        $objeto->carteras = $arrayCarte;
        if ($auth->role[0] != 'Usuario') {
            $objeto->asesores = DB::table('asesores')->get();
            $prestamos = $this->show($objeto)->original;
        } else {
            $asesores = [];
            $asesor = DB::table('asesores')->where('id', '=', $datos->auth->id_asesores)->first();
            $asesores[] = $asesor;
            $objeto->asesores = $asesores;
            $prestamos = $this->show($objeto)->original;
        }
        $datosInformes->prestamos = $prestamos;
        $datosInformes->parametros = $objeto;
        return Inertia::render('Informes/ListaPrestadoDia', compact('auth', 'globalVars', 'clientes', 'token', 'estado', 'datosInformes', 'carteras'));
    }

    public function index(){}

    public function create() {}

    public function store(Request $request)
    {
        $ingresar = DB::table('prestamos')->insert([
            'cedula' => $request->cedula,
            'fecha_prest' => $request->fecha_prest,
            'valorprestamo' => $request->valorprestamo,
            'tiempo_meses' => $request->tiempo_meses,
            'interes' => $request->interes,
            'periodicidad' => $request->periodicidad,
            'n_cuotas' => $request->n_cuotas,
            'valor_cuotas' => $request->valor_cuotas,
            'totalapagar' => $request->totalapagar,
            'vencimiento' => $request->vencimiento,
            'asesor' => Auth()->user()->name,
            'tt_abonos' => $request->tt_abonos,
            'tt_saldo' => $request->tt_saldo,
            'Cobro' => $request->Cobro
        ]);
        if ($ingresar) {
            return redirect()->route('client.edit', [$request->cedula]);
        } else {
            $globalVars = $this->global->getGlobalVars();
            $resp = 'Error al ingresar préstamo, por favor comunicate con el servicio técnico.';
            return Inertia::render('Errors/Error403', compact('resp', 'globalVars'));
        }
    }

    public function actualizarPrestamo(Request $request)
    {
        $ingresar = DB::table('prestamos')->where('cedula', $request->cedula)->update([
            'fecha_prest' => $request->fecha_prest,
            'valorprestamo' => $request->valorprestamo,
            'tiempo_meses' => $request->tiempo_meses,
            'interes' => $request->interes,
            'periodicidad' => $request->periodicidad,
            'n_cuotas' => $request->n_cuotas,
            'valor_cuotas' => $request->valor_cuotas,
            'totalapagar' => $request->totalapagar,
            'vencimiento' => $request->vencimiento,
            'asesor' => $request->asesor,
            'tt_abonos' => $request->tt_abonos,
            'tt_saldo' => $request->tt_saldo,
            'Cobro' => $request->Cobro
        ]);
        if ($ingresar) {
            return redirect()->route('client.edit', [$request->cedula]);
        } else {
            $globalVars = $this->global->getGlobalVars();
            $resp = 'Error al editar préstamo, por favor comunicate con el servicio técnico.';
            return Inertia::render('Errors/Error403', compact('resp', 'globalVars'));
        }
    }

    public function getParamsForListByDate(Request $request){
        $datos = json_decode(file_get_contents('php://input'));
        return response()->json($this->show($datos), 200, []);
    }

    public function show($datos)
    {
        // Get prestamos entre fechas, cartera y asesores dados
        $array = [];
        foreach ($datos->carteras as $item) {
            $arrayXAsesor = [];
            $totalCartera = 0;
            $totalUtilidades=0;
            foreach ($datos->asesores as $ase) {
                $getPrest = DB::table('prestamos')->select(DB::raw('SUM(valorprestamo) AS suma'))->whereBetween('fecha_prest', [$datos->finicial, $datos->ffinal])->where('Cobro', '=',$item)->where('asesor', '=', $ase->nombre)->get();
                if ($getPrest[0]->suma == null) {
                    $getPrest[0]->suma = 0;
                }
                $getPrestH = DB::table('prestamos_historial')->select(DB::raw('SUM(valorprestamo) AS suma'))->whereBetween('fecha_prest', [$datos->finicial, $datos->ffinal])->where('Cobro', '=',$item)->where('asesor', '=', $ase->nombre)->get();
                if ($getPrestH[0]->suma == null) {
                    $getPrestH[0]->suma = 0;
                }
                $totalPrestamos = $getPrest[0]->suma+$getPrestH[0]->suma;
                $listaPrestamos=[];
                $lista= DB::table('prestamos')->whereBetween('fecha_prest', [$datos->finicial, $datos->ffinal])->where('Cobro', '=', $item)->where('asesor', '=', $ase->nombre)->get();
                $listaH= DB::table('prestamos_historial')->whereBetween('fecha_prest', [$datos->finicial, $datos->ffinal])->where('Cobro', '=', $item)->where('asesor', '=', $ase->nombre)->get();
                foreach ($lista as $list) {
                    $listaPrestamos[]=$list;
                }
                foreach ($listaH as $list) {
                    $list->histo='true';
                    $listaPrestamos[]=$list;
                }
                $totalUtiAsesor=0;
                foreach ($listaPrestamos as $list) {
                    $cliente = DB::table('clientes')->where('cedula', '=', $list->cedula)->first();
                    $nombre = $cliente->nombre;
                    if ($cliente->apellidos != '') {
                        $nombre = $nombre . " " . $cliente->apellidos;
                    }
                    $list->cliente = $nombre;
                    $uti=intval($list->totalapagar)-intval($list->valorprestamo);
                    $list->utilidad=$uti;
                    $totalUtiAsesor=$totalUtiAsesor+$uti;
                    $totalUtilidades=$totalUtilidades+$uti;
                }
                $objeto = new stdClass();
                $objeto->asesor = $ase->nombre;
                $objeto->totalAsesor = $totalPrestamos;
                $objeto->lista = $listaPrestamos;
                $objeto->totalUtilidad=$totalUtiAsesor;
                $arrayXAsesor[] = $objeto;
                $totalCartera = $totalCartera + $totalPrestamos;
               
            }
            $obj = new stdClass();
            $obj->cartera = $item;
            $obj->datos = $arrayXAsesor;
            $obj->totalCartera = $totalCartera;
            $obj->totalUtilidad=$totalUtilidades;
            $array[] = $obj;
        }
        $obj1 = new stdClass();
        $obj1->datos = $array;
        return response()->json($obj1, 200, []);
    }

    public function showJson(string $id)
    {
        $prest = DB::table('prestamos')->where('cedula', '=', $id)->first();
        return response()->json($prest, 200, []);
    }

    public function edit(string $id)
    {
        //BORRAR PRESTAMO Y ABONOS
        $borrar = DB::table('abonos')->where('cedula', '=', $id)->delete();
        $borrar1 = DB::table('prestamos')->where('cedula', '=', $id)->delete();
        if ($borrar1) {
            return redirect()->route('client.edit', [$id]);
        } else {
            $globalVars = $this->global->getGlobalVars();
            $resp = 'Error al borrar préstamo y abonos, por favor comunicate con el servicio técnico.';
            return Inertia::render('Errors/Error403', compact('resp', 'globalVars'));
        }
    }

    public function update(Request $request, string $id)
    {
    }

    public function destroy(string $id)
    {
    }
}
