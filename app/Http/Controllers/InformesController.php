<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Globalvar;
use Illuminate\Support\Facades\DB;
use App\Traits\MetodosGenerales;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use stdClass;

class InformesController extends Controller
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

    public function listar($message)
    {
        $datos=$this->cargarDatosGenerales();
        $auth=$datos->auth;
        $globalVars=$datos->globalVars;
        $clientes=$datos->clientes;
        $carteras=$datos->carteras;
        if(count($carteras)==0){
            if($auth->role[0]!='Administrador'){
                $resp = 'Asesor sin carteras habilitadas!';
                return Redirect::route('client.list', $resp);
            }else{
                return Redirect::route('user.list', 'Habilita carteras!');
            }  
        }
        $carteSelected = $this->getCarteSelected($datos->auth->id_asesores);
        $carteSelected=$carteSelected->variable;
        if($carteSelected==""){
            $carteSelected=$datos->carteras[0];
        }
        $token = csrf_token();
        $estado='';
        if($message!='nothing'){
            $estado = $message;
        }
        //Cobrado en el dia
        $objeto = new stdClass();
        $objeto->ffinal = $this->cargarFechasHoy()->finicial;
        $objeto->finicial=$this->cargarFechasHoy()->ffinal;
        $abonos=null;
        $datosInformes=new stdClass();
        //Carteras para el metodo get abonos
        $arrayCarte=[];
        $arrayCarte []=$carteSelected;
        $objeto->carteras = $arrayCarte;
        if($auth->role[0]!='Usuario'){
            $objeto->asesores=DB::table('asesores')->get();
            $abonos = app(AbonosController::class)->getAbonosByDate($objeto)->original;
        }else{
             $asesores=[];
             $asesor=DB::table('asesores')->where('id', '=', $datos->auth->id_asesores)->first();
             $asesores[]=$asesor;
             $objeto->asesores=$asesores;
             $abonos = app(AbonosController::class)->getAbonosByDate($objeto)->original;
        }
        $datosInformes->abonos=$abonos;
        $datosInformes->parametros=$objeto;
        //Prestado en el dia
        $prestamos=app(PrestamosController::class)->show($objeto)->original;
        $datosInformes->prestamos=$prestamos;
        $datosInformes->totales=null;
        foreach($auth->permissions as $per){
            if($per->name=='ver-graficos-informes'){
                $datosInformes->totales=app(TotalesController::class)->edit($carteSelected);
            }
        }
        return Inertia::render('Informes/Informes', compact('auth', 'globalVars', 'clientes', 'carteras', 'token', 'estado', 'carteSelected', 'datosInformes'));
    }


    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(string $id)
    {
        //
    }

    public function edit(string $id)
    {
        //
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
