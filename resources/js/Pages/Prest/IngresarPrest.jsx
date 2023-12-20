import React, { useState, useEffect, useRef } from 'react'
import GlobalFunctions from '../services/GlobalFunctions'
import '../../../css/general.css'
import SecondaryButton from '@/Components/SecondaryButton'
import ActiveButton from '@/Components/ActiveButton'
import Swal from 'sweetalert2'
import NeutralButton from '@/Components/NeutralButton'
import PrestamoAmortizado from './PrestamoAmortizado'

const IngresarPrest = (params) => {

  const glob = new GlobalFunctions()
  const [prest, setPrest] = useState({
    Cobro: params.cliente.Cobro,
    asesor: "",
    cedula: params.cliente.cedula,
    fecha_prest: glob.getFecha(),
    interes: 2.5,
    n_cuotas: 8,
    periodicidad: "semanal",
    tiempo_meses: 2,
    totalapagar: 240000,
    tt_abonos: 0,
    tt_saldo: 240000,
    valor_cuotas: 8,
    valorprestamo: 200000,
    vencimiento: ""
  })
  const options = ["diario", "semanal", "quincenal", "mensual"]
  const [calc, setCalc] = useState(false)
  const [users, setUsers] = useState([])

  useEffect(() => {
    setCalc(true)
    fetchAsesores()
    if (params.prest != '') {
      cargarParametros()
    } else {
      calcularCredito()
    }
  }, [])

  useEffect(() => {
    if (calc) {
      calcularCredito()
    }
  }, [prest])

  function fetchAsesores() {
    const url = params.globalVars.myUrl + 'user'
    fetch(url)
      .then((response) => {
        return response.json()
      }).then((json) => {
        setUsers(json)
      })
  }

  function cargarParametros() {
    setPrest((valores) => ({
      ...valores,
      Cobro: params.prest.Cobro,
      asesor: params.prest.asesor,
      cedula: params.cliente.cedula,
      cuotasenmora: params.prest.cuotasenmora,
      fecha_prest: params.prest.fecha_prest,
      interes: params.prest.interes,
      n_cuotas: params.prest.n_cuotas,
      periodicidad: params.prest.periodicidad,
      tiempo_meses: params.prest.tiempo_meses,
      totalapagar: params.prest.totalapagar,
      tt_abonos: params.prest.tt_abonos,
      tt_saldo: params.prest.tt_saldo,
      valor_cuotas: params.prest.valor_cuotas,
      valorprestamo: params.prest.valorprestamo,
      vencimiento: params.prest.vencimiento,
      totalInteres: ""
    }))
    setCalc(true)
  }

  function alertDatosFaltantes() {
    Swal.fire({
      title: 'Faltan datos importantes!',
      icon: 'warning',
      timer: 1000
    })
  }

  function validar() {
    if (prest.valorprestamo > 0 && prest.tiempo_meses > 0) {
      loadinOn()
      if (params.prest != '') {
        const form = document.getElementById("Form_ingresar_prestamo")
        form.action = route('prest.edit')
        form.submit()
      } else {
        document.getElementById('Form_ingresar_prestamo').submit()
      }
    } else {
      alertDatosFaltantes()
    }
  }

  function loadinOn() {
    document.getElementById('btnIngresarPrest').style.display = 'none'
    document.getElementById('btnLoadingPrest').style.display = ''
  }

  function calcularCredito() {
    setCalc(false)
    let totalInteres = (prest.tiempo_meses * (prest.interes / 100))
    let ncuotas = getPeriodNumber() * prest.tiempo_meses
    let totalpagar = (prest.valorprestamo * totalInteres) + parseFloat(prest.valorprestamo)
    let valorcuotas = (totalpagar / ncuotas).toFixed(0)
    var e = new Date(prest.fecha_prest)
    e.setMonth(e.getMonth() + parseInt(prest.tiempo_meses))
    let saldo = parseInt(totalpagar) - parseInt(prest.tt_abonos)
    setPrest((valores) => ({
      ...valores,
      n_cuotas: ncuotas,
      totalapagar: totalpagar,
      tt_saldo: saldo,
      valor_cuotas: valorcuotas,
      vencimiento: glob.formatFecha(e)
    }))
  }

  function functionSetnMeses(event) {
    setCalc(true)
    setPrest((valores) => ({
      ...valores,
      tiempo_meses: event.target.value
    }))
  }

  function getPeriodNumber() {
    let number = 0
    switch (prest.periodicidad) {
      case "diario":
        number = 30
        break
      case "semanal":
        number = 4
        break
      case "quincenal":
        number = 2
        break
      case "mensual":
        number = 1
        break
    }
    return number
  }

  function functionSetPeriodicidad(event) {
    setCalc(true)
    setPrest((valores) => ({
      ...valores,
      periodicidad: event.target.value
    }))
  }

  function functionSetValorPrestamo(event) {
    setCalc(true)
    setPrest((valores) => ({
      ...valores,
      valorprestamo: event.target.value
    }))
  }

  function functionSetInteres(event) {
    setCalc(true)
    setPrest((valores) => ({
      ...valores,
      interes: event.target.value
    }))
  }

  function cambioFechaPrest(event) {
    setCalc(true)
    setPrest((valores) => ({
      ...valores,
      fecha_prest: event.target.value
    }))
  }

  function cambioVencimiento(event) {
    setPrest((valores) => ({
      ...valores,
      vencimiento: event.target.value
    }))
  }

  function cambioAsesor(event) {
    setPrest((valores) => ({
      ...valores,
      asesor: event.target.value
    }))
  }

  function cambioValorCuotas(event) {
    setPrest((valores) => ({
      ...valores,
      valor_cuotas: event.target.value
    }))
  }

  function cambioTotalPagar(event) {
    setPrest((valores) => ({
      ...valores,
      totalapagar: event.target.value
    }))
  }

  function cambioTotalAbonos(event) {
    setPrest((valores) => ({
      ...valores,
      tt_abonos: event.target.value
    }))
  }

  function cambioTotalSaldo(event) {
    setPrest((valores) => ({
      ...valores,
      tt_saldo: event.target.value
    }))
  }

  function checkPermisos() {
    let mostrar = 'none'
    if (params.permisos.includes('editar-prest') && params.prest != '') {
      mostrar = ''
    }
    return mostrar
  }

  return (
    <div className="modal fade" id="prestamoModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className='titulo'>{params.prest == '' ? 'Ingresar préstamo' : 'Editar préstamo'}</h5>
            <button type="button" className="btn-close" data-dismiss="modal">
              <svg style={{ color: 'red' }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
              </svg>
            </button>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <form method="post" action={route('prest.store')} id="Form_ingresar_prestamo">
                <div style={{ textAlign: 'center', marginBottom: '0.5em' }} className="row">
                  <div className="col-6"  >
                    Fecha de prestamo:
                    <br />
                    <input className='rounded' onChange={cambioFechaPrest} type="date" name="fecha_prest" id="date" value={prest.fecha_prest} />
                  </div>
                  <div className="col-6" >
                    Valor del prestamo:
                    <br />
                    <input className='rounded' type="number" onChange={functionSetValorPrestamo} name="valorprestamo" id='input_prestamo' value={prest.valorprestamo} />
                  </div>
                </div>
                <div style={{ textAlign: 'center' }} className="row" >
                  <div className="col-6 "  >
                    Tiempo (meses):
                    <br />
                    <input className='rounded' type="number" min="1" onChange={functionSetnMeses} max="100" name="tiempo_meses" value={prest.tiempo_meses} />
                  </div>
                  <div className="col-6 " >
                    Periodicidad:
                    <br />
                    <select className='rounded' onChange={functionSetPeriodicidad} value={prest.periodicidad} name="periodicidad">
                      {options.map((item, index) => {
                        return (
                          <option key={index} value={item}>{item}</option>
                        )
                      })}
                    </select>
                  </div>
                </div>
                <div style={{ textAlign: 'center', marginTop: '0.5em' }} className="row" >
                  <div className="col-6 "  >
                    N° cuotas:
                    <br />
                    <input className='rounded' type="number" name="n_cuotas" min="0" max="999" id='input_n_cuotas' readOnly value={prest.n_cuotas} />
                  </div>
                  <div className="col-6 " >
                    Interes:
                    <br />
                    <input className='rounded' type="number" onChange={functionSetInteres} min="0" max="99" name="interes" value={prest.interes} /> %
                  </div>
                </div>
                <div style={{ textAlign: 'center', marginTop: '0.5em' }} className="row" >
                  <div className="col-6 "  >
                    Valor cuotas:
                    <br />
                    <input className='rounded' type="number" style={{ width: '8em' }} onChange={cambioValorCuotas} readOnly={params.prest == '' ? true : false} name="valor_cuotas" size='20' value={prest.valor_cuotas} />
                  </div>
                  <div className="col-6 " >
                    Total a pagar:
                    <br />
                    <input className='rounded' type="number" style={{ width: '8em' }} onChange={cambioTotalPagar} readOnly={params.prest == '' ? true : false} name="totalapagar" size='10' value={prest.totalapagar} />
                  </div>
                </div>
                <div style={{ display: checkPermisos(), textAlign: 'center', marginTop: '0.5em' }} className="row" >
                  <div className="col-6 "  >
                    Total abonos:
                    <br />
                    <input className='rounded' type="number" style={{ width: '8em' }} name="tt_abonos" size='20' onChange={cambioTotalAbonos} readOnly={params.prest == '' ? true : false} value={prest.tt_abonos} />
                  </div>
                  <div className="col-6 " >
                    Total saldo:
                    <br />
                    <input className='rounded' type="number" style={{ width: '8em' }} name="tt_saldo" size='10' onChange={cambioTotalSaldo} readOnly={params.prest == '' ? true : false} value={prest.tt_saldo} />
                  </div>
                </div>
                <div style={{ display: checkPermisos(), textAlign: 'center', marginTop: '0.5em' }} className="row" >
                  <div className="col-6 "  >
                    Vencimiento
                    <br />
                    <input className='rounded' onChange={cambioVencimiento} type="date" name="vencimiento" id="date" value={prest.vencimiento} />
                  </div>
                  <div className="col-6 " >
                    Asesor:
                    <br />
                    <select className='rounded' onChange={cambioAsesor} value={prest.asesor} name="asesor">
                      {users.length > 0 ?
                        users.map((item, index) => {
                          return (
                            <option key={index} value={item.name}>{item.name}</option>
                          )
                        })
                        :
                        ''}
                    </select>
                  </div>
                </div>
                <input type="hidden" name="Cobro" defaultValue={prest.Cobro} />
                <input type="hidden" name="cedula" value={prest.cedula} />
                <input type="hidden" name='_token' value={params.token} />
              </form>
            </div>
          </div>
          <div className="modal-footer">
            <PrestamoAmortizado prest={params.prest} cliente={params.cliente} globalVars={params.globalVars} permisos={params.permisos} token={params.token} users={users}></PrestamoAmortizado>
            <NeutralButton style={{ display: 'none' }} data-toggle="modal" data-target="#prestamoAmortModal" type="button">Amortizado</NeutralButton>
            <SecondaryButton type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</SecondaryButton>
            <ActiveButton onClick={validar} type='button' id="btnIngresarPrest" className="btn btn-success">{params.prest == '' ? 'Ingresar préstamo' : 'Editar préstamo'}</ActiveButton>
            <ActiveButton id='btnLoadingPrest' style={{ display: 'none', backgroundColor: 'gray' }} type="button" disabled>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Loading...
            </ActiveButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IngresarPrest