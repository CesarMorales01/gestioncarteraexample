<html> 
  <head> 
   <link rel="StyleSheet" href="estilos.php" type="text/css">
  <title>Alerta</title> 
  </head> 
  <body>
  <br>
  <h1>Guardar datos en historial?</h1>
  <?PHP

  echo '<a href="Guardar_historial_web.php?cedula='.$_REQUEST['cedula'].'">Si. Guardar una copia de la cuenta.</a>';
  ?>
</body> 
</html>
