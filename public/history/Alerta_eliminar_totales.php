<html> 

  <head> 

  <link href="style.css" rel="stylesheet">

  <title>Eliminar totales</title> 

  </head> 

  <body>

  <br>

  <h1>Eliminar totales?</h1>

  <?PHP
echo '<form method="post" action="Eliminar_totales.php">';
if(isset($_POST['id'])){
  $id=$_POST['id'];

$size_array= count($id, COUNT_RECURSIVE);
	for($x=0;$x<=$size_array-1;$x++){ 
	   echo '<input type="hidden" value='.$id[$x].' name="id[]">';
	} 	
} 
echo '<input type="hidden" value='.$_REQUEST['Cobro'].' name="Cobro">';
echo '<input   type="submit" style="background-color:red" value="Eliminar totales">';	
  ?>

</body> 

</html>
