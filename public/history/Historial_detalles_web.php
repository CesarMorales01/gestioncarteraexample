<html>


<head>


<link href="style.css" rel="stylesheet">


  <title>Detalle cuenta</title>


</head>  


<body>

<br>

<button style="background-color: cadetblue;"  onclick="history.back()">Regresar</button>
<?php


include("datos.php");



$cedula=$_REQUEST['cedula'];


$fecha_prest1=$_REQUEST['fecha_prest'];

echo '<h1>Historial prestamo realizado el '.$_REQUEST['fecha_prest'].' </h1>';
$fecha_prest="'".$fecha_prest1."'";
$registros=$mysql->query("select * from clientes_historial where cedula=$cedula and fecha_prest=$fecha_prest") or die ("problemas en la consulta");
$reg=$registros->fetch_array();
				echo '<form action="confirmar_reportarCCM_historial.php">';
				echo '<input type="hidden" name="cedula" value='.$cedula.'><br>';
				echo '<input type="hidden" name="nombre" value='.$reg['nombre'].'><br>';
				echo '<input type="hidden" name="fecha_prest" value='.$reg['fecha_prest'].'><br>';
				echo '<input style="background-color:red; display: none;" type="submit" value="Reportar cliente en mora" />';
				echo '</form>';
				echo '<br>';
				
	// TABLA DETALLES CLIENTE Y PRESTAMO


	  echo '<table class="tablalistado" style="margin: 0 auto;">';
	  echo '<tr><th colspan="4">Detalle cliente</th>  </tr>';				
	  echo '<tr>';
      echo '<td>';
      echo "Nombre";
      echo '</td>';  
      echo '<td>';


      echo $reg['nombre'];


      echo '</td>'; 

	  echo '<td>';


      echo "Cedula";


      echo '</td>';  

      echo '<td>';


      echo $reg['cedula'];


      echo '</td>'; 

	  echo '</tr>';	

	  echo '<tr>';


      echo '<td>';


      echo "Direccion domicilio";


      echo '</td>';  

      echo '<td>';


      echo $reg['direccion'];


      echo '</td>'; 


$registros1=$mysql->query("select * from prestamos_historial where cedula=$cedula and fecha_prest=$fecha_prest") or die ("problemas en la consulta1");	  


$reg1=$registros1->fetch_array();	  


	  echo '<td>';


      echo "Fecha de prestamo";


      echo '</td>';  

      echo '<td>';


      echo $reg1['fecha_prest'];


      echo '</td>'; 

	  echo '</tr>';


	  echo '<td>';


      echo "Telefonos";


      echo '</td>';  

      echo '<td>';


      echo $reg['telefono'];


      echo '</td>';
	  echo '<td>';


      echo "Valor del prestamo";


      echo '</td>';  

      echo '<td>';


	  echo number_format($reg1['valorprestamo'],2,",",".");


      echo '</td>';

	  echo '</tr>';


	  echo '<td>';


      echo "Direccion del trabajo";


      echo '</td>';  

      echo '<td>';


      echo $reg['direccion_trabajo'];


      echo '</td>'; 

	  echo '<td>';


      echo "Tiempo(Meses)";


      echo '</td>';  

      echo '<td>';


      echo $reg1['tiempo_meses'];


      echo '</td>'; 
	  echo '</tr>';


	  echo '<td>';


      echo "Telefono del trabajo";


      echo '</td>';  

      echo '<td>';


      echo $reg['telefono_trabajo'];


      echo '</td>'; 

	  echo '<td>';


      echo "Periodicidad";


      echo '</td>';  

      echo '<td>';


      echo $reg1['periodicidad'];


      echo '</td>'; 
    echo '</tr>';

	  echo '<td>';


      echo "Numero cuotas";


      echo '</td>';  

      echo '<td>';


      echo $reg1['n_cuotas'];


      echo '</td>'; 

	  echo '<td>';


      echo "Total a pagar";


      echo '</td>';  

      echo '<td>';


	  echo number_format($reg1['totalapagar'],2,",",".");


      echo '</td>';

	  echo '</tr>';
	  echo '<td>';


      echo "Valor de las cuotas";


      echo '</td>';  

      echo '<td>';


	  echo number_format($reg1['valor_cuotas'],2,",",".");


      echo '</td>'; 

	  echo '<td>';


      echo "Vencimiento";


      echo '</td>';  

      echo '<td>';


      echo $reg1['vencimiento'];


      echo '</td>'; 
     echo '</tr>';

	 echo '</tr>';

	 echo '<td>';


     echo "Total abonos";


     echo '</td>';  

     echo '<td>';


	 echo number_format($reg1['tt_abonos'],2,",",".");


     echo '</td>'; 

	 echo '<td>';


     echo "Saldo";


     echo '</td>';	  

	 echo '<td>';


	 echo number_format($reg1['tt_saldo'],2,",",".");


     echo '</td>';

	 echo '</tr>';


	 echo '</table>';


    $registros2=$mysql->query("select * from abonos_historial where cedula=$cedula and fecha_prest=$fecha_prest") or die ("problemas en la consulta");	


    // TABLA ABONOS	


    echo '<br>';


echo '<br>';


    echo '<table class="tablalistado1" style="margin: 0 auto;">';


    echo '<tr><th>Fecha</th><th>Abono</th><th>Altura cuota</th><th>Asesor</th></tr>';	


    $sumar_abonos=0;


    while ($reg2=$registros2->fetch_array()){


	 echo '<tr>';


     echo '<td>';


     echo $reg2['fecha'];


     echo '</td>';  

	 echo '<td>';


	 echo number_format($reg2['valor_abono'],2,",",".");


     echo '</td>';  

	 echo '<td>';


     echo $reg2['altura_cuota'];


     echo '</td>';  
	 echo '<td>';


     echo $reg2['asesor'];


     echo '</td>';  

	 echo '</tr>';	


	 }  

     echo '</tr>';	 


     echo '</tr>';


  	 echo '</table>';


?>


</body>


</html>