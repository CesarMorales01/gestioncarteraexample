<?php
header('Content-type: text/html; charset=utf-8');
$host = 'localhost';             // Conexión local
$usuario = 'cesar';     // Reemplaza con tu usuario de MySQL
$contrasena = 'Pokemongo2019';   // Reemplaza con tu contraseña
$base_de_datos = 'carteraexample';    // Reemplaza con tu base de datos
$url = "http://147.93.118.6:8080/";

$time= time();
$firstpart= '<link rel="StyleSheet" href="estilos.php';
$secondpart='?v=" />';
$estilos=$firstpart.$secondpart.$time; 

$mysql = new mysqli($host, $usuario, $contrasena, $base_de_datos);

// Verificar conexión
if ($mysql->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

date_default_timezone_set('America/Bogota');
$get_global_fecha_hoy_comis=date("Y-m-d");
?>