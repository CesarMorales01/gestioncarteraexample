<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\Globalvar;
use App\Models\User;
use stdClass;
use App\Traits\MetodosGenerales;
use Illuminate\Support\Facades\Redirect;

class TotalesController extends Controller
{
    public $global = null;
    use MetodosGenerales;

    public function __construct()
    {
        $this->global = new Globalvar();
        $this->middleware(['permission:ver-graficos-informes']);
    }

    public function index()
    {
        //
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $mes = $this->cargarFechasHoy()->finicial;
        $datos = [];
        for ($i = 0; $i < count($request->datos); $i++) {
            $token = strtok($request->datos[$i], ",");
            while ($token !== false) {
                $datos[] = $token;
                $token = strtok(",");
            }
        }
       DB::table('totales')->insert([
        'mes'=>$mes,
        'Total_cuentas'=>$datos[0],
        'Total_abonos'=>$datos[1],
        'Total_saldos'=>$datos[2],
        'cartera_mora'=>$datos[3],
        'tt_clientes'=>$datos[4],
        'tt_prestamos'=>$datos[5],
        'clientes_sinsaldo'=>$datos[6],
        'Cobro'=>$datos[7]
       ]);
       return Redirect::route('informes.list', 'Totales guardado!');
    }

    public function show(string $cartera)
    {
        //Total clientes todos
        $total = DB::table('totales')->where('Cobro', '=', $cartera)->orderBy('id', 'desc')->get();
        $months = [];
        $tt_clientes = [];
        $tt_prestamos = [];
        $tt_sin_saldo = [];
        for ($i = 0; $i < count($total); $i++) {
            $months[] = $total[$i]->Mes;
            $tt_clientes[] = $total[$i]->tt_clientes;
            $tt_prestamos[] = $total[$i]->tt_prestamos;
            $tt_sin_saldo[] = $total[$i]->clientes_sinsaldo;
        }
        $obje = new stdClass();
        $obje->meses = $months;
        $obje->total_clientes = $tt_clientes;
        $obje->total_prestamos = $tt_prestamos;
        $obje->total_clientes_sinsaldo = $tt_sin_saldo;
        return $obje;
    }

    public function edit(string $cartera)
    {
        //Get solo ultimos 5 registros mas actual
        $total = DB::table('totales')->where('Cobro', '=', $cartera)->orderBy('id', 'desc')->limit(5)->get();
        $months = [];
        $totales = [];
        $saldo = [];
        $abono = [];
        $mor = [];
        $tt_clientes = [];
        $tt_prestamos = [];
        $tt_sin_saldo = [];
        for ($i = 0; $i < count($total); $i++) {
            $months[] = $total[$i]->Mes;
            $totales[] = $total[$i]->Total_cuentas;
            $saldo[] = $total[$i]->Total_saldos;
            $abono[] = $total[$i]->Total_abonos;
            $mor[] = $total[$i]->cartera_mora;
            $tt_clientes[] = $total[$i]->tt_clientes;
            $tt_prestamos[] = $total[$i]->tt_prestamos;
            $tt_sin_saldo[] = $total[$i]->clientes_sinsaldo;
        }
        $months_reverse = array_reverse($months);
        $totales_reverse = array_reverse($totales);
        $saldo_reverse = array_reverse($saldo);
        $abono_reverse = array_reverse($abono);
        $mor_reverse = array_reverse($mor);

        $tt_clientes_reverse = array_reverse($tt_clientes);
        $tt_prestamos_reverse = array_reverse($tt_prestamos);
        $tt_sin_saldo_reverse = array_reverse($tt_sin_saldo);

        $months_reverse[] = 'Actual';
        $getSumTotal = DB::table('prestamos')->select(DB::raw('sum(totalapagar) as total, sum(tt_abonos) as abonos, sum(tt_saldo) as saldos'))->where('Cobro', '=', $cartera)->first();
        $totales_reverse[] = $getSumTotal->total;
        $saldo_reverse[] = $getSumTotal->saldos;
        $abono_reverse[] = $getSumTotal->abonos;
        $getMora = DB::table('prestamos')->select(DB::raw('sum(tt_saldo) as saldos'))->where('vencimiento', '<', $this->cargarFechasHoy()->finicial)->where('Cobro', '=', $cartera)->first();
        $mor_reverse[] = $getMora->saldos;

        $getSumClientes = DB::table('clientes')->select(DB::raw('count(*) as total'))->where('Cobro', '=', $cartera)->first();
        $tt_clientes_reverse[] = $getSumClientes->total;
        $getSumPrest = DB::table('prestamos')->select(DB::raw('count(*) as total'))->where('Cobro', '=', $cartera)->first();
        $tt_prestamos_reverse[] = $getSumPrest->total;
        $tt_sin_saldo_reverse[] = $getSumClientes->total - $getSumPrest->total;

        $obje = new stdClass();
        $obje->meses = $months_reverse;
        $obje->totales = $totales_reverse;
        $obje->saldos = $saldo_reverse;
        $obje->abonos = $abono_reverse;
        $obje->mora = $mor_reverse;
        $obje->total_clientes = $tt_clientes_reverse;
        $obje->total_prestamos = $tt_prestamos_reverse;
        $obje->total_clientes_sinsaldo = $tt_sin_saldo_reverse;
        return $obje;
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
