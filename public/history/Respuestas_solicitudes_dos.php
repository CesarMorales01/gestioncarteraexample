<html>

<head>

 <link href="style.css" rel="stylesheet">

  <title>Solicitudes ya soy cliente. Respuestas.</title>

</head>  

<body>

<br>

<h1>Solicitudes ya soy cliente</h1>

<?php

include("datos.php");

date_default_timezone_set('America/Los_Angeles');

$get_fecha=date("Y-M");

echo '<br><br>';
$extension=".txt";
$nombre_archivo=$get_fecha.$extension; 

echo '<table class="tablalistado"  style="margin: 0 auto;"  >';
echo '<tr><th><a href="form_solicitudes_dos.php">Formulario Ya soy cliente</a></th>';
echo '<th><a href="Form_solicitud_first_time.php">Form cliente nuevo</a></th>';
echo '<th><a href="Respuestas_solicitudes_uno.php">Respuestas cliente nuevo</a></th></tr>';
echo '<tr><th><a href="Guardar_copia_solicitudes_dos.php?nombre_archivo='.$nombre_archivo.'">Guardar tabla</a></th>';

echo '<th><a href="Alerta_eliminar_solicitudes_dos.php?nombre_archivo='.$nombre_archivo.'">Limpiar tabla</a></th></tr>';

echo '</table>'; 	
echo '<br><br>';

$mysql=new mysqli($hostname_localhost,$username_localhost,$password_localhost,$database_localhost);

    if ($mysql->connect_error)

     die("Problemas con la conexión a la base de datos");

$registros=$mysql->query("select * from solicitudes_dos ORDER by fecha DESC") or die ("problemas en la consulta");	

echo '<table class="tablalistado"  style="margin: 0 auto;"  >';
echo '<tr><th>Fecha</th><th>Nombre</th><th>Cedula</th><th>Direccion</th><th>Telefono fijo</th><th>Celular</th><th>Valor</th><th>Periodicidad</th><th>Eliminar</th><th>Otros</th><th>Sugerencias</th></tr>';	
$saveIds=[];
while($reg=$registros->fetch_array()){
      $saveIds[]=$reg['id'];    
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

      echo $reg['direccion_domicilio'];

      echo '</td>'; 
      
       echo '<td>';

      echo $reg['tel_fijo'];

      echo '</td>'; 
      
       echo '<td>';

      echo $reg['celular'];

      echo '</td>'; 
      
       echo '<td>';

      echo $reg['valor'];

      echo '</td>'; 
      
       echo '<td>';

      echo $reg['periodicidad'];

      echo '</td>';
       
       echo '<td>';

      echo '<a href="Eliminar_entrada_solicitudes_dos.php?id='.$reg['id'].'">Eliminar</a>'; 

      echo '</td>';
      
      echo '<td>';
      echo $reg['otros'];

      echo '</td>'; 
      
       echo '<td>';

      echo $reg['sugerencias'];

      echo '</td>'; 
      
     echo '</tr>';    
	}

echo '</table>';
$nums=count($saveIds);
if($nums>1000){
     $cantBorrar=$nums-1000;
     $getLastIds=$mysql->query("select id from solicitudes_dos ORDER by id ASC limit $cantBorrar") or die ("problemas en la consulta");
     while($getId=$getLastIds->fetch_array()){
         $id=$getId['id'];
         $borrarReg=$mysql->query("delete from solicitudes_dos where id=$id") or die ("problemas borrar");
     }
}
$mysql->close();
?>

</body>

</html>