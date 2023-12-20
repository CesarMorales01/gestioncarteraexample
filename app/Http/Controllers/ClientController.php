<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Globalvar;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use App\Traits\MetodosGenerales;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use stdClass;

class ClientController extends Controller
{
    public $global = null;
    use MetodosGenerales;

    public function __construct()
    {
        $this->global = new Globalvar();
        $this->middleware(['permission:editar-cliente'])->only(['actualizar', 'show']);
    }

    public function listar($state = 'nothing')
    {
        $datos = $this->cargarDatosGenerales();
        $auth = $datos->auth;
        $globalVars = $datos->globalVars;
        //Para autocomplete
        $clientes = $datos->clientes;
        $carteras = $datos->carteras;
        if (count($carteras) > 0) {
            if ($this->getCarteSelected($auth->id_asesores)->variable == '') {
                $cartera = $carteras[0];
            } else {
                $cartera = $this->getCarteSelected($auth->id_asesores)->variable;
            }
        } else {
            $cartera = '';
        }
        //Para tabla ordenado por cartera
        $listaClientes = DB::table('clientes')->where('Cobro', '=', $cartera)->orderBy('nombre', 'asc')->paginate(200);
        $token = csrf_token();
        return Inertia::render('Client/ListaClientes', compact('auth', 'globalVars', 'token', 'state', 'clientes', 'carteras', 'cartera', 'listaClientes'));
    }

    public function getclient(string $ced, string $email = '')
    {
        $cliente = null;
        $usuario = null;
        $client = DB::table('clientes')->where('cedula', '=', $ced)->first();
        $user = DB::table('crear_clave')->where('correo', '=', $email)->first();
        if ($client != null) {
            $cliente = $client;
        }
        if ($user != null) {
            $usuario = $user;
        }

        $response = [
            'cliente' => $cliente,
            'usuario' => $usuario
        ];
        return response()->json($response, 200, []);
    }

    public function actualizar(Request $request, string $id)
    {
        $update = DB::table('clientes')->where('cedula', '=', $request->cedula)->update([
            'nombre' => $request->nombre,
            'apellidos' => $request->apellidos,
            'direccion' => $request->direccion,
            'direccion_trabajo' => $request->dir_trabajo,
            //Borrar el campo telefono en la tabla clientes
            'telefono' => '',
            'direccion_trabajo' => $request->dir_trabajo,
            'telefono_trabajo' => $request->tel_trabajo,
            'nombre_fiador' => $request->nombre_fiador,
            'dir_fiador' => $request->dir_fiador,
            'tel_fiador' => $request->tel_fiador,
            'otro_rifa' => $request->otros,
            'valor_letra' => $request->valor_letra,
            'fecha_ingreso' => $request->fecha,
            'Cobro' => $request->cartera
        ]);
        $this->ingresar_telefonos($request);
        $this->ActualizarCrearClave($request);
        //Actualizar prestamos y abonos...
        DB::table('prestamos')->where('cedula', '=', $request->cedula)->update([
            'Cobro' => $request->cartera
        ]);
        DB::table('abonos')->where('cedula', '=', $request->cedula)->update([
            'Cobro' => $request->cartera
        ]);
        //Actualizar imagen
        if ($request->hasFile('imagen')) {
            if ($request->imagenAnterior != '') {
                unlink($this->global->getGlobalVars()->dirImagenes . $request->imagenAnterior);
            }
            $this->ingresarImagen($request);
        }
        //Actualizar imagenes cedulas
        if ($request->hasFile('cedFrontal')) {
            if ($request->cedFrontalAnterior != '') {
                unlink($this->global->getGlobalVars()->dirCedulas . $request->cedFrontalAnterior);
            }
            $this->ingresarImagenCedula($request, 'frontal');
        }
        if ($request->hasFile('cedPosterior')) {
            if ($request->cedPosteriorAnterior != '') {
                unlink($this->global->getGlobalVars()->dirCedulas . $request->cedPosteriorAnterior);
            }
            $this->ingresarImagenCedula($request, 'posterior');
        }
        return Redirect::route('client.edit', $request->cedula);
    }

    public function ActualizarCrearClave($request)
    {
        DB::table('crear_clave')->where('cedula', '=', $request->cedula)->update([
            'usuario' => $request->usuario,
            'clave' => $request->clave,
            'correo' => $request->correo
        ]);
    }

    public function ingresar_telefonos($request)
    {
        DB::table('telefonos_clientes')->where('cedula', '=', $request->cedula)->delete();
        for ($i = 0; $i < count($request->telefonos); $i++) {
            $token = strtok($request->telefonos[$i], ",");
            while ($token !== false) {
                DB::table('telefonos_clientes')->insert([
                    'cedula' => $request->cedula,
                    'telefono' => $token
                ]);
                $token = strtok(",");
            }
        }
    }

    public function index()
    {
    }

    public function create()
    {
        $datos = $this->cargarDatosGenerales();
        $auth = $datos->auth;
        $globalVars = $datos->globalVars;
        $clientes = $datos->clientes;
        $carteras = $datos->carteras;
        $cliente = new stdClass();
        $cliente->cedula = '';
        $token = csrf_token();
        $deptos = DB::table('departamentos')->get();
        $municipios = DB::table('municipios')->get();
        return Inertia::render('Client/IngresarClient', compact('auth', 'globalVars', 'clientes', 'cliente', 'carteras', 'token', 'deptos', 'municipios'));
    }

    public function ingresarImagen($request)
    {
        $file = $request->file('imagen');
        $fileName = time() . "-" . $file->getClientOriginalName();
        $upload = $request->file('imagen')->move($this->global->getGlobalVars()->dirImagenes, $fileName);
        DB::table('clientes')->where('cedula', '=', $request->cedula)->update([
            'imagen' => $fileName,
        ]);
    }

    public function ingresarImagenCedula($request, $lado)
    {
        if ($lado == 'frontal') {
            $file = $request->file('cedFrontal');
            $fileName = time() . "-" . $file->getClientOriginalName();
            $upload = $request->file('cedFrontal')->move($this->global->getGlobalVars()->dirCedulas, $fileName);
            DB::table('cedulas_clientes')->updateOrInsert(
                ['cliente' => $request->cedula],
                ['cedFrontal' => $fileName]
            );
        } else {
            $file = $request->file('cedPosterior');
            $fileName = time()+1 . "-" . $file->getClientOriginalName();
            $upload = $request->file('cedPosterior')->move($this->global->getGlobalVars()->dirCedulas, $fileName);
            DB::table('cedulas_clientes')->updateOrInsert(
                ['cliente' => $request->cedula],
                ['cedPosterior' => $fileName]
            );
        }
    }

    public function store(Request $request)
    {
        DB::table('clientes')->insert([
            'nombre' => $request->nombre,
            'apellidos' => $request->apellidos,
            'cedula' => $request->cedula,
            'direccion' => $request->direccion,
            'direccion_trabajo' => $request->dir_trabajo,
            'direccion_trabajo' => $request->dir_trabajo,
            'telefono_trabajo' => $request->tel_trabajo,
            'nombre_fiador' => $request->nombre_fiador,
            'dir_fiador' => $request->dir_fiador,
            'tel_fiador' => $request->tel_fiador,
            'otro_rifa' => $request->otros,
            'valor_letra' => $request->valor_letra,
            'fecha_ingreso' => $request->fecha,
            'Cobro' => $request->cartera
        ]);
        $this->ingresar_telefonos($request);
        $this->crearClave($request);
        if ($request->hasFile('imagen')) {
            $this->ingresarImagen($request);
        }
        if ($request->hasFile('cedFrontal')) {
            $this->ingresarImagenCedula($request, 'frontal');
        }
        if ($request->hasFile('cedPosterior')) {
            $this->ingresarImagenCedula($request, 'posterior');
        }
        return Redirect::route('client.edit', $request->cedula);
    }

    public function show(string $id)
    {
        $datos = $this->cargarDatosGenerales();
        $auth = $datos->auth;
        $globalVars = $datos->globalVars;
        $clientes = $datos->clientes;
        $carteras = $datos->carteras;
        $cliente = $this->getClienteByCed($id);
        $token = csrf_token();
        $deptos = DB::table('departamentos')->get();
        $municipios = DB::table('municipios')->get();
        return Inertia::render('Client/IngresarClient', compact('auth', 'globalVars', 'clientes', 'cliente', 'carteras', 'token', 'deptos', 'municipios'));
    }

    public function edit(string $id)
    {
        $datos = $this->cargarDatosGenerales();
        $auth = $datos->auth;
        $globalVars = $datos->globalVars;
        $clientes = $datos->clientes;
        $cliente = $this->getClienteByCed($id);
        if (in_array($cliente->Cobro, $datos->carteras)) {
            $prest = DB::table('prestamos')->where('cedula', '=', $id)->first();
            $abonos = DB::table('abonos')->where('cedula', '=', $id)->orderBy('fecha', 'desc')->get();
            if ($prest != null) {
                $calc_dias_hastahoy = $this->calc_dias_hastahoy($prest->fecha_prest);
                $period = $this->check_periodicidad($prest->periodicidad);
                $calcular_cuotas_enmora = $this->calcular_cuotas_enmora($period, $calc_dias_hastahoy, $prest->tt_abonos, $prest->valor_cuotas, $prest->n_cuotas);
                $prest->cuotasenmora = number_format($calcular_cuotas_enmora, 2, ",", ".");
                $prest->validarVencimiento = $this->validarFechaVencimiento(($prest->vencimiento));
                $prest->diasHastaHoy = $calc_dias_hastahoy;
            }
            $token = csrf_token();
            return Inertia::render('Client/Client', compact('auth', 'globalVars', 'clientes', 'cliente', 'prest', 'abonos', 'token'));
        } else {
            $resp = 'Cliente no encontrado, por favor comunicate con el servicio técnico.';
            return Inertia::render('Errors/Error403', compact('resp', 'globalVars'));
        }
    }

    public function getClienteByCed($ced)
    {
        $cliente = DB::table('clientes')->where('cedula', '=', $ced)->first();
        //Get telefono de tabla telefonos
        $telefonos = DB::table('telefonos_clientes')->where('cedula', '=', $ced)->get();
        $tels = [];
        foreach ($telefonos as $t) {
            $tels[] = $t->telefono;
        }
        // Get telefonos de tabla clientes
        $tok = strtok($cliente->telefono, "//");
        while ($tok !== false) {
            $tels[] = trim($tok);
            $tok = strtok("//");
        }
        $cliente->telefonos = $tels;
        //Get datos crear clave - usuario. Si no hay datos en la tabla, crear el registro.
        $usuario = DB::table('crear_clave')->where('cedula', '=', $ced)->first();
        if ($usuario == null) {
            $request = new stdClass();
            $request->cedula = $ced;
            $request->nombre = $cliente->nombre;
            $request->Cobro = $cliente->Cobro;
            $this->crearClave($request);
            $usuario = DB::table('crear_clave')->where('cedula', '=', $ced)->first();
        }
        $cliente->usuario = $usuario;
        $fotoCedula = DB::table('cedulas_clientes')->where('cliente', '=', $ced)->first();
        if ($fotoCedula == null) {
            $fotoCedula = new stdClass();
            $fotoCedula->cedFrontal = '';
            $fotoCedula->cedPosterior = '';
        } else {
            if ($fotoCedula->cedPosterior == null) {
                $fotoCedula->cedPosterior = '';
            }
        }
        $cliente->fotoCedula = $fotoCedula;
        return $cliente;
    }

    public function crearClave($cliente)
    {
        DB::table('crear_clave')->insert([
            'cedula' => $cliente->cedula,
            'usuario' => $cliente->nombre,
            'clave' => '1234',
            'cartera' => $cliente->Cobro
        ]);
    }

    public function getClientesByCartera($cartera)
    {
        return DB::table('clientes')->where('Cobro', '=', $cartera)->orderBy('nombre', 'asc')->paginate(200);
    }

    public function eliminarCliente($ced)
    {
        $prest = DB::table('prestamos')->where('cedula', '=', $ced)->first();
        $abonos = DB::table('abonos')->where('cedula', $ced)->first();
        $prestH = DB::table('prestamos_historial')->where('cedula', '=', $ced)->first();
        $abonosH = DB::table('abonos_historial')->where('cedula', $ced)->first();
        if ($prest != null || $abonos != null || $prestH != null || $abonosH != null) {
            return Redirect::route('client.list', '¡El cliente a eliminar tiene prestamos o abonos, activos o en historial!');
        } else {
            //Validar borrar imagen
            $cliente = DB::table('clientes')->where('cedula', '=', $ced)->first();
            if ($cliente != null) {
                if ($cliente->imagen != '') {
                    unlink($this->global->getGlobalVars()->dirImagenes . $cliente->imagen);
                }
            }
            //Validar borrar imagenes cedula
            $ceds = DB::table('cedulas_clientes')->where('cliente', '=', $ced)->first();
            if ($ceds!= null) {
                if ($ceds->cedFrontal != '') {
                    unlink($this->global->getGlobalVars()->dirCedulas . $ceds->cedFrontal);
                }
                if ($ceds->cedPosterior != '') {
                    unlink($this->global->getGlobalVars()->dirCedulas . $ceds->cedPosterior);
                }
            }
            DB::table('cedulas_clientes')->where('cliente', '=', $ced)->delete();
            DB::table('clientes')->where('cedula', '=', $ced)->delete();
            DB::table('crear_clave')->where('cedula', '=', $ced)->delete();
            DB::table('telefonos_clientes')->where('cedula', '=', $ced)->delete();
            DB::table('clientes_historial')->where('cedula', '=', $ced)->delete();
            return Redirect::route('client.list', 'Cliente eliminado!');
        }
    }

    public function update(Request $request, string $id)
    {
    }

    public function destroy(string $id)
    {
    }
}
