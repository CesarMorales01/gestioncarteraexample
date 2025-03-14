<?PHP
include("datos.php");
$nombre1=$_REQUEST['nombre']; 
$nombre="'".$nombre1."'";
$cedula1=$_REQUEST['cedula'];
$cedula="'".$cedula1."'";
$direccion_domicilio1=$_REQUEST['direccion'];
$direccion_domicilio="'".$direccion_domicilio1."'";
$vivienda_propia="'".$_REQUEST['vivienda_propia']."'";

if(isset($_REQUEST['telefono'])){
    $tel_fijo1=$_REQUEST['telefono'];
    $tel_fijo="'".$tel_fijo1."'";  
  } else {
      $tel_fijo="''"; 
  }
  $celular1=$_REQUEST['celular'];
  $celular="'".$celular1."'";
  if(isset($_REQUEST['otros_telefonos'])){
    $tel_otros=$_REQUEST['otros_telefonos'];
    $tel_otros="'".$tel_fijo1."'";  
  } else {
      $tel_otros="''"; 
  }

  $empresa=$_REQUEST['empresa'];
  $empresa="'".$empresa."'";
  $profesion="'".$_REQUEST['profesion']."'";
  $dir_trabajo="'".$_REQUEST['direccion_trabajo']."'";
  if(isset($_REQUEST['telefono_trabajo'])){
  $tel_trabajo="'".$_REQUEST['telefono_trabajo']."'";
  }else{
    $tel_trabajo="";
  }
  if(isset($_REQUEST['salario'])){
    $salario="'".$_REQUEST['salario']."'";
    }else{
      $salario="";
    }
    if(isset($_REQUEST['otros_ingresos'])){
        $otros_ingresos="'".$_REQUEST['otros_ingresos']."'";
        }else{
          $otros_ingresos="";
        }
 if(isset($_REQUEST['gastos'])){
            $gastos="'".$_REQUEST['gastos']."'";
            }else{
              $gastos="";
            } 
            
$ref1="'".$_REQUEST['nombre_fiador1']."'";
if(isset($_REQUEST['nombre_fiador2'])){
    $nombre_fiador2="'".$_REQUEST['nombre_fiador2']."'";
    }else{
      $nombre_fiador2="";
    }                 
  $valor1=$_REQUEST['valor'];
  $valor="'".$valor1."'"; 
  $periodicidad="'".$_REQUEST['periodicidad']."'";
date_default_timezone_set('America/Bogota');
$fecha=date("Y-m-d");
$fecha="'".$fecha."'";
$conexion= new mysqli($hostname_localhost,$username_localhost,$password_localhost,$database_localhost);	

$insert="INSERT INTO solicitudes_primera_vez(fecha, nombre, cedula, direccion, vivienda_propia, tel_fijo, telefonos, empresa, profesion, dir_trabajo, tel_trabajo, salario, otros_ingresos, gastos, ref_1, ref2, valor, periodicidad) VALUES ($fecha, $nombre, $cedula, $direccion_domicilio, $vivienda_propia, $tel_fijo, $celular, $empresa, $profesion, $dir_trabajo, $tel_trabajo, $salario, $otros_ingresos, $gastos, $ref1, $nombre_fiador2, $valor, $periodicidad)";

$resultado_insert=mysqli_query($conexion,$insert);

          
if($resultado_insert){
   // notificar();
    header("Location:  https://carteraexample.tupaginaweb.site/history/Form_thanks_for_email_us.php");
}else{
	header("Location: https://carteraexample.tupaginaweb.site/history/Form_solicitud_first_time.php?failure=true");
}
    
	function notificar(){
		$subject=utf8_decode("Solicitud primera vez!"); 
		$texto= "https://tucasabonita.site/Financiera/financieramirey/Respuestas_solicitudes_uno.php";
		$name= utf8_decode($GLOBALS['nombre']);
		$correo= "cezar_mh86@hotmail.com";
		mail($correo, $subject, $texto, $name);
  }

  ?>
  
