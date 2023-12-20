<?php
//header('Content-type: text/html; charset=utf-8');
$hostname_localhost ="localhost";
$database_localhost ="u629086351_carteraexample";
$username_localhost ="u629086351_carteraexample";
$password_localhost ="Pokemongo2019";
$url="https://carteraexample.tupaginaweb.site/";
$time= time();
$firstpart= '<link rel="StyleSheet" href="estilos.php';
$secondpart='?v=" />';
$estilos=$firstpart.$secondpart.$time; 
date_default_timezone_set('America/Bogota');

$get_global_fecha_hoy_comis=date("Y-m-d");

$get_global_fecha_hoy="'".$get_global_fecha_hoy_comis."'";
$conexion= new mysqli($hostname_localhost,$username_localhost,$password_localhost,$database_localhost) or die ("problemas en la conexion");	
$mysql=new mysqli($hostname_localhost,$username_localhost,$password_localhost,$database_localhost);
if ($mysql->connect_error)die("Problemas con la conexión a la base de datos");
$registros0=$mysql->query("SELECT * FROM asesores") or die ("problemas al consultar asesores");
$obt_carteras=$mysql->query("SELECT * FROM Carteras") or die ("problemas al consultar carteras");


function conectar(){
  global $hostname_localhost;
  global $username_localhost;
  global $password_localhost;
  global $database_localhost;
    $mysql=new mysqli($hostname_localhost,$username_localhost,$password_localhost,$database_localhost);
    if($mysql->connect_error)die('Problemas con la conexión...');
    return $mysql;
}


function calc_dias_hastahoy($fecha_prest){
$fecha_prest_comis="'".$fecha_prest."'";
date_default_timezone_set('America/Bogota');
$get_fecha=date("Y-m-d");
$fecha_hoy_comis="'".$get_fecha."'";
global $mysql;
$calc_tiempo=$mysql->query("select datediff($fecha_hoy_comis, $fecha_prest_comis) as obt_fecha") or die ("problemas en restando fecha hasta hoy");
 if($registro=mysqli_fetch_array($calc_tiempo))
$dias_hashoy=$registro['obt_fecha'];

  return $dias_hashoy;
}


function check_periodicidad($period) {

    if(strcmp($period, "diario") === 0){

      $p="1";

    } 

    if(strcmp($period, "semanal") === 0){

      $p="7.5";

    }

    if(strcmp($period, "quincenal") === 0){

      $p="15.5";

    }

    if(strcmp($period, "mensual") === 0){

      $p="30.5";

    }

     return $p;

}


function calcular_cuotas_enmora($period, $tiempo_hasta_hoy, $totalabonos, $valor_cuotas, $totalcuotas) {

    $cuotas_hasta_hoy = $tiempo_hasta_hoy / $period;

    

    $cuotas_abonadas = $totalabonos / $valor_cuotas;

    

    $check_sivencido= metodo_checksivencido($cuotas_hasta_hoy, $totalcuotas);

    $cuotas_abonadas = $totalabonos / $valor_cuotas;

    $cuotas_enmora = $check_sivencido - $cuotas_abonadas;

        if ($cuotas_enmora<=0){

            $cuotas_enmora =0;

        }

      

    return $cuotas_enmora;

}


function metodo_checksivencido ($c_hasta_hoy, $tt_cuotas){

        if($c_hasta_hoy>$tt_cuotas){

            $c_hasta_hoy =$tt_cuotas;

            return $c_hasta_hoy;

        }else {

            return $c_hasta_hoy;

        }

}

 function prox_fecha_pago($fecha_prest, $period, $cuotas_en_mora, $cedula){

  

    $get_max_cuota=max_altura_cuotas($cedula);

    $get_period=check_periodicidad($period);

    $fecha_prest_comis="'".$fecha_prest."'";

    global $mysql;

     

       if($get_max_cuota>0){

           $periodxaltura_cuota=$get_period*$get_max_cuota;

           $period_mas_uno=$periodxaltura_cuota+$get_period;

           $calc_tiempo=$mysql->query("select adddate($fecha_prest_comis,interval $period_mas_uno day) as cal_fecha") or die 

             ("problemas calculando fechas...");

             

            if($registro=mysqli_fetch_array($calc_tiempo))

            $prox_fecha_pago=$registro['cal_fecha'];

            return $prox_fecha_pago; 

       

       } else {

            

            $calc_tiempo=$mysql->query("select adddate($fecha_prest_comis,interval $get_period day) as cal_fecha") or die 

             ("problemas en restando fecha hasta hoy");

             

            if($registro=mysqli_fetch_array($calc_tiempo))

            $prox_fecha_pago=$registro['cal_fecha'];

            return $prox_fecha_pago; 

       }

}

function max_altura_cuotas($cedula){
   global $mysql;
    $get_max_cuota=$mysql->query("select max(altura_cuota) from abonos where cedula=$cedula") or die 
    ("problemas al consultar max cuota");
    if($registro=mysqli_fetch_array($get_max_cuota)){
    $max_altura_cuota=$registro['max(altura_cuota)'];
   return $max_altura_cuota;
  }
}

/**

 * Funcion que devuelve un array con los valores:

 *	os => sistema operativo

 *	browser => navegador

 *	version => version del navegador

 */

function detect(){

	$browser=array("IE","OPERA","MOZILLA","NETSCAPE","FIREFOX","SAFARI","CHROME");

	$os=array("WIN","MAC","LINUX");

 

	# definimos unos valores por defecto para el navegador y el sistema operativo

	$info['browser'] = "OTHER";

	$info['os'] = "OTHER";

 

	# buscamos el navegador con su sistema operativo

	foreach($browser as $parent)

	{

		$s = strpos(strtoupper($_SERVER['HTTP_USER_AGENT']), $parent);

		$f = $s + strlen($parent);

		$version = substr($_SERVER['HTTP_USER_AGENT'], $f, 15);

		$version = preg_replace('/[^0-9,.]/','',$version);

		if ($s)

		{

			$info['browser'] = $parent;

			$info['version'] = $version;

		}

	}

 

	# obtenemos el sistema operativo

	foreach($os as $val)

	{

		if (strpos(strtoupper($_SERVER['HTTP_USER_AGENT']),$val)!==false)

			$info['os'] = $val;

	}

 

	# devolvemos el array de valores

	return $info;

}

// Detectar ip visitante

function getRealIP() {
        if (!empty($_SERVER['HTTP_CLIENT_IP']))
            return $_SERVER['HTTP_CLIENT_IP'];
           
        if (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
            return $_SERVER['HTTP_X_FORWARDED_FOR'];
       
        return $_SERVER['REMOTE_ADDR'];
}
// cerrar sesion


function cerrar_sesion(){
  $notificacion="";
  setcookie("cobrador","",time()+60*60*24*365,"/");
  global $url;
  header("Location:  $url/Form_login.php?notificacion=$notificacion"); 
}

function cierre_session_no_cookie($notif){
  global $url;
  header("Location:  $url/Form_login.php?notificacion=$notif"); 
}

function getAsesor(){
  $asesor0="";
  if(isset($_COOKIE['cobrador'])){
    $asesor0="'".$_COOKIE['cobrador']."'";
  } else {
    cierre_session_no_cookie("Se requiere iniciar sesión!"); 
  }
  return $asesor0;
}

?>