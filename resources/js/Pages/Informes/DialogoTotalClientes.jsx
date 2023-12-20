import React from 'react'

const DialogoTotalClientes = (params) => {

  function goAllPrestamos() {
    const url = params.globalVars.urlRoot + "Clientes_con_prestamo.php?Cobro='" + params.carteSelected + "'"
    window.open(url, "nuevo", "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=800, height=600");
  }

  function goSinSaldo() {
    const url = params.globalVars.urlRoot + "Clientes_sin_saldo.php?Cobro='" + params.carteSelected + "'"
    window.open(url, "nuevo", "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=800, height=600");
  }

  return (
    <div id='modalTotalClientes' className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 style={{ fontWeight: 'bold', fontSize: '1.2em' }} >Registros total clientes</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <i className="fa-regular fa-rectangle-xmark fa-lg"></i>
          </button>
        </div>
        <div className="table-responsive">
          <table style={{ marginTop: '0.4em', textAlign: 'center' }} className="table table-sm">
            <thead >
              <tr className='align-middle' >
                <th style={{ color: 'white' }} className="navBarFondo rounded">Periodo</th>
                <th className="navBarFondo rounded">
                  <a href={route('client.list', 'nothing')} style={{ color: 'white' }} className='btn btn-outline-info'>
                    Total clientes
                    <i style={{ marginLeft: '0.5em' }} className="fa-solid fa-magnifying-glass-plus fa-lg"></i>
                  </a>
                </th>
                <th style={{ color: 'white' }} className="navBarFondo rounded">
                  <button onClick={goAllPrestamos} style={{ color: 'white' }} className='btn btn-outline-info'>
                    Total préstamos
                    <i style={{ marginLeft: '0.5em' }} className="fa-solid fa-magnifying-glass-plus fa-lg"></i>
                  </button>
                </th>
                <th style={{ color: 'white' }} className="navBarFondo rounded">
                  <button onClick={goSinSaldo} style={{ color: 'white' }} className='btn btn-outline-info'>
                    Total clientes sin saldo
                    <i style={{ marginLeft: '0.5em' }} className="fa-solid fa-magnifying-glass-plus fa-lg"></i>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {params.totales.meses.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item}</td>
                    <td>{params.totales.total_clientes[index]}</td>
                    <td>{params.totales.total_prestamos[index]}</td>
                    <td>{params.totales.total_clientes_sinsaldo[index]}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>




  )
}

export default DialogoTotalClientes