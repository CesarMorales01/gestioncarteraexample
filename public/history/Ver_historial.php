<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
 <!-- Bootstrap CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<script defer src="https://use.fontawesome.com/releases/v5.1.1/js/all.js" integrity="sha384-BtvRZcyfv4r0x/phJt9Y9HhnN5ur1Z+kZbKVgzVBAlQZX4jvAuImlIz+bG7TS00a" crossorigin="anonymous"></script>
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script type="text/javascript" src="https://cdn.rawgit.com/prashantchaudhary/ddslick/master/jquery.ddslick.min.js" ></script>
<link href="style.css" rel="stylesheet">
  <title>Historial</title>
</head>  
<body>
<br>
<?php
include("datos.php");

$cedula=$_REQUEST['cedula'];
echo '<br>';
echo '<table class="tabencabezado"style="margin: 0 auto;">';

	 echo '<tr><th style="text-align:center;" colspan="3">HISTORIAL </th>  </tr>';	

	 echo '<tr>';

     echo '<td>';

      echo $_REQUEST['nombre'];

     echo '</td>';  

     echo '<td>';

      echo $_REQUEST['cedula'];

     echo '</td>'; 

	 echo '</tr>';

	 echo '</table>';

mysqli_set_charset($mysql,'utf8');
$registros11=$mysql->query("select * from clientes where cedula=$cedula") or die ("No hay datos para mostrar");	  
$reg=$registros11->fetch_array();

echo '<br>';
echo '<table class="tablalistado"style="margin: 0 auto;">';
	 echo '<tr><th colspan="4">Datos Fiador</th>  </tr>';	
	 echo '<tr>';
     echo '<td>';
      echo 'Nombre fiador';
     echo '</td>';  

	  

     echo '<td>';

      echo $reg['nombre_fiador'];

     echo '</td>'; 
     
     echo '<td>';

      echo 'Direccion fiador';

     echo '</td>';  

	  

     echo '<td>';

      echo $reg['dir_fiador'];

     echo '</td>'; 

	 echo '</tr>';
	 

	 
	 echo '<tr>';

     echo '<td>';

      echo 'Telefono fiador';

     echo '</td>';  

	  

     echo '<td>';

      echo $reg['tel_fiador'];

     echo '</td>'; 
     
     echo '<td>';

      echo 'Valor letra';

     echo '</td>';  

	  

     echo '<td>';

      echo $reg['valor_letra'];

     echo '</td>'; 

	 echo '</tr>';
	 

	 echo '</table>';





echo '<br>';

echo '<br>';

$registros1=$mysql->query("select * from prestamos_historial where cedula=$cedula") or die ("No hay datos para mostrar");	  

echo '<table class="tablalistado"style="margin: 0 auto;">';

echo '<tr><th>Fecha de prestamo</th> <th>Valor del prestamo</th> <th>Vencimiento</th> <th>Fecha de cancelacion</th> <th>Meses vencidos</th> <th>Ganancias</th> <th>Ver detalles</th><th>';
echo '<input type="checkbox" id="select_all" onClick="toggle(this)"/>';
echo "Seleccionar todos";
echo '</th><th>CCM</th></tr>';	
 echo '<form method="post" action="Alerta_eliminar_historial.php" id"Alerta_eliminar_historial">';
	
$totalGanancias=0;
while ($reg=$registros1->fetch_array()){

	  echo '<tr>';

	  

      echo '<td>';

	  $fechaprestamo=$reg['fecha_prest'];

      echo $fechaprestamo;

	 echo '</td>';  

	  

	 echo '<td>';

	 echo number_format($reg['valorprestamo'],0,",",".");

     echo '</td>';  

	 

	 echo '<td>';

	 $fecha_vencimiento=$reg['vencimiento'];

     echo $fecha_vencimiento ;

	 $fecha_venci_comi="'".$fecha_vencimiento."'";

     echo '</td>';  

	 

	 echo '<td>';

	 $fecha_cancelacion=$reg['fecha_cancel'];

     echo $fecha_cancelacion;

	 $fecha_cancel_comi="'".$fecha_cancelacion."'";

     echo '</td>';  

	 

	 echo '<td>';

	 $regis=$mysql->query("SELECT datediff($fecha_cancel_comi, $fecha_venci_comi) as difer");

	 $obt=$regis->fetch_array();	

	 $obt0= $obt['difer']/30;

	 echo round($obt0,2);

     echo '</td>';

     echo '<td>';
     $uti=$reg['totalapagar']-$reg['valorprestamo'];
     echo number_format($uti,0,",",".");
     $totalGanancias=$totalGanancias+$uti;
     echo '</td>';


	 echo '<td>';

	  echo '<a href="Historial_detalles_web.php?cedula='.$cedula.'&fecha_prest='.$reg['fecha_prest'].'">Ver detalles</a>';

      echo '</td>';	

      

      echo '<td>';
	  echo '<input type="hidden" value='.$cedula.' name="cedula">';
	  echo '<input type="hidden" value='.$_REQUEST['nombre'].' name="nombre">';
	  echo '<input type="checkbox" name="fechas[]" value="'.$reg['fecha_prest'].'"/>';
      echo '<input type="submit" style="background-color:red" value="Eliminar seleccionados">';	  
      echo '</td>';	

      

      echo '<td>';

	  echo '<a href="Form_CCM.php?cedula='.$cedula.'&fecha_vencimiento='.$fecha_vencimiento.'&nombre='.$_REQUEST['nombre'].'&fecha_cancel='.$fecha_cancelacion.'&tiempo_mora='.$obt0.'">Ir a CCM</a>';

      echo '</td>';	
	 }  
   echo '</form>';
  	echo '</table>';
    
    
   echo '<br>';
   echo '<table class="tabencabezado"style="margin: 0 auto;">'; 
   echo '<tr>';
   echo '<th>';
    echo 'Total ganancias';
    echo '</th>';
    echo '<th>';
    echo number_format($totalGanancias,0,",",".");
    echo '</th>';
    echo '</tr>';
    echo '</table>'; 
    echo '<br>';
?>

</body>
<script>
var cedula="<?php echo $cedula;?>";
var url="<?php echo $url;?>";
function toggle(source) {
  checkboxes = document.getElementsByName('fechas[]');
  for(var i=0, n=checkboxes.length;i<n;i++) {
    checkboxes[i].checked = source.checked;	
  }
}
function ir_cuenta() {
	window.location=url+"/Form_%20detalle_cuentas_todos.php?cedula="+cedula;
}
</script>
</html>