<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Form Solicitudes</title>
    <!-- Bootstrap -->
	<!-- <link href="css/bootstrap.css" rel="stylesheet"> -->
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
  <link href="style.css" rel="stylesheet">
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
		  <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
		  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
		<![endif]-->
  </head>
  <body style="background-image: url('Imagenes/fondo_blanco.jpg'); background-position: center center;	  
	background-repeat: no-repeat;
	background-attachment: fixed;
    background-size: cover;" >
  <div class="container">
  <br>
  <h2 style="color:black;">Solicitud de credito N° 1.</h2>
  <hr> 
  <form method="post" action="solicitud_clientes_uno.php">
  <div class="row">
  <p style="text-align:left;"> Le agradecemos el tiempo y la disposición requeridas para llenar este formulario. Es de especial necesidad para nosotros.</p>
  <br> 
  <p style="text-align:left; color:red;">*Obligatorio</p> 
  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <p style="text-align:justify">DATOS DEL SOLICITANTE <strong style="color:red;">*</strong> <br>
            Nombres y apellidos completos, como aparecen en la cédula</p>
          <input type="text" name="nombre" class="form-control"   placeholder="Nombre" id="nombre" required> 
          <br> 
            <input type="number" name="cedula" class="form-control" placeholder="Número de cedula" id="cedula" required> 
            <br>
            <p style="text-align:justify">Dirección de domicilio <strong style="color:red;">*</strong> <br>
            Escriba la calle o carrera, seguido del numero (nomenclatura), piso o apartamento, nombre del barrio y ciudad de su domicilio. 
            Ejemplo: Calle 5 N° 8-80 Apto 201 Edificio Torre del Oriente. Barrio Bucarica. Floridablanca</p>
            <textarea name="direccion" rows="2" class="form-control" required placeholder="Direccion domicilio"></textarea> 
            <br>
            <p style="text-align:justify">Vive usted en vivienda propia?<strong style="color:red;">*</strong> <br>
            Si su vivienda es propia y tiene un certificado que lo afirme, entreguelo a nuestro asesor!</p>
            <select name="vivienda_propia" required class="form-control">
            <option value="">Elige una opción</option>
            <option value="si">Si</option>
            <option value="no">No</option>
            </select>
            <br>
            <input type="text" name="telefono" class="form-control" placeholder="Telefono fijo"> 
            <br>
            <input type="text" name="celular" class="form-control" required placeholder="Telefono celular"> 
            <br>
            <p style="text-align:justify">Si tiene otro número telefonico por favor ingrese lo aqui. </p>
            <input type="text" name="otros_telefonos" class="form-control"  placeholder="Otros telefonos">
            <br> 
            <p style="text-align:justify">Nombre de la empresa en que labora.<strong style="color:red;">*</strong> <br>
            Escriba el nombre de la empresa donde trabaja. Si es independiente, lo puede escribir así. </p>
            <input type="text" name="empresa" class="form-control" required placeholder="Tu respuesta">
            <br> 
            <p style="text-align:justify">Cargo o profesión.<strong style="color:red;">*</strong></p>
            <input type="text" name="profesion" class="form-control" required placeholder="Profesión">
            <br>
            <p style="text-align:justify">Dirección de trabajo.<strong style="color:red;">*</strong> <br>
            Escriba la calle o carrera, seguido del numero (nomenclatura), dependencia u oficina, nombre del barrio y ciudad de su lugar de trabajo. Ejemplo: Calle 5 N° 8-80 Oficina 521 . Parque industrial Provincia de Soto. Barrio La Floresta. Giron. </p> 
             <textarea name="direccion_trabajo" rows="2" class="form-control" required placeholder="Direccion de trabajo"></textarea>
            <br> 
            <input type="text" name="telefono_trabajo" class="form-control" placeholder="Telefono de trabajo"> 
            <br>
            <p style="text-align:justify">INFORMACIÓN FINANCIERA: Sueldo Básico.<strong style="color:red;">*</strong> <br>
            Escriba por favor una cifra aproximada del total de sueldo devengado. </p>
            <input required type="text" name="salario"  class="form-control" placeholder="Tu respuesta"> 
            <br>
            <p style="text-align:justify">Otros ingresos<br>
            Pensiones, comisiones, etc.</p>
            <input type="text" name="otros_ingresos"  class="form-control" placeholder="Tu respuesta"> 
            <br>
            <p style="text-align:justify">Gastos mensuales.<strong style="color:red;">*</strong> <br>
            Costo total de arrendamiento, servicios públicos, mercado, educación, obligaciones financieras, etc.</p>
            <input type="text" required name="gastos"  class="form-control" placeholder="Tu respuesta">
            <br>
            <p style="text-align:justify">REFERENCIA N° 1.<strong style="color:red;">*</strong> <br>
            Escriba una referencia familiar o personal, incluyendo su nombre completo, número de identificación, direccion de domicilio y teléfonos.</p>
            <textarea name="nombre_fiador1" rows="2"  class="form-control" placeholder="Nombre, numero de cedula, direccion y telefono de refencia N°1."></textarea> 
            <br>
            <p style="text-align:justify">REFERENCIA N° 2.<br>
            Escriba una referencia familiar o personal, incluyendo su nombre completo, número de identificación, direccion de domicilio y teléfonos.</p>
            <textarea name="nombre_fiador2" rows="2"  class="form-control" placeholder="Nombre, numero de cedula, direccion y telefono de refencia N°2."></textarea> 
            <br>
            <p style="text-align:justify">Valor de crédito a solicitar</p>
            <input type="number" name="valor" class="form-control" placeholder="Cantidad de dinero que necesitas" id="valor" required> 
            <br>
            <p style="text-align:justify">Periodicidad .<strong style="color:red;">*</strong> <br>
            Selecciona cada cuanto puedes realizar abonos, es importante para calcular el valor de las cuotas.</p>
            <select name="periodicidad" class="form-control">
            <option value="Diaria">Diaria</option>
            <option value="Semanal">Semanal</option>
            <option value="Quincenal">Quincenal</option>
            <option value="Mensual">Mensual</option>
            </select>
          <br>
          <input  type="submit"  style="color:black; background-color:green;" class="form-control"  value="Enviar" > 
          </form>   
      </div>

      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
      <br>  
      <img width="200" height="200" src="la_humildad.png" style="margin:auto; display:block;" alt="Placeholder image"> </div>
      <br> 
	  </div>

  </div> 
	<!-- jQuery (necessary for Bootstrap's JavaScript plugins) --> 
	<script src="js/jquery-1.11.2.min.js"></script>
	<!-- Include all compiled plugins (below), or include individual files as needed --> 
	<!-- <script src="js/bootstrap.js"></script> -->
  <script src="js/bootstrap-3.3.7.js"></script>
</body>
<?PHP
if(isset($_REQUEST['failure'])){
	$falla=$_REQUEST['failure'];
}
?>
<script>
var falla="<?PHP echo $falla;?>";
if(falla==""){}else{
	alert("No se puedo realizar la solicitud del crédito. Intenta nuevamente llenando todos los campos obligatorios y evitando ingresar caracteres especiales como: *!?#$|, etc. Si el problema persiste, comunicate con uno de nuestros asesores. Disculpanos por las molestias! ");
}
</script>
</html>