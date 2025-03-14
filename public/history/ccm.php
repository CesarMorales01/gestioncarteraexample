<html>

<head>

  <title>Cliente Con Tendencia Morosa</title>


</head>  
<link href="style.css" rel="stylesheet">
<body>

<br>

<?php

include("datos.php");

$nombre=$_REQUEST['nombre'];

$cedula=$_REQUEST['cedula'];

$fecha_vencimiento=$_REQUEST['fecha_vencimiento'];

$fecha_cancel=$_REQUEST['fecha_cancel'];

$fecha_cancel_comi="'".$fecha_cancel."'";

$tiempo_mora0=$_REQUEST['tiempo_mora'];

$tiempo_mora= round($tiempo_mora0);

$xtime=$_REQUEST['xtime'];

$total_tiempo_enccm=$tiempo_mora*$xtime;



$mysql=new mysqli($hostname_localhost,$username_localhost,$password_localhost,$database_localhost);

    if ($mysql->connect_error)

     die("Problemas con la conexión a la base de datos");

     

$regis=$mysql->query("SELECT date_add($fecha_cancel_comi,interval $total_tiempo_enccm month) as days ") or die("problemas al consultar");

	 $obt=$regis->fetch_array();	

echo '<button style="background-color: cadetblue;"  onclick="history.back()">Regresar</button>';
echo '<br>';

echo '<table class="tablalistado">';

	 echo '<tr><th colspan="3">Cliente con Tendencia Morosa</th>  </tr>';	

	 echo '<tr>';

     echo '<td>';

      echo $_REQUEST['nombre'];

     echo '</td>';  



	 echo '</tr>';

	 

	  echo '<tr>';

     echo '<td>';

     $resp="Respuesta a solicitud de prestamo N° ";

     $numero = rand ("0000" , "9999" );

     $saltoslinea= "<br>";

     $textocedula=" Cedula N° ";

     $string1="Ultimo crédito que adquirió con la empresa debió cancelarse el ";
     $espacio= " ";

     $string2=" y se canceló el ";

     $string3=", se estuvo en mora por ";

     $string4=" meses. Por tal motivo se clasifica como Cliente Con Tendencia Morosa, segmento de clientes

     a los cuales no se les puede realizar préstamos por un tiempo igual al que estuvieron en mora multiplicado ";

    $string5="No se puede realizar préstamos a nombre de ";

    $string6=" hasta el ";

    $obt0= $obt['days'];
    
    $fecha_formato= date("Y-M-d",strtotime($obt0));

     

     echo $resp.$numero.$espacio.$nombre.$textocedula.$cedula.

     $saltoslinea;

    

     echo '</td>';  

     echo '<tr>';

     echo '<td>';

     echo $string1.$fecha_vencimiento.$string2.$fecha_cancel.$string3.$tiempo_mora.$string4.$xtime.$saltoslinea.$string5.$nombre.$textocedula.$cedula.$string6.$fecha_formato;

     echo '</td>'; 



	 echo '</tr>';

	 echo '</table>';

	 

?>

</body>

</html>	 