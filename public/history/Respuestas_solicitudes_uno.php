<html>

<head>

<link href="style.css" rel="stylesheet">


  <title>Respuestas solicitudes clientes nuevos.</title>

</head>  

<body>

<br>

<h1>Respuestas solicitudes clientes nuevos</h1>

<?php

include("datos.php");

date_default_timezone_set('America/Los_Angeles');

$get_fecha=date("Y-M");



echo '<br><br>';
$extension=".txt";
$nombre_archivo=$get_fecha.$extension; 

//echo '<table class="tablalistado"  style="margin: 0 auto;"  >';

//echo '<tr><th><a href="Guardar_copia_solicitudes_dos.php?nombre_archivo='.$nombre_archivo.'">Guardar tabla</a></th>';

//echo '<th><a href="Alerta_eliminar_solicitudes_dos.php?nombre_archivo='.$nombre_archivo.'">Limpiar tabla</a></th></tr>';

//echo '</table>'; 	
//echo '<br><br>';

$mysql=new mysqli($hostname_localhost,$username_localhost,$password_localhost,$database_localhost);

    if ($mysql->connect_error)

     die("Problemas con la conexión a la base de datos");

$registros=$mysql->query("select * from solicitudes_primera_vez ORDER by fecha DESC") or die ("problemas en la consulta");	

echo '<table class="tablalistado"  style="margin: 0 auto;"  >';
echo '<tr><th>Fecha</th><th>Nombre</th><th>Cedula</th><th>Direccion</th><th>Vivienda propia</th><th>Telefonos</th><th>Empresa</th><th>Profesion</th><th>Direccion de trabajo</th><th>Telefono trabajo</th><th>Salario</th><th>Otros ingresos</th><th>Gastos</th><th>Ref 1</th><th>Ref 2</th><th>Valor</th><th>Periodicidad</th><th>Eliminar</th></tr>';	

while($reg=$registros->fetch_array()){

	 echo '<tr>';
	 
	 echo '<td>';

      echo $reg['fecha'];

      echo '</td>';  

      echo '<td>';

      echo $reg['nombre'];

      echo '</td>';  
  

      echo '<td>';

      echo $reg['cedula'];

      echo '</td>'; 
      
       echo '<td>';

      echo $reg['direccion'];

      echo '</td>'; 

      echo '<td>';

      echo $reg['vivienda_propia'];

      echo '</td>'; 
      
       echo '<td>';

      echo $reg['tel_fijo'];
      echo "//";
      echo $reg['telefonos'];

      echo '</td>'; 
      
       echo '<td>';

      echo $reg['empresa'];

      echo '</td>'; 
      echo '<td>';

      echo $reg['profesion'];

      echo '</td>'; 
      echo '<td>';

      echo $reg['dir_trabajo'];

      echo '</td>'; 
      echo '<td>';

      echo $reg['tel_trabajo'];

      echo '</td>'; 
      echo '<td>';

      echo $reg['salario'];

      echo '</td>';
      echo '<td>';

      echo $reg['otros_ingresos'];

      echo '</td>'; 
      echo '<td>';

      echo $reg['gastos'];

      echo '</td>';
      echo '<td>';

      echo $reg['ref_1'];

      echo '</td>';  
      echo '<td>';

      echo $reg['ref2'];

      echo '</td>';  
      
       echo '<td>';

      echo $reg['valor'];

      echo '</td>'; 
      
       echo '<td>';

      echo $reg['periodicidad'];

      echo '</td>';
       
       echo '<td>';

      echo '<a href="Eliminar_entrada_solicitudes_uno.php?id='.$reg['id'].'">Eliminar</a>'; 

      echo '</td>';
      
      
     echo '</tr>';    
	}

echo '</table>';	

$mysql->close();



?>

</body>

</html>