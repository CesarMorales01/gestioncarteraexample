<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Formulario inteligente para solicitudes</title>
    <link rel="shortcut icon" href="Imagenes/logo_financiera_favicon.png">
    <!-- Bootstrap -->
	<!-- <link href="css/bootstrap.css" rel="stylesheet"> -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<script defer src="https://use.fontawesome.com/releases/v5.1.1/js/all.js" integrity="sha384-BtvRZcyfv4r0x/phJt9Y9HhnN5ur1Z+kZbKVgzVBAlQZX4jvAuImlIz+bG7TS00a" crossorigin="anonymous"></script>
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="css/estilos_contactos.css?v=<?php echo time(); ?>" /> 
  </head>
  <body onclick="cerrar_dialogo()" style="background-image: url('Imagenes/fondo_blanco.jpg'); background-position: center center;	  
	background-repeat: no-repeat;
	background-attachment: fixed;
    background-size: cover;" >
  <div class="container">
  <br>
  <img height="120" style="margin:auto; display:block;" src="Imagenes/Logo_financiera_casabonita.jpg">    
  <br>
  <h2 style="color:black;">Solicitud de credito N° 2. Ya soy cliente.</h2>
  <hr> 
  <form method="post" action="ingresar_solicitud_clientes_dos_web.php">
  <div class="row">
  <p style="text-align:left;">Agradecemos actualices tu información. La usaremos para contactanos contigo.</p>
  <br> 
  <p style="text-align:left; color:red;">*Obligatorio</p> 
  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <p id="ingresaCedula" style="text-align:justify; color:black;">Ingresa tu número de cédula.<strong style="color:red;">*</strong></p>
            <input type="number" onfocusout="buscar_datos()" name="cedula" class="form-control" placeholder="Número de cedula" id="cedula" required> 
            <br> 
            <p<strong style="color:red;">*</strong></p> 
          <input type="text" name="nombre" class="form-control"   placeholder="Nombre" id="nombre" required> 
            <br>
            <p<strong style="color:red;">*</strong></p>
            <textarea name="direccion" id="direccion" rows="2" class="form-control" required placeholder="Direccion domicilio"></textarea> 
            <br>
            <input type="text" name="telefono" id="telefono" class="form-control" placeholder="Telefono fijo"> 
            <br>
            <p<strong style="color:red;">*</strong></p>
            <input type="text" name="celular" id="celular" class="form-control" required placeholder="Telefono celular"> 
            <br>
            <p style="text-align:justify; color:black;">Otros números telefonicos.</p>
            <input type="text" name="otros_telefonos" class="form-control"  placeholder="Otros telefonos">
            <br>
            <p style="text-align:justify; color:black;">Otros:<br>
            Cuéntanos si haz modificado algún otro de tus datos, estaremos muy agradecidos.</p>
          <textarea name="otros" rows="2" class="form-control" placeholder="Ejemplo: direccion de trabajo... telefono trabajo...Información de referencias...."></textarea> 
          <p style="text-align:justify; color:black;">Sugerencias:<br>
          Queremos mejorar. Déjanos tu sugerencia. Con tu ayuda prestaremos un mejor servicio. Gracias.</p>
          <textarea name="sugerencias" rows="2" class="form-control" placeholder="Sugerencias... Comentarios... Inquietudes..."></textarea>
            <p style="text-align:justify; color:black;">Valor de crédito a solicitar.<strong style="color:red;">*</strong></p>
            <input type="number" name="valor" id="valor" class="form-control" placeholder="0" required> 
            <br>
            <p style="text-align:justify; color:black;">Periodicidad .<strong style="color:red;">*</strong> <br>
            Selecciona cada cuanto puedes realizar abonos, es importante para calcular el valor de las cuotas.</p>
            <select name="periodicidad" id="periodicidad" class="form-control">
            <option value="Diaria">Diaria</option>
            <option value="Semanal">Semanal</option>
            <option value="Quincenal">Quincenal</option>
            <option value="Mensual">Mensual</option>
            </select>
          <br>
          <input type="hidden" name="max_prest"  id="max_prest"> 
          <input  type="submit"  style="color:black; background-color:green;" class="form-control"  value="Enviar solicitud" > 
          </form>   
      </div>
      <div onclick="ir_playstore()" style="text-align:center; cursor:pointer;" class="col-xs-12 col-sm-6 col-md-6 col-lg-6"> 
      <br> <hr id="hr" class="border border-dark"><br> 
      
      <img width="300" height="300" src="Imagenes/financiera_playstore.png" style="margin:auto; display:block;" alt="Placeholder image"> 
      <br>  
      <a onclick="ir_playstore()" type="button" class="btn btn-success">Click aquí para descargar la app!</a>  
      <br><br>
      <ul>
        <h5><strong>Desde la app podrás:</strong></h5>
        <li>Consultar tu saldo</li>
        <li>Consultar abonos</li>
        <li>Realizar pagos</li>
        <li>Hacer solicitudes de crédito</li>
        <li>Enterarte de promociones y descuentos!</li>
        <li>Télefonos de contacto.</li>
        <li>Y mucho más!</li>
        </ul> 
      <br>
      </div>
    </div>
  </div> 
  <!--- Ventana promo -->
  <a class="nav-link" data-toggle="modal" id="ancla_dialogo" data-target="#dialogo1"></a>
			  <!-- INICIO DIALOGO NUEVO REGISTRO --> 
					<div style="top:600px;" class="modal hide" id="dialogo1">
					  <div class="modal-dialog border border-danger">
						<div style="text-align:center; background-color: rgba(46,139,87, 0.6);" class="modal-content">
						  <!-- cuerpo del diálogo -->
							  <div class="modal-body">
								<h5>Refiérenos con tus familiares y amigos y ganate un 5% de comisión del valor de su préstamo!</h5>
                <button id="btn_cerrar_dialogo" type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
							  </div>	
						</div>
					  </div>
					</div>
 <!-- FIN DIALOGO -->

<script>
location.href ="https://financiera.tucasabonita.site/request/Im/already/customer/city/bga";  
var cedula;
//document.getElementById('ancla_dialogo').click();
var width = this.innerWidth;

if(width<450){
  document.getElementById("hr").style.visibility = "visible";
}else{
  document.getElementById("hr").style.visibility = "hidden";
}

function cerrar_dialogo(){
  document.getElementById('btn_cerrar_dialogo').click();
}

function ir_playstore(){
  location.href="https://play.google.com/store/apps/details?id=com.cezarmh86gmail.microcreditosapp";
}

function buscar_datos() {
  var paCedula= document.getElementById("ingresaCedula");
  cedula= document.getElementById("cedula").value;
  var patron=/^[0-9]+$/;
    if (patron.test(cedula)) {
      enviarFormulario();
      paCedula.style.color="black";
      paCedula.innerText="INGRESA TU NUMERO DE CEDULA";
    } else { 
     paCedula.style.color="red"; 
     paCedula.innerText="INGRESA TU NUMERO DE CEDULA SIN PUNTOS NI LETRAS NI SIMBOLOS PARA PERMITIR LA CARGA AUTOMATICA DEL FORMULARIO!";
		}
}

function retornarDatos(){
  var cadena='cedula='+encodeURIComponent(cedula);
  return cadena;
}

var conexion1;
function enviarFormulario() {
  conexion1=new XMLHttpRequest();
  conexion1.onreadystatechange = procesarEventos;
  conexion1.open('POST','llenar_formu_solicitud_dos.php', true);
  conexion1.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  conexion1.send(retornarDatos());  
}

function procesarEventos(){
  if(conexion1.readyState == 4){  
    var datos=JSON.parse(conexion1.responseText);
    document.getElementById("nombre").value=datos.nombre;
    document.getElementById("direccion").value=datos.direccion;
    document.getElementById("telefono").value=datos.tel_fijo;
    var max_prest=datos.valorprestamo;
    document.getElementById("valor").value=max_prest;
    document.getElementById("max_prest").value=max_prest;
    var per = datos.periodicidad;
    if(per=="diaria"){
      document.getElementById("periodicidad").value="Diaria";
    }
    if(per=="semanal"){
      document.getElementById("periodicidad").value="Semanal";
    }
    if(per=="quincenal"){
      document.getElementById("periodicidad").value="Quincenal";
    }
    if(per=="mensual"){
      document.getElementById("periodicidad").value="Mensual";
    } 
  }
}
</script>
</body>
</html>