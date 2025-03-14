<?PHP

include("datos.php");

$cedula=$_REQUEST['cedula'];

$cedula1="'".$cedula."'";

$registros=$mysql->query("SELECT fecha_prest, asesor from prestamos where cedula=$cedula;") or die ("problemas en la consulta");

$reg_enhistorial=$registros->fetch_array();

$fecha_id=$reg_enhistorial['fecha_prest'];


$fecha_id="'".$fecha_id."'";

$asesor0=$reg_enhistorial['asesor'];

$asesor_enhistorial="'".$asesor0."'";

$insertar_clientes=$mysql->query("INSERT into clientes_historial (fecha_prest, nombre, cedula, direccion, telefono, direccion_trabajo, telefono_trabajo) SELECT $fecha_id, nombre, $cedula1, direccion, telefono, direccion_trabajo, telefono_trabajo from clientes where cedula=$cedula1") or die (mysqli_error($mysql));

$insertar_prestamo=$mysql->query("insert into prestamos_historial(asesor, cedula, fecha_prest, valorprestamo, tiempo_meses, interes, periodicidad, n_cuotas, valor_cuotas, totalapagar, vencimiento,  tt_abonos, tt_saldo, Cobro) SELECT $asesor_enhistorial, cedula, fecha_prest, valorprestamo, tiempo_meses, interes, periodicidad, n_cuotas, valor_cuotas, totalapagar, vencimiento,  tt_abonos, tt_saldo, Cobro from prestamos where cedula=$cedula;") or die ("problemas al insertar prestamos historial");



$insertar_abonos=$mysql->query("insert into abonos_historial(fecha_prest, cedula, fecha, altura_cuota, valor_abono, asesor, Cobro) select $fecha_id, cedula, fecha, altura_cuota, valor_abono, asesor, Cobro from abonos where cedula=$cedula;") or die ("problemas al insertar abonos historial");



$get_cancel=$mysql->query("select MAX(fecha) from abonos WHERE cedula=$cedula") or die ("problemas con hallar la fecha de cancelacion");

$reg1=$get_cancel->fetch_array();

$fecha_cancelacion=$reg1['MAX(fecha)'];

$fecha_cancel="'".$fecha_cancelacion."'";

if($fecha_cancelacion==null){
$notificacion="Se ha podido encontrar la fecha de cancelacion. Esto puede ser a que no se han registrado abonos...";	
header("Location: $url/Form_%20detalle_cuentas_todos.php?cedula=$cedula.&notificacion=$notificacion");			
} else {	

$act_cancel=$mysql->query("update prestamos_historial set fecha_cancel=$fecha_cancel where fecha_prest=$fecha_id and cedula=$cedula") or die("problemas al insertar la fecha de cancelacion");

$notificacion="Se ha guardado una copia de la cuenta en la base de datos";


}			

$url1=$url."client/".$_REQUEST['cedula']."/edit";
header("Location:".$url1); 			

?>

