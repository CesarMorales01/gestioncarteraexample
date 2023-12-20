import React, { useState, useEffect } from 'react'
import GlobalFunctions from '../services/GlobalFunctions'
import '../../../css/general.css'

const DialogoIngresoCaja = (params) => {
    const glob = new GlobalFunctions()
    const [noDatos, setNoDatos] = useState(true)
    const [cargar, setCargar] = useState(false)
    const [caja, setCaja] = useState({
        Cobro: params.Cobro,
        fecha: glob.getFecha(),
        cobrado: 0,
        otros_ingresos: 0,
        comentario_ingresos: "",
        total_ingresos: 0,
        prestado: 0,
        otros_gastos: 0,
        comentario_egresos: "",
        total_egresos: 0,
        entradas_neto: 0,
        total_caja: 0
    })

    useEffect(() => {
        sincronizarDatos()
        //Otro metodo porque el metodo calcular no alcanza a cargar los valores de sincronizarDatos....
        calcularInicial()
    }, [])

    useEffect(() => {
        if (cargar) {
            calcular()
            setCargar(false)
        }
    }, [caja])

    function calcularInicial() {
        const totalI = parseInt(params.autofill.cobrado) + parseInt(caja.otros_ingresos)
        const totalE = parseInt(params.autofill.prestado) + parseInt(params.autofill.gastos)
        const neto = parseInt(totalI) - parseInt(totalE)
        const totalC = parseInt(params.autofill.total_caja) + parseInt(neto)
        setCaja((valores) => ({
            ...valores,
            total_ingresos: totalI,
            total_egresos: totalE,
            entradas_neto: neto,
            total_caja: totalC
        }))
    }

    function calcular() {
        const totalI = parseInt(caja.cobrado) + parseInt(caja.otros_ingresos)
        const totalE = parseInt(caja.prestado) + parseInt(caja.otros_gastos)
        const neto = parseInt(totalI) - parseInt(totalE)
        const totalC = parseInt(params.autofill.total_caja) + parseInt(neto)
        setCaja((valores) => ({
            ...valores,
            total_ingresos: totalI,
            total_egresos: totalE,
            entradas_neto: neto,
            total_caja: totalC
        }))
    }

    function sincronizarDatos() {
        setCaja((valores) => ({
            ...valores,
            cobrado: params.autofill.cobrado,
            prestado: params.autofill.prestado,
            otros_gastos: params.autofill.gastos
        }))
    }

    function reiniciarDatos() {
        setCaja((valores) => ({
            ...valores,
            cobrado: 0,
            prestado: 0,
            otros_gastos: 0
        }))
        setCargar(true)
    }

    function cambioNoDatos() {
        if (noDatos) {
            reiniciarDatos()
            setNoDatos(false)
        } else {
            sincronizarDatos()
            setNoDatos(true)
        }
        setCargar(true)
    }

    function cambioFecha(event) {
        setCaja((valores) => ({
            ...valores,
            fecha: event.target.value
        }))
    }

    function cambioCobrado(event) {
        setCaja((valores) => ({
            ...valores,
            cobrado: event.target.value == '' ? 0 : event.target.value
        }))
        setCargar(true)
    }

    function cambioOtrosIngresos(event) {
        setCaja((valores) => ({
            ...valores,
            otros_ingresos: event.target.value == '' ? 0 : event.target.value
        }))
        setCargar(true)
    }

    function cambioComentarioIngresos(event) {
        setCaja((valores) => ({
            ...valores,
            comentario_ingresos: event.target.value
        }))
    }

    function cambioPrestado(event) {
        setCaja((valores) => ({
            ...valores,
            prestado: event.target.value == '' ? 0 : event.target.value
        }))
        setCargar(true)
    }

    function cambioGastos(event) {
        setCaja((valores) => ({
            ...valores,
            otros_gastos: event.target.value == '' ? 0 : event.target.value
        }))
        setCargar(true)
    }

    function cambioComentarioEgresos(event) {
        setCaja((valores) => ({
            ...valores,
            comentario_egresos: event.target.value
        }))
    }

    function enviarForm(){
       document.getElementById('btnEnviar').style.display='none' 
       document.getElementById('btnLoading').style.display=''
       document.getElementById('Form_ingresar').submit()  
    }

    return (
        <div id='modalIngresoCaja' className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 style={{ fontSize: '1.2em', marginLeft: '0.5em', textAlign: 'center' }} className="modal-title">Ingreso caja</h1>
                        <button type="button" data-dismiss="modal">
                            <svg style={{ color: 'red' }} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-x-square" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </button>
                    </div>
                    <div className="container-fluid">
                        <form method="post" action={route('caja.store')} id="Form_ingresar">
                            <div style={{ textAlign: 'center', marginTop: '0.5em' }} className="row justify-content-center">
                                <div className="col-4"  >
                                    <button type='button' className={noDatos ? 'btn btn-outline-primary' : 'btn btn-outline-success'} onClick={cambioNoDatos} style={{ marginTop: '1.6em' }}>
                                        {noDatos ? 'No sinc valores de hoy' : 'Sinc valores de hoy'}
                                        <i style={{ marginLeft: '0.5em' }} className="fa-solid fa-rotate fa-lg"></i>
                                    </button>
                                </div>
                                <div className="col-4" >
                                    Cobrado:
                                    <br />
                                    <input className='rounded' type="number" style={{ width: '8em' }} onChange={cambioCobrado} name="cobrado" value={caja.cobrado} />
                                </div>
                                <div className="col-4 "  >
                                    Otros ingresos:
                                    <br />
                                    <input className='rounded' type="number" style={{ width: '8em' }} onChange={cambioOtrosIngresos} name="otros_ingresos" value={caja.otros_ingresos} />
                                </div>
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '0.5em' }} className="row justify-content-center" >
                                <div className="col-4 "  >
                                    Total ingresos:
                                    <br />
                                    <input className='rounded' style={{ width: '8em' }} type="number" readOnly name="total_ingresos" value={caja.total_ingresos} />
                                </div>
                                <div className="col-8 " >
                                    Comentario ingresos:
                                    <br />
                                    <textarea className='rounded' rows={'1'} type="text" onChange={cambioComentarioIngresos} name="comentario_ingresos" value={caja.comentario_ingresos} />
                                </div>
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '0.5em' }} className="row justify-content-center" >
                                <div className="col-4 " >
                                    Prestado:
                                    <br />
                                    <input className='rounded' type="number" style={{ width: '8em' }} onChange={cambioPrestado} name="prestado" value={caja.prestado} />
                                </div>
                                <div className="col-4 "  >
                                    Gastos:
                                    <br />
                                    <input className='rounded' type="number" style={{ width: '8em' }} onChange={cambioGastos} name="otros_gastos" value={caja.otros_gastos == null ? '' : caja.otros_gastos} />
                                </div>
                                <div className="col-4 " >
                                    Total egresos:
                                    <br />
                                    <input className='rounded' type="number" style={{ width: '8em' }} readOnly name="total_egresos" value={caja.total_egresos} />
                                </div>
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '0.5em' }} className="row justify-content-center" >
                                <div className="col-8 " >
                                    Comentario egresos:
                                    <br />
                                    <textarea className='rounded' rows={'1'} type="text" onChange={cambioComentarioEgresos} name="comentario_egresos" value={caja.comentario_egresos} />
                                </div>
                                <div className="col-4 "  >
                                    Ingresos neto
                                    <br />
                                    <input className='rounded' type="number" style={{ width: '8em' }} name="entradas_neto" size='20' readOnly value={caja.entradas_neto} />
                                </div>
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '0.5em' }} className="row justify-content-center" >
                                <div className="col-4 " >
                                    Total caja:
                                    <br />
                                    <input className='rounded' type="number" style={{ width: '8em' }} name="total_caja" readOnly value={caja.total_caja} />
                                </div>
                                <div className="col-4" >
                                    Fecha:
                                    <br />
                                    <input className='rounded' style={{ width: '9em' }} onChange={cambioFecha} type="date" name="fecha" value={caja.fecha} />

                                </div>
                                <div className="col-4" >
                                    <button id='btnEnviar' type='button' onClick={enviarForm} style={{ marginTop: '1.6em' }} className='btn btn-success btnVerde'>Ingresar registro</button>
                                    <button id='btnLoading' style={{ marginTop: '1.6em', display: 'none', backgroundColor: 'gray', marginLeft: '0.5em' }} className="btn btn-primary" type="button" disabled>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Loading...
                                    </button>
                                </div>
                            </div>
                            <br></br>
                            <input type="hidden" name="Cobro" defaultValue={params.cartera} />
                            <input type="hidden" name='_token' value={params.token} />
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default DialogoIngresoCaja