<html>
<head>
<title>Problema</title>
</head>
 <link rel="StyleSheet" href="estilos.css" type="text/css"> 
<body>
<?php

include("datos.php");
$mysql=new mysqli($hostname_localhost,$username_localhost,$password_localhost,$database_localhost);

    if ($mysql->connect_error)

     die("Problemas con la conexión a la base de datos");


$registros=$mysql->query("select * from solicitudes_dos") or die ("problemas en la consulta");
$nombre_archivo=$_REQUEST['nombre_archivo'];
$file = fopen("$nombre_archivo", "a");
 
while($reg=$registros->fetch_array()){
	$result['fecha']= 'Fecha: '. $reg['fecha'];
	$result['nombre']='Nombre: '. $reg['nombre'];
	$result['cedula']='Cedula: '. $reg['cedula'];
	$result['direccion_domicilio']='Direccion: '. $reg['direccion_domicilio'];
	$result['tel_fijo']='Telefono: '. $reg['tel_fijo'];
	$result['celular']='Celular: '. $reg['celular'];
	$result['valor']='Valor: '. $reg['valor'];
	$result['periodicidad']='Periodicidad: '. $reg['periodicidad'];
	$result['otros']='Otros: '. $reg['otros'];
	$result['sugerencias']='Sugerencias: '. $reg['sugerencias'];
   
   foreach($result as $final) {
    fwrite($file, $final.PHP_EOL);
  }
    
  fwrite($file, "\r\n");  
  fwrite($file, "--------------------------");  
  fwrite($file, "\r\n");  

	}
fclose($file);
$mysql->close();

echo '<br><br>';
echo '<h1>Deseas descargar la tabla?</h1>';
echo '<a href="descargar_datos.php?nombre_archivo='.$nombre_archivo.'">Si. Descargar tabla.</a>';
echo '<br><br>';
echo '<a href="Respuestas_solicitudes_dos.php">No. Regresar.</a>';

  ?>
</body>
</html>