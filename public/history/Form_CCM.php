<html> 

  <head>

  <title>CCM</title> 

  </head> 

  <body>

 <br>
 <button style="background-color: cadetblue;"  onclick="history.back()">Regresar</button>
 <br> <br> 

 <h2> Cliente con Tendencia Morosa: </h2>

  <form method="post" action="ccm.php"> 

  Nombre Cliente:

  <input type="text" name="nombre" value="<?PHP

echo $_REQUEST['nombre']?>" size="30"> 

  <br> <br> 

  Fecha Vencimiento del prestamo:

  <input type="text" name="fecha_vencimiento" value="<?PHP

echo $_REQUEST['fecha_vencimiento']?>">

  <br> <br> 

  Fecha de cancelacion:

  <input type="text" name="fecha_cancel" value="<?PHP

echo $_REQUEST['fecha_cancel']?>"> 

  <br> <br> 

  Tiempo en mora: 

   <input type="text" name="tiempo_mora" value="<?PHP

echo $_REQUEST['tiempo_mora']?>"> 

  <br> <br>  

   X Time: 

   <input type="text" name="xtime" value="2"> 

   <input type="hidden" name="cedula" value="<?PHP

echo $_REQUEST['cedula']?>">

  <br> <br>  

  <input type="submit" value="Confirmar"> 

  </form>


</body> 

</html>