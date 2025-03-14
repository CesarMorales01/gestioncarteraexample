<html>
<head>
<link rel="StyleSheet" href="estilos.php" type="text/css">
  <link href="style.css" rel="stylesheet">
  <br>
  <title>Clientes sin saldo </title>
</head>  
<body>
<?php
include("datos.php");
$Cobro=$_REQUEST['Cobro'];
$opciones[0]="Empty";
$opciones[1]="False";
$opciones[2]="Lost";
$opciones[3]="True";
mysqli_set_charset($mysql,'utf8');
$registros=$mysql->query("SELECT cedula  FROM clientes WHERE Cobro=$Cobro") or die ("problemas en la consulta");
$num=0;
$cant=$registros->num_rows;
while ($reg=$registros->fetch_array()){
 $vev[$num]= $reg['cedula'];
   $num++;
}

$registros1=$mysql->query("SELECT cedula  FROM prestamos where Cobro=$Cobro");
$num1=0;
 while($reg1=$registros1->fetch_array()){
$vev1[$num1]= $reg1['cedula'];
   $num1++;
}

$num2=0;
for($i=0; $i<$cant; $i++){
 if (in_array($vev[$i], $vev1)) {
    $vev[$i];
   } else {
     $non[$num2]=$vev[$i];
    $num2++;

  }   
}
if(isset($non)){
	$contar_nomb=count($non);
} else {
$contar_nomb=0;
}	

echo '  <h2>Clientes sin saldo: '.$contar_nomb.'</h2>';

if(isset($non)){
echo '<table class="tablalistado1"style="margin: 0 auto;">';
echo '<tr><th>Nombre</th><th>Cedula</th><th>Telefono</th><th>Ver detalles</th>';
$cant1= count($non);
for($z=0; $z<$cant1; $z++){
      echo '<tr>';
      
   $regist=$mysql->query("SELECT nombre, cedula, telefono, difusion FROM clientes where cedula=$non[$z] and Cobro=$Cobro");
   if($read=$regist->fetch_array()){
    echo '<td>';
    echo $read['nombre'];  
    echo '</td>'; 
    
    echo '<td>';
    echo $read['cedula'];  
    echo '</td>'; 
    
     echo '<td>';
    echo $read['telefono'];  
    echo '</td>'; 
    
    echo '<td>';
    echo '<a href="'.$url.'client/'.$read['cedula'].'/edit">Ver Detalles</a>';
    echo '</td>'; 
    }
    
    echo '</tr>';
}

 
echo '</table>';


} else {
  echo '<h2>No hay datos para mostrar</h2>';  
}
?> 
 <!-- FIN DIALOGO -->
 <!-- jQuery first, then Popper.js, then Bootstrap JS -->
 <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</body>
<script>
let cedula, estado, selet;
const opciones=["Empty","False","Lost","True"];
function cambiar_estado(ced){
  $('#dialogo_1').modal();
  cedula=ced;
  const idsel="sel"+ced;
  selet = document.getElementById(idsel).value;
  estado=selet;
  run_ajax();
}

var conexion;
function run_ajax(){	 
  conexion=new XMLHttpRequest();
  conexion.onreadystatechange = procesar_after;
  conexion.open('POST','cambiar_estado_difusion.php', true);
  conexion.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  conexion.send(cargar_params());  	
	
}

function cargar_params(){
	var params ="cedula="+encodeURIComponent(cedula)+'&estado='+encodeURIComponent(estado);
	return params;
}
function procesar_after(){
  if(conexion.readyState == 4){
    for(let i=0;i<opciones.length;i++){
      if(opciones[i]==conexion.responseText){
        selet.selectedIndex = i;
        $('#dialogo_1').modal('hide');
      }
    }
  }
}
</script>
</html>