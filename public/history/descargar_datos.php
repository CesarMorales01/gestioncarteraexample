<?php
$nombre_archivo=$_REQUEST['nombre_archivo'];
header("Content-disposition: attachment; filename=$nombre_archivo");
header("Content-type: text/plain");
readfile("$nombre_archivo");
?>