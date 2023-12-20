import React, { useState, useEffect, useRef } from 'react'
import GlobalFunctions from '../services/GlobalFunctions'
import '../../../css/general.css'
import SecondaryButton from '@/Components/SecondaryButton'
import ActiveButton from '@/Components/ActiveButton'
import Swal from 'sweetalert2'

const PrestamoAmortizado = (params) => {

    const glob = new GlobalFunctions()
    const [prest, setPrest] = useState({
        Cobro: params.cliente.Cobro,
        asesor: "",
        cedula: params.cliente.cedula,
        fecha_prest: glob.getFecha(),
        interes: 5,
        n_cuotas: 5,
        periodicidad: "mensual",
        tiempo_meses: 5,
        totalapagar: 0,
        tt_abonos: 0,
        tt_saldo: 0,
        valor_cuotas: 0,
        valorprestamo: 2000000,
        vencimiento: ""
    })
    const options = ["diario", "semanal", "quincenal", "mensual"]
    const [calc, setCalc] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(() => {
        setCalc(true)
        calcularCredito()
    }, [])

    useEffect(() => {
        if (calc) {
            calcularCredito()
        }
    }, [prest])

    function alertDatosFaltantes() {
        Swal.fire({
            title: 'Faltan datos importantes!',
            icon: 'warning',
            timer: 1000
        })
    }

    function validar() {
        if (prest.valorprestamo > 0 && prest.tiempo_meses > 0 && params.prest == '') {
            loadinOn()
            document.getElementById('Form_prestamo_amort').submit()
        } else {
            alertDatosFaltantes()
        }
    }

    function loadinOn() {
        document.getElementById('btnIngresarPrestAmort').style.display = 'none'
        document.getElementById('btnLoadingPrestAmort').style.display = ''
    }

    function calcularCredito() {
        setCalc(false)
        let monto = prest.valorprestamo
        let interes = prest.interes
        let tiempo = prest.tiempo_meses
        let cuota = monto * (Math.pow(1 + interes / 100, tiempo) * interes / 100) / (Math.pow(1 + interes / 100, tiempo) - 1);
        let ncuotas = getPeriodNumber() * prest.tiempo_meses
        let cuotaPeriodicidad = cuota / getPeriodNumber();
        let total = Math.round(cuotaPeriodicidad) * ncuotas
        var e = new Date(prest.fecha_prest)
        e.setMonth(e.getMonth() + parseInt(prest.tiempo_meses))
        setPrest((valores) => ({
            ...valores,
            totalapagar: total,
            tt_saldo: total,
            valor_cuotas: Math.round(cuotaPeriodicidad),
            vencimiento: glob.formatFecha(e),
            n_cuotas: ncuotas
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

    function checkPermisos() {
        let mostrar = 'none'
        if (params.permisos.includes('editar-prest') && params.prest != '') {
            mostrar = ''
        }
        return mostrar
    }

    return (
        <div className="modal fade" id="prestamoAmortModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className='titulo'>Ingresar préstamo amortizado</h5>
                        <button type="button" className="btn-close" data-dismiss="modal">
                            <svg style={{ color: 'red' }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-square-fill" viewBox="0 0 16 16">
                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                            </svg>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <form method="post" action={route('prest.store')} id="Form_prestamo_amort">
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
                                        Vencimiento
                                        <br />
                                        <input className='rounded' readOnly type="date" name="vencimiento" id="date" value={prest.vencimiento} />
                                    </div>
                                    <div className="col-6 " >
                                        Asesor:
                                        <br />
                                        <select className='rounded' onChange={cambioAsesor} value={prest.asesor} name="asesor">
                                            {params.users.length > 0 ?
                                                params.users.map((item, index) => {
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
                                <input type="hidden" style={{ width: '8em' }} name="tt_abonos" value={prest.tt_abonos} />
                                <input type="hidden" style={{ width: '8em' }} name="tt_saldo" value={prest.tt_saldo} />
                            </form>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <SecondaryButton type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</SecondaryButton>
                        <ActiveButton onClick={validar} type='button' id="btnIngresarPrestAmort" className="btn btn-success">Ingresar préstamo</ActiveButton>
                        <ActiveButton id='btnLoadingPrestAmort' style={{ display: 'none', backgroundColor: 'gray' }} type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </ActiveButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrestamoAmortizado