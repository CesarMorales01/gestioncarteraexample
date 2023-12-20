<!DOCTYPE html>
<html>

<head>

  <link rel="StyleSheet" href="estilos.php" type="text/css">

  <title>Opciones totales</title>

</head>

<body>
  <script>
    function toggle(source) {
      checkboxes = document.getElementsByName('id[]');

      for (var i = 0, n = checkboxes.length; i < n; i++) {
        checkboxes[i].checked = source.checked;
      }
    }

    function toggle1(source) {
      checkboxes = document.getElementsByName('idTotales[]');

      for (var i = 0, n = checkboxes.length; i < n; i++) {
        checkboxes[i].checked = source.checked;
      }
    }
  </script>
  <br>
  <h1>Totales</h1>
  <br>
  <?php
  include("datos.php");
  $Cobro = $_REQUEST['Cobro'];
  $consultar_totales = $mysql->query("SELECT * FROM totales where Cobro=$Cobro") or die("problemas en consultar totales");
  // TABLA TOTALES
  echo '<table class="tablalistado" style="margin: 0 auto;">';
  echo '<tr><th>PERIODO</th> <th>TOTAL CUENTAS</th> <th>TOTAL ABONOS</th><th>%</th> <th>TOTAL SALDOS</th><th>%</th><th> <a href="Fechax_clientes_enmora.php?Cobro=' . $Cobro . '&fecha=' . $get_global_fecha_hoy_comis . '">TOTAL CARTERA EN MORA</a></th><th>%</th>';
  echo '<th>';
  echo '<input type="checkbox" id="select_all" onClick="toggle(this)"/>';
  echo "Seleccionar todos";
  echo '</th>';
  echo '</tr>';
  echo '<form method="post" action="Alerta_eliminar_totales.php" id"Alerta_eliminar_totales">';
  while ($get_totales = $consultar_totales->fetch_array()) {
    echo '<tr>';

    echo '<td>';
    echo $get_totales['Mes'];
    echo '</td>';

    echo '<td>';

    echo number_format($get_totales['Total_cuentas'], 2, ",", ".");
    echo '</td>';
    echo '<td>';

    echo number_format($get_totales['Total_abonos'], 2, ",", ".");

    echo '</td>';

    echo '<td>';
    $abonos_p = ($get_totales['Total_abonos'] * 100) / $get_totales['Total_cuentas'];
    echo round($abonos_p, 2);
    echo "%";
    echo '</td>';

    echo '<td>';
    echo number_format($get_totales['Total_saldos'], 2, ",", ".");
    echo '</td>';

    echo '<td>';
    $saldos_p = ($get_totales['Total_saldos'] * 100) / $get_totales['Total_cuentas'];
    echo round($saldos_p, 2);
    echo "%";
    echo '</td>';

    echo '<td>';
    echo number_format($get_totales['cartera_mora'], 2, ",", ".");
    echo '</td>';

    echo '<td>';
    $mora_p = ($get_totales['cartera_mora'] * 100) / $get_totales['Total_cuentas'];
    echo round($mora_p, 2);
    echo "%";
    echo '</td>';

    echo '<td>';
    echo '<input type="hidden" value=' . $_REQUEST['Cobro'] . ' name="Cobro">';
    echo '<input type="checkbox"  name="id[]" value="' . $get_totales['Id'] . '"/>';
    echo '<input type="submit" style="background-color:red" value="Eliminar seleccionados">';
    echo '</td>';

    echo '</tr>';
  }
  echo '</table>';
  echo '</form>';

  $consultar_htotales = $mysql->query("SELECT * FROM Historial_totales where Cobro=$Cobro") or die("problemas en consultar Historialtotales");
  // TABLA HISTORIAL TOTALES
  echo '<h1>Historial Totales</h1>';
  echo '<table class="tablalistado" style="margin: 0 auto;">';
  echo '<tr><th>PERIODO</th> <th>TOTAL CUENTAS</th> <th>TOTAL ABONOS</th><th>%</th> <th>TOTAL SALDOS</th><th>%</th><th>TOTAL CARTERA EN MORA</th><th>%</th>';
  echo '<th>';
  echo '<input type="checkbox" id="select_all" onClick="toggle1(this)"/>';
  echo "Seleccionar todos";
  echo '</th>';
  echo '</tr>';
  echo '<form method="post" action="Alerta_eliminar_historial_totales.php">';
  while ($get_htotales = $consultar_htotales->fetch_array()) {
    echo '<tr>';

    echo '<td>';
    echo $get_htotales['Mes'];
    echo '</td>';

    echo '<td>';

    echo number_format($get_htotales['Total_cuentas'], 2, ",", ".");
    echo '</td>';
    echo '<td>';

    echo number_format($get_htotales['Total_abonos'], 2, ",", ".");

    echo '</td>';

    echo '<td>';
    $abonos_p = ($get_htotales['Total_abonos'] * 100) / $get_htotales['Total_cuentas'];
    echo round($abonos_p, 2);
    echo "%";
    echo '</td>';

    echo '<td>';
    echo number_format($get_htotales['Total_saldos'], 2, ",", ".");
    echo '</td>';

    echo '<td>';
    $saldos_p = ($get_htotales['Total_saldos'] * 100) / $get_htotales['Total_cuentas'];
    echo round($saldos_p, 2);
    echo "%";
    echo '</td>';

    echo '<td>';
    $carteMora = 0;
    if ($get_htotales['cartera_mora']) {
      $carteMora = $get_htotales['cartera_mora'];
    }

    echo number_format($carteMora, 2, ",", ".");
    echo '</td>';

    echo '<td>';
    $mora_p = ($carteMora * 100) / $get_htotales['Total_cuentas'];
    echo round($mora_p, 2);
    echo "%";
    echo '</td>';

    echo '<td>';
    echo $get_htotales['id'];
    echo '<input type="hidden" value=' . $_REQUEST['Cobro'] . ' name="Cobro">';
    echo '<input type="checkbox"  name="idTotales[]" value="' . $get_htotales['id'] . '"/>';
    echo '<input type="submit" style="background-color:red" value="Eliminar seleccionados">';
    echo '</td>';

    echo '</tr>';
  }
  echo '</table>';
  echo '</form>';


  ?>
</body>

</html>