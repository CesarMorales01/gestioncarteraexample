<?php

namespace App\Traits;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use stdClass;

trait MetodosGenerales
{

  function getTimeBlockAsesor()
  {
    $get_timeBlock = DB::table('asesores')->where('id', '=', Auth()->user()->id_asesores)->first();
    return $get_timeBlock->time_blocked;
  }

  function getHour()
  {
    date_default_timezone_set('America/Bogota');
    return date("H:i:s");
  }

  public function getCarteSelected($idAsesor)
  {
    $imei = DB::table('asesores')->where('id', '=', $idAsesor)->first();
    $carte = DB::table('cartera_prede')->where('asesor', '=', $imei->id)->first();
    if ($carte == null) {
      $obj = new stdClass();
      $obj->variable = '';
      return $obj;
    } else {
      return $carte;
    }
  }

  public function cargarFechasEsteMes()
  {
    $objeto = new stdClass();
    date_default_timezone_set('America/Bogota');
    $date = now();
    $año = date_format($date, "y");
    $mes = date_format($date, "m");
    $dia = date_format($date, "d");
    $objeto->ffinal = date("Y-m-t", strtotime($date));
    $objeto->finicial = $año . "-" . $mes . "-" . $dia;
    return $objeto;
  }

  public function cargarFechasHoy()
  {
    $objeto = new stdClass();
    date_default_timezone_set('America/Bogota');
    $date = now();
    $año = date_format($date, "Y");
    $mes = date_format($date, "m");
    $dia = date_format($date, "d");
    $objeto->ffinal =  $año . "-" . $mes . "-" . $dia;
    $objeto->finicial = $año . "-" . $mes . "-" . $dia;
    return $objeto;
  }

  function getRolesPermisos()
  {
    $auth = Auth()->user();
    $role = User::query()->where('email', '=', $auth->email)->first();
    // Get permisos
    $auth->role = $role->getRoleNames();
    // AQUI TOCO ITERAR LOS PERMISOS Y AGREGARLOS AL ARRAY UNO A UNO....
    foreach ($role->getAllPermissions() as $perm) {
      $auth->permissions[] = $perm;
    }
    return $auth;
  }

  public function cargarDatosGenerales()
  {
    $auth = $this->getRolesPermisos();
    // Solo traer clientes de carteras habilitadas
    $carterasHab = DB::table('asesores')->where('id', '=', $auth->id_asesores)->first();
    $tok = strtok($carterasHab->unable, ",");
    $carteras = [];
    while ($tok !== false) {
      $carteras[] = trim($tok);
      $tok = strtok(",");
    }
    $clientes = [];
    foreach ($carteras as $item) {
      $clientes[] = DB::table('clientes')->where('Cobro', 'like', '%' . $item . '%')->get();
    }
    $globalVars = $this->global->getGlobalVars();
    $objeto = new stdClass();
    $objeto->auth = $auth;
    $objeto->clientes = $clientes;
    $objeto->globalVars = $globalVars;
    $objeto->carteras = $carteras;
    return $objeto;
  }

  public function calc_dias_hastahoy($fecha_prest)
  {
    date_default_timezone_set('America/Bogota');
    //  $get_fecha=date("Y-m-d");
    // REVISAR SI ESTA FECHA SI ES DE COLOMBIA......
    $diff = now()->diffInDays($fecha_prest);
    return $diff;
  }

  public function validarFechaVencimiento($fecha)
  {
    $fechaInicial = now();
    $fechaFinal = date($fecha);
    // Las convertimos a segundos
    $fechaInicialSegundos = strtotime($fechaInicial);
    $fechaFinalSegundos = strtotime($fechaFinal);
    // Hacemos las operaciones para calcular los dias entre las dos fechas y mostramos el resultado
    $dias = ($fechaFinalSegundos - $fechaInicialSegundos) / 86400;
    return $dias;
  }

  public function check_periodicidad($period)
  {

    if (strcmp($period, "diario") === 0) {

      $p = "1";
    }

    if (strcmp($period, "semanal") === 0) {

      $p = "7.5";
    }

    if (strcmp($period, "quincenal") === 0) {

      $p = "15.5";
    }

    if (strcmp($period, "mensual") === 0) {

      $p = "30.5";
    }

    return $p;
  }

  public function calcular_cuotas_enmora($period, $tiempo_hasta_hoy, $totalabonos, $valor_cuotas, $totalcuotas)
  {
    $cuotas_hasta_hoy = $tiempo_hasta_hoy / $period;
    $cuotas_abonadas = $totalabonos / $valor_cuotas;
    $check_sivencido = $this->metodo_checksivencido($cuotas_hasta_hoy, $totalcuotas);
    $cuotas_abonadas = $totalabonos / $valor_cuotas;
    $cuotas_enmora = $check_sivencido - $cuotas_abonadas;
    if ($cuotas_enmora <= 0) {
      $cuotas_enmora = 0;
    }
    return $cuotas_enmora;
  }

  public function metodo_checksivencido($c_hasta_hoy, $tt_cuotas)
  {
    if ($c_hasta_hoy > $tt_cuotas) {
      $c_hasta_hoy = $tt_cuotas;
      return $c_hasta_hoy;
    } else {
      return $c_hasta_hoy;
    }
  }
}
