<html>

<head>

 <link href="style.css" rel="stylesheet">

<title>Lista Clientes en Mora</title>

  <br>

  <h2> Clientes en Mora</h2>

</head>  

<body>
<?php

include("datos.php");
$Cobro=$_REQUEST['Cobro'];
$fecha=$_REQUEST['fecha'];
$fecha_comis="'$fecha'";

$mysql=new mysqli($hostname_localhost,$username_localhost,$password_localhost,$database_localhost);

    if ($mysql->connect_error)

     die("Problemas con la conexión a la base de datos");
mysqli_set_charset($mysql,'utf8');
$registros=$mysql->query("SELECT nombre, prestamos.cedula, fecha_prest, valorprestamo, vencimiento, tt_saldo, interes, periodicidad, n_cuotas, totalapagar  FROM `prestamos` join clientes on prestamos.cedula=clientes.cedula WHERE vencimiento < $fecha_comis and prestamos.Cobro=$Cobro order by fecha_prest desc") or die ("problemas en la consulta");

echo '<table class="tablalistado1"style="margin: 0 auto;">';

echo '<tr><th>Nombre</th><th>Fecha prestamo</th><th>Vencimiento</th><th>Total saldo</th><th>Ver Cuenta</th><th>Int</th><th>N° C en mora</th></tr>';	
$contar_clientes=0;
while ($reg=$registros->fetch_array()){

	  echo '<tr>';

      echo '<td>';

      echo $reg['nombre'];

      echo '</td>';  

	  

	 echo '<td>';
	 echo $reg['fecha_prest'];
     echo '</td>';  

	 

	 echo '<td>';

     echo $reg['vencimiento'];

      echo '</td>';  
	
	 echo '<td>';
     echo number_format($reg['tt_saldo'],2,",",".");
     echo '</td>';  
     
     echo '<td>';
     echo '<a href="Form_ detalle_cuentas_todos.php?cedula='.$reg['cedula'].'">Ver cuenta</a>';
     echo '</td>';
	 echo '<td>';
	 $int= get_int($reg['n_cuotas'], $reg['periodicidad'], $reg['totalapagar'], $reg['valorprestamo']);
	 echo number_format($int,2,",",".");
	 $int= number_format($int,2,",",".");
	 if($int=="10,00"){
			echo ": ";
			echo $cont_10=$cont_10+1;
			echo"<br>"; 
		}
	if($int=="7,50"){
			echo ": ";
			echo $cont_75=$cont_75+1;
			echo"<br>"; 
		}
	if($int=="6,67"){
			echo ": ";
			echo $cont_67=$cont_67+1;
			echo"<br>"; 
		}
	if($int=="5,00"){
			echo ": ";
			echo $cont_5=$cont_5+1;
			echo"<br>"; 
		}		
     echo '</td>';
	 echo '<td>';
	 $contar_clientes=$contar_clientes+1;
     echo $contar_clientes;
     echo '</td>';
	 echo '</tr>';	
} 		
	 
	function get_int($n_cuotas, $periodicidad, $totalapagar, $valorprestamo){
		 $months=get_meses($n_cuotas, $periodicidad);
		 $rate=($totalapagar-$valorprestamo)/$months;
		 $rate_mes_porc=($rate*100)/$valorprestamo;
		return $rate_mes_porc;
	}	

	function get_meses($n_cuotas, $periodicidad){
		if($periodicidad=="diario"){
			$meses=$n_cuotas/30;
		}
		if($periodicidad=="semanal"){
			$meses=$n_cuotas/4;
		}
		if($periodicidad=="quincenal"){
			$meses=$n_cuotas/2;
		}
		if($periodicidad=="mensual"){
			 $meses=$n_cuotas/1;
		}
		return $meses;
	}	
	 
$consultar_cartera_enmora=$mysql->query("SELECT  sum(tt_saldo)  FROM `prestamos` where vencimiento < $fecha_comis and Cobro=$Cobro") or die("problemas al consultar cartera en mora");      
$get_cartera_enmora=$consultar_cartera_enmora->fetch_array();      
      
      echo '<tr>';
      
       echo '<th>';

     echo 'Total';

      echo '</th>';
      
      echo '<th>';
      echo number_format($get_cartera_enmora['sum(tt_saldo)'],2,",",".");

      echo '</th>';	 
     echo '</tr>';    
  	echo '</table>';



?>

</body>

</html>