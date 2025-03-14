<?PHP
include("datos.php");
$cedula1=$_REQUEST['cedula']; 
$cedula="'".$cedula1."'";
$nombre1=$_REQUEST['nombre']; 
$nombre="'".$nombre1."'";

date_default_timezone_set('America/Bogota');
$fecha=date("Y-m-d");
$fecha="'".$fecha."'";

$direccion_domicilio1=$_REQUEST['direccion'];
$direccion_domicilio="'".$direccion_domicilio1."'";

if(isset($_REQUEST['telefono'])){
  $tel_fijo1=$_REQUEST['telefono'];
  $tel_fijo="'".$tel_fijo1."'";  
} else {
    $tel_fijo="''"; 
}

if(isset($_REQUEST['otros_telefonos'])){
    $otros_telefonos=$_REQUEST['otros_telefonos'];
    $esp=" ";
    $tel_fijo=$tel_fijo1.$esp.$otros_telefonos;
     $tel_fijo="'".$tel_fijo."'";
  } 

$celular1=$_REQUEST['celular'];
$celular="'".$celular1."'";
$valor1=$_REQUEST['valor'];
$valor="'".$valor1."'";
$periodicidad=$_REQUEST['periodicidad'];

            if($periodicidad=="Diaria"){

		    $periodicidad=1;

		    }if ($periodicidad=="Semanal"){

			$periodicidad=2;

		    }if ($periodicidad=="Quincenal"){

			$periodicidad=3;

		    }if($periodicidad=="Mensual"){

			$periodicidad=4;

		    }
if(isset($_REQUEST['otros'])){
  $otros1=$_REQUEST['otros'];
  $otros="'".$otros1."'";  
} else {
    $otros=$otros="''";
}

if(isset($_REQUEST['sugerencias'])){
 $sugerencias1=$_REQUEST['sugerencias'];
 $sugerencias="'".$sugerencias1."'";  
} else{
   $sugerencias="''";   
}
$max_prest=$_REQUEST['max_prest'];
$conexion= new mysqli($hostname_localhost,$username_localhost,$password_localhost,$database_localhost);	
$insert="INSERT INTO solicitudes_dos(fecha, nombre, cedula, direccion_domicilio, tel_fijo, celular, valor, periodicidad, otros, sugerencias) VALUES ($fecha, $nombre, $cedula, $direccion_domicilio, $tel_fijo, $celular, $valor, $periodicidad, $otros, $sugerencias)";

$resultado_insert=mysqli_query($conexion,$insert) or die ("problemas al insertar");

if($resultado_insert){
   echo "registra";
  // notificar();
   $href=$url."/history/Autorespuesta_solicitudes_dos.php?valor=";
   $max="&max_pres=";
   $mas_ced="&cedula=";
	$url=$href.$valor1.$max.$max_prest.$mas_ced.$cedula1; 
   header("Location:  $url");
}else{
	echo " no registra";
}

function notificar(){
		$subject=utf8_decode("Nueva solicitud!"); 
		$texto= "https://tucasabonita.site/Financiera/financieramirey/Respuesta_solicitudes_dos.php";
		$name= utf8_decode($GLOBALS['nombre']);
		$correo= "cezar_mh86@hotmail.com";
		mail($correo, $subject, $texto, $name);
}

?>