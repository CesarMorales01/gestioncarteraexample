<html> 

  <head> 

   <link rel="StyleSheet" href="estilos.php" type="text/css">

  <title>Eliminar historial</title> 

  </head> 

  <body>
 <script>
  window.addEventListener('load', inicio, false);

  function inicio() {
    document.getElementById("Form_ingresar_abono").addEventListener('submit', validar, false);
  }

  function validar(evt) {
     var nom=document.getElementById('abono').value;
     var patron=/^[0-9]+$/;
    if (patron.test(nom)) {
    } else {  alert('El campo valor abono solo puede guardar numeros!');
		evt.preventDefault();
		}
  }
</script> 

  <br>

  <h1>Eliminar prestamos historicos?</h1>

  <?PHP
echo '<form method="post" action="Eliminar_historial.php" id="Form_ingresar_abono">';
if(isset($_POST['fechas'])){
$fechas=$_POST['fechas'];
$size_array= count($fechas, COUNT_RECURSIVE);
	for($x=0;$x<=$size_array-1;$x++){   
	   echo '<input type="hidden" value='.$fechas[$x].' name="fechas[]">';
	} 	 
}
echo '<input type="hidden" value='.$_REQUEST['nombre'].' name="nombre">';
echo '<input type="hidden" value='.$_REQUEST['cedula'].' name="cedula">';
echo '<input   type="submit" style="background-color:red" value="Eliminar">';	
?>
</body> 
</html>

