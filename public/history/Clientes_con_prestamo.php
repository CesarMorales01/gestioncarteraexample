<html>

<head>

 <link href="style.css" rel="stylesheet">

<title>Lista Clientes con prestamo</title>

  <br>

</head>  

<body>
<?php

include("datos.php");
$Cobro=$_REQUEST['Cobro'];
mysqli_set_charset($mysql,'utf8');
$regist1=$mysql->query("SELECT COUNT(*) from clientes JOIN prestamos on clientes.cedula=prestamos.cedula where prestamos.Cobro=$Cobro");
$regist=$mysql->query("SELECT nombre, prestamos.cedula, fecha_prest, valorprestamo from clientes JOIN prestamos on clientes.cedula=prestamos.cedula where prestamos.Cobro=$Cobro");
$read1=$regist1->fetch_array();
echo '<h2>Clientes con prestamo: '.$read1['COUNT(*)'].'</h2>';

// prestamos segun interes
$get_tasas=$mysql->query("SELECT * from prestamos where Cobro=$Cobro");     
while($read_tasas=$get_tasas->fetch_array()){
	$contador=$contador+1;
	$total_pagar_t=$read_tasas['totalapagar'];
	$months=get_meses($read_tasas['n_cuotas'], $read_tasas['periodicidad']);
	$rate=($read_tasas['totalapagar']-$read_tasas['valorprestamo'])/$months;
	$rate_mes_porc=($rate*100)/$read_tasas['valorprestamo'];
	$check_total_saldos=$read_tasas['tt_saldo']+$check_total_saldos;
	 $rate_aprox=number_format($rate_mes_porc,2,",",".");
	if($rate_aprox=="10,00"){
		 $cont_10=$cont_10+1;
		 $ced_10[]=$read_tasas['cedula'];
		 $total_10=$read_tasas['valorprestamo']+$total_10;
	}else {
		if($rate_aprox=="5,00"){
		 $cont_5=$cont_5+1;
		 $ced_5[]=$read_tasas['cedula'];
		 $total_5=$read_tasas['valorprestamo']+$total_5;
		}else{
			if($rate_aprox=="6,67"){
			$cont_67=$cont_67+1;
			$ced_67[]=$read_tasas['cedula'];
			$total_67=$read_tasas['valorprestamo']+$total_67;
			} else{
				if($rate_aprox=="7,50"){
					 $cont_75=$cont_75+1;
					 $ced_75[]=$read_tasas['cedula'];
					 $total_75=$read_tasas['valorprestamo']+$total_75;
				}else{
					 $cont_otros=$cont_otros+1;
					 $ced_otros[]=$read_tasas['cedula'];
					 $total_otros=$read_tasas['valorprestamo']+$total_otros;
					 
				}
			}
		}
	}
	
	
	
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



echo '<table class="tablalistado1"style="margin: 0 auto;">';
echo '<tr><th>Nombre</th><th>Cedula</th><th>Fecha prestamo</th><th>Valor prestamo</th><th>Ver detalles</th></tr>';
      
while($read=$regist->fetch_array()){
echo '<tr>';   
   echo '<td>';
    echo $read['nombre'];  
    echo '</td>'; 
    
    echo '<td>';
    echo $read['cedula'];  
    echo '</td>'; 
    
     echo '<td>';
    echo $read['fecha_prest'];  
    echo '</td>'; 
	
	echo '<td>';
	echo number_format($read['valorprestamo'],2,",",".");  
    echo '</td>'; 
    
    echo '<td>';
    echo '<a href="'.$url.'client/'.$read['cedula'].'/edit">Ver Detalles</a>';
    echo '</td>'; 
	
	 echo '</tr>';
    }
    
   


 
echo '</table>';

?>

</body>

</html>