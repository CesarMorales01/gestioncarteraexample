<html>

<head>

<link rel="StyleSheet" href="estilos.php" type="text/css">

<title>Lista Cuentas canceladas</title>

  <br>

  <h2> Cuentas canceladas</h2>

</head>  

<body>
<?php
include("datos.php");
$mysql=new mysqli($hostname_localhost,$username_localhost,$password_localhost,$database_localhost);
if ($mysql->connect_error) die("Problemas con la conexión a la base de datos");
mysqli_set_charset($mysql,'utf8');
$getCartes=$mysql->query("SELECT * from Carteras") or die ("problemas en la consulta cartes");
$carteras=[];
while ($getC=$getCartes->fetch_array()){
  $carteras[]=$getC['Nombre'];
} 
// inicio for
for($i=0;$i<count($carteras);$i++){
  $carte="'".$carteras[$i]."'";
  $registros=$mysql->query("SELECT clientes.cedula, nombre, fecha_prest, valorprestamo, tt_abonos, tt_saldo  FROM prestamos JOIN clientes on prestamos.cedula=clientes.cedula WHERE tt_saldo<=0 and prestamos.Cobro=$carte") or die ("problemas en la consulta");

echo '<table class="tablalistado1"style="margin: 0 auto;">';
echo '<tr><th colspan="5">En cuentas activas ';
echo $carteras[$i];
echo '</th></tr>';
echo '<tr><th>Nombre</th><th>Fecha prestamo</th><th>Total abonado</th><th>Total saldo</th><th>Ver detalles</th></tr>';	

while ($reg=$registros->fetch_array()){
	  echo '<tr>';
      echo '<td>';
      echo $reg['nombre'];

      echo '</td>';  

	  

	 echo '<td>';
	 echo $reg['fecha_prest'];
     echo '</td>';  

	 

	 echo '<td>';

     echo number_format($reg['tt_abonos'],2,",",".");

      echo '</td>';  
	
	 echo '<td>';
     echo number_format($reg['tt_saldo'],2,",",".");
     echo '</td>';  
     
     echo '<td>';
     echo '<a href="Form_ detalle_cuentas_todos.php?cedula='.$reg['cedula'].'">Ver cuenta</a>';
     echo '</td>';
	 echo '</tr>';	

	 }  
echo '</table>';
echo '<br>';
$get_global_fecha_hoy_comis1="'".$get_global_fecha_hoy_comis."'";
$registros_histo=$mysql->query("SELECT distinct clientes_historial.cedula, nombre, prestamos_historial.fecha_cancel, valorprestamo, tt_abonos, tt_saldo  FROM prestamos_historial JOIN clientes_historial on prestamos_historial.cedula=clientes_historial.cedula WHERE prestamos_historial.fecha_cancel=$get_global_fecha_hoy_comis1 and tt_saldo<=0 and prestamos_historial.Cobro=$carte") or die ("problemas en la consulta_historial");

echo '<table class="tablalistado1"style="margin: 0 auto;">';
echo '<tr><th colspan="6">Cuentas canceladas en historial hoy '.$get_global_fecha_hoy_comis.' '.$carteras[$i].'</th></tr>';
echo '<tr><th>Nombre</th><th>Fecha cancelacion</th><th>Total abonado</th><th>Total saldo</th><th>Ver detalles</th></tr>';	

while ($reg_histo=$registros_histo->fetch_array()){

	  echo '<tr>';

      echo '<td>';

      echo $reg_histo['nombre'];

      echo '</td>';  


	 echo '<td>';
	 echo $reg_histo['fecha_cancel'];
     echo '</td>'; 	

	 

	 echo '<td>';

     echo number_format($reg_histo['tt_abonos'],2,",",".");

      echo '</td>';  
	
	 echo '<td>';
     echo number_format($reg_histo['tt_saldo'],2,",",".");
     echo '</td>';  
     
     echo '<td>';
     echo '<a href="Ver_historial.php?cedula='.$reg_histo['cedula'].'&nombre='.$reg_histo['nombre'].'">Ver historial</a>';
     echo '</td>';
     
	  echo '</tr>';	

	 }  

  	echo '</table>';
    echo '<br>';
}
// fin de for
?>

</body>

</html>