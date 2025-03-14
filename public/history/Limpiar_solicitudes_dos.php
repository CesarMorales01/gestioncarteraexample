<?PHP

include("datos.php");
$nombre_archivo=$_REQUEST['nombre_archivo'];
$conexion= new mysqli($hostname_localhost,$username_localhost,$password_localhost,$database_localhost) or die ("problemas en la conexion");

$eliminar="truncate table solicitudes_dos";

$resultado_eliminar=mysqli_query($conexion,$eliminar) or die ("problemas al eliminar");
unlink($nombre_archivo);
if($resultado_eliminar){
    $uri=$url."history/Respuestas_solicitudes_dos.php";
header("Location: $uri");
}
			

?>