<html> 
  <head> 
   <link rel="StyleSheet" href="estilos.php" type="text/css">
  <title>Eliminar tabla?</title> 
  </head> 
  <body>
  <br>
  <h1>Eliminar todos los datos de la tabla?</h1>
  <?PHP
$nombre_archivo=$_REQUEST['nombre_archivo'];  
  
echo '<a href=" Limpiar_solicitudes_dos.php?nombre_archivo='.$nombre_archivo.'">Si. Limpiar todos los datos.</a>';
echo '<br>';
echo '<br>';
echo '<a href=" Respuestas_solicitudes_dos.php">No!. Regresar</a>';
  ?>
</body> 
</html>
