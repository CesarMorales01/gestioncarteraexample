<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\Globalvar;
use App\Models\User;
use stdClass;
use App\Traits\MetodosGenerales;

class AbonosController extends Controller
{
    public $global = null;
    use MetodosGenerales;

    public function __construct()
    {
        $this->global = new Globalvar();
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
        $carteras = $datos->carteras;
        //Cobrado en el dia
        $objeto = new stdClass();
        $objeto->ffinal = $this->cargarFechasHoy()->finicial;
        $objeto->finicial = $this->cargarFechasHoy()->ffinal;
        $abonos = null;
        $datosInformes = new stdClass();
        //Carteras para el metodo get abonos
        $arrayCarte = [];
        $arrayCarte[] = $cartera;
        $objeto->carteras = $arrayCarte;
        if ($auth->role[0] != 'Usuario') {
            $objeto->asesores = DB::table('asesores')->get();
            $abonos = app(AbonosController::class)->getAbonosByDate($objeto)->original;
        } else {
            $asesores = [];
            $asesor = DB::table('asesores')->where('id', '=', $datos->auth->id_asesores)->first();
            $asesores[] = $asesor;
            $objeto->asesores = $asesores;
            $abonos = app(AbonosController::class)->getAbonosByDate($objeto)->original;
        }
        $datosInformes->abonos = $abonos;
        $datosInformes->parametros = $objeto;
        return Inertia::render('Informes/ListaCobradoDia', compact('auth', 'globalVars', 'clientes', 'token', 'estado', 'datosInformes', 'carteras'));
    }

    public function index()
    {
    }

    public function create()
    {
    }

    public function store(Request $request)
    {
        $globalVars = $this->global->getGlobalVars();
        $get_timeBlock = DB::table('asesores')->where('id', '=', Auth()->user()->id_asesores)->first();
        $user = User::query()->where('email', '=', Auth()->user()->email)->first();
        $role = $user->getRoleNames();
        $timeBlock = $get_timeBlock->time_blocked;
        date_default_timezone_set('America/Bogota');
        $hora = date("H:i:s");
        if ($role[0] != 'Administrador' && $timeBlock != '') {
            if ($hora < $timeBlock) {
                $insertAbonos = $this->ingresarAbono($request);
                if ($insertAbonos) {
                    return redirect()->route('client.edit', [$request->cliente]);
                } else {
                    $resp = 'Error al ingresar abono, por favor comunicate con el servicio técnico.';
                    return Inertia::render('Errors/Error403', compact('resp', 'globalVars'));
                }
            } else {
                $resp = 'Sistema en horario restringido!';
                return Inertia::render('Errors/Error403', compact('resp', 'globalVars'));
            }
        } else {
            $insertAbonos = $this->ingresarAbono($request);
            if ($insertAbonos) {
                return redirect()->route('client.edit', [$request->cliente]);
            } else {
                $resp = 'Error al ingresar abono, por favor comunicate con el servicio técnico.';
                return Inertia::render('Errors/Error403', compact('resp', 'globalVars'));
            }
        }
    }

    public function ingresarAbono($request)
    {
        $prest = app(PrestamosController::class)->showJson($request->cliente);
        $nuevoAbonos = $this->sumarAbonos($prest->original->tt_abonos, $request->valor);
        $nuevoSaldo = $this->restarSaldo($prest->original->tt_saldo, $request->valor);
        $updatePrest = DB::table('prestamos')->where('cedula', '=', $request->cliente)->update([
            'tt_abonos' => $nuevoAbonos,
            'tt_saldo' => $nuevoSaldo
        ]);
        $insertAbonos = false;
        if ($updatePrest) {
            $insertAbonos = DB::table('abonos')->insert([
                'cedula' => $request->cliente,
                'fecha' => $request->fecha,
                'altura_cuota' => $request->altura,
                'valor_abono' => $request->valor,
                'asesor' => Auth()->user()->name,
                'Cobro' => $prest->original->Cobro,
                'fingreso' => $request->fingreso
            ]);
        }
        return $insertAbonos;
    }

    public function restarSaldo($total, $abono)
    {
        return floatval($total) - floatval($abono);
    }

    public function sumarAbonos($total, $abono)
    {
        return floatval($total) + floatval($abono);
    }

    public function show(string $id)
    {
        return DB::table('abonos')->where('id', '=', $id)->first();
    }

    public function eliminarAbono(Request $request)
    {
        $globalVars = $this->global->getGlobalVars();
        $resp = 'Error al eliminar abono, por favor comunicate con el servicio técnico.';
        $user = User::query()->where('email', '=', Auth()->user()->email)->first();
        $abono = $this->show($request->id);
        $role = $user->getRoleNames();
        $updatePrest = false;
        $bloqueoUsuario = false;
        if ($role[0] == 'Administrador') {
            $updatePrest = $this->eliminarConfirm($abono);
        } else {
            if ($this->cargarFechasHoy()->finicial == $abono->fingreso) {
                if ($this->getTimeBlockAsesor() != '') {
                    if ($this->getHour() < $this->getTimeBlockAsesor()) {
                        $updatePrest = $this->eliminarConfirm($abono);
                    }else{
                        $bloqueoUsuario=true;
                    }
                } else {
                    $updatePrest = $this->eliminarConfirm($abono);
                }
            }else{
                $bloqueoUsuario=true;
            }
        }
        if ($updatePrest) {
            return redirect()->route('client.edit', [$abono->cedula]);
        } else {
            if ($bloqueoUsuario) {
                $resp = 'Sistema en horario restringido!';
                return Inertia::render('Errors/Error403', compact('resp', 'globalVars'));
            } else {
                return Inertia::render('Errors/Error403', compact('resp', 'globalVars'));
            }
        }
    }

    public function eliminarConfirm($abono)
    {
        $prest = app(PrestamosController::class)->showJson($abono->cedula);
        //Coloco el valor del abono en negativo y se realizará la operación inversa en los métodos.
        $nuevoAbonos = $this->sumarAbonos($prest->original->tt_abonos, -$abono->valor_abono);
        $nuevoSaldo = $this->restarSaldo($prest->original->tt_saldo, -$abono->valor_abono);
        $updatePrest = DB::table('prestamos')->where('cedula', '=', $abono->cedula)->update([
            'tt_abonos' => $nuevoAbonos,
            'tt_saldo' => $nuevoSaldo
        ]);
        $delete = false;
        if ($updatePrest) {
            $delete = DB::table('abonos')->where('id', '=', $abono->id)->delete();
        }
        //Ordenar altura cuota
        $abonos = DB::table('abonos')->where('cedula', '=', $abono->cedula)->orderBy('fecha', 'asc')->get();
        $altura = 1;
        foreach ($abonos as $item) {
            DB::table('abonos')->where('id', '=', $item->id)->update([
                'altura_cuota' => $altura
            ]);
            $altura++;
        }
        return $delete;
    }

    public function edit($datos)
    {
    }

    public function getParamsForListByDate(Request $request)
    {
        $datos = json_decode(file_get_contents('php://input'));
        return response()->json($this->getAbonosByDate($datos), 200, []);
    }

    public function getAbonosByDate($datos)
    {
        // Get abonos
        $array = [];
        foreach ($datos->carteras as $item) {
            $arrayXAsesor = [];
            $totalCartera = 0;
            foreach ($datos->asesores as $ase) {
                $getSum = DB::table('abonos')->select(DB::raw('SUM(valor_abono) AS suma'))->whereBetween('fingreso', [$datos->finicial, $datos->ffinal])->where('Cobro', '=', $item)->where('asesor', '=', $ase->nombre)->get();
                $totalAbonos = $getSum[0]->suma;

                $listaAbonos = DB::table('abonos')->whereBetween('fingreso', [$datos->finicial, $datos->ffinal])->where('Cobro', '=', $item)->where('asesor', '=', $ase->nombre)->orderBy('id', 'desc')->get();
                // En historial
                $getSumH = DB::table('abonos_historial')->select(DB::raw('SUM(valor_abono) AS suma'))->whereBetween('fecha', [$datos->finicial, $datos->ffinal])->where('Cobro', '=', $item)->where('asesor', '=', $ase->nombre)->get();
                $totalAbonos = $totalAbonos + $getSumH[0]->suma;
                $listaAbonosH = DB::table('abonos_historial')->whereBetween('fecha', [$datos->finicial, $datos->ffinal])->where('Cobro', '=', $item)->where('asesor', '=', $ase->nombre)->orderBy('id', 'desc')->get();
                $listaAbonosTodo = [];

                foreach ($listaAbonos as $list) {
                    $listaAbonosTodo[] = $list;
                }
                foreach ($listaAbonosH as $list) {
                    $list->fingreso = $list->fecha;
                    $list->histo = 'true';
                    $listaAbonosTodo[] = $list;
                }
                foreach ($listaAbonosTodo as $list) {
                    $cliente = DB::table('clientes')->where('cedula', '=', $list->cedula)->first();
                    $nombre = $cliente->nombre;
                    if ($cliente->apellidos != '') {
                        $nombre = $nombre . " " . $cliente->apellidos;
                    }
                    $list->cliente = $nombre;
                }
                $objeto = new stdClass();
                if ($totalAbonos == null) {
                    $totalAbonos = 0;
                }
                $objeto->asesor = $ase->nombre;
                $objeto->totalAsesor = $totalAbonos;
                $objeto->listaAbonos = $listaAbonosTodo;
                $arrayXAsesor[] = $objeto;
                $totalCartera = $totalCartera + $totalAbonos;
            }
            $obj = new stdClass();
            $obj->cartera = $item;
            $obj->datos = $arrayXAsesor;
            $obj->totalCartera = $totalCartera;
            // Info totales
            $obj->totales = app(TotalesController::class)->edit($item);
            $array[] = $obj;
        }
        $obj1 = new stdClass();
        $obj1->datos = $array;
        return response()->json($obj1, 200, []);
    }

    public function update(Request $request, string $id)
    {
    }

    public function destroy(string $id)
    {
    }
}
