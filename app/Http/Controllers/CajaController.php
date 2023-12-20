<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Globalvar;
use App\Models\User;
use Inertia\Inertia;
use stdClass;
use App\Traits\MetodosGenerales;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class CajaController extends Controller
{
    public $global = null;
    use MetodosGenerales;

    public function __construct()
    {
        $this->global = new Globalvar();
        $this->middleware(['permission:borrar-caja']);
    }

    public function index()
    {
    }

    public function create()
    {
    }

    public function store(Request $request)
    {
        date_default_timezone_set('America/Bogota');
        $fecha = $request->fecha . " " . date("H:i:s");
        DB::table('caja')->insert([
            'fecha' => $fecha,
            'cobrado' => $request->cobrado,
            'otros_ingresos' => $request->otros_ingresos,
            'comentario_ingresos' => $request->comentario_ingresos,
            'total_ingresos' => $request->total_ingresos,
            'prestado' => $request->prestado,
            'otros_gastos' => $request->otros_gastos,
            'comentario_egresos' => $request->comentario_egresos,
            'total_egresos' => $request->total_egresos,
            'entradas_neto' => $request->entradas_neto,
            'total_caja' => $request->total_caja,
            'Cobro' => $request->Cobro,
            'asesor' => Auth()->user()->name
        ]);
        return Redirect::route('caja.edit', $request->Cobro);

        return response()->json($fecha, 200, []);
    }

    public function show(Request $request)
    {
        //Borrar registro de caja
        $borrarCaja = false;
        $auth = $this->getRolesPermisos();
        if ($auth->role[0] == 'Administrador') {
            $borrarCaja = DB::table('caja')->where('id', '=', $request->id)->delete();
        } else {
            // Comprobar fecha y hora
            $registro = DB::table('caja')->where('id', '=', $request->id)->first();
            if ($this->cargarFechasHoy()->finicial == str_split($registro->fecha, '10')[0]) {
                if ($this->getTimeBlockAsesor() != '') {
                    if ($this->getHour() < $this->getTimeBlockAsesor()) {
                        $borrarCaja = DB::table('caja')->where('id', '=', $request->id)->delete();
                    }
                } else {
                    $borrarCaja = DB::table('caja')->where('id', '=', $request->id)->delete();
                }
            }
        }
        if ($borrarCaja) {
            return Redirect::route('caja.edit', $request->Cobro);
        } else {
            $resp = 'Sistema en horario restringido!';
            $globalVars = $this->global->getGlobalVars();
            return Inertia::render('Errors/Error403', compact('resp', 'globalVars'));
        }
    }

    public function edit(string $cartera)
    {
        $caja = new stdClass();
        $caja->cartera = $cartera;
        $caja->caja = DB::table('caja')->where('Cobro', '=', $cartera)->orderBy('fecha', 'desc')->get();
        // Borrar caja a partir de 3 meses = 180 registros.
        if (count($caja->caja) > 180) {
            DB::table('caja')->where('id', '<', $caja->caja[180]->id)->delete();
        }
        //Datos autofill caja
        $objeto = new stdClass();
        $objeto->ffinal = $this->cargarFechasHoy()->finicial;
        $objeto->finicial = $this->cargarFechasHoy()->ffinal;
        $arrayCarte = [];
        $arrayCarte[] = $cartera;
        $objeto->carteras = $arrayCarte;
        $objeto->asesores = DB::table('asesores')->get();
        //Abonos
        $abonos = app(AbonosController::class)->getAbonosByDate($objeto)->original;
        $autoFill = new stdClass();
        $autoFill->cobrado = $abonos->datos[0]->totalCartera;
        //prestamos
        $prestamos = app(PrestamosController::class)->show($objeto)->original;
        $autoFill->prestado = $prestamos->datos[0]->totalCartera;
        //gastos
        $idCarte = DB::table($this->global->getGlobalVars()->tablaCarteras)->where('Nombre', '=', $cartera)->first();
        $gastos = app(GastosController::class)->listByDate($objeto->finicial, $objeto->finicial, $idCarte->id, '');
        if ($gastos->original->gastos == null) {
            $gastos->original->gastos = 0;
        }
        $autoFill->gastos = $gastos->original->gastos;
        //ultimo total en caja
        $getCaja = DB::table('caja')->where('Cobro', '=', $cartera)->orderBy('id', 'desc')->first();
        if($getCaja==null){
            $autoFill->total_caja = 0;
        }else{
            $autoFill->total_caja = $getCaja->total_caja;
        }
        $caja->autofill = $autoFill;
        $datos = $this->cargarDatosGenerales();
        $auth = $datos->auth;
        $globalVars = $datos->globalVars;
        $clientes = $datos->clientes;
        $token = csrf_token();
        return Inertia::render('Caja/Caja', compact('auth', 'globalVars', 'clientes', 'token', 'caja'));
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
