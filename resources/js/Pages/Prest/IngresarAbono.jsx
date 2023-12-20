import React from 'react'
import { useState, useEffect } from 'react';
import GlobalFunctions from '../services/GlobalFunctions'
import SecondaryButton from '@/Components/SecondaryButton'
import Swal from 'sweetalert2'
import ActiveButton from '@/Components/ActiveButton'

const DialogoIngresarAbono = (params) => {
    const glob = new GlobalFunctions()
    const [abono, setAbono] = useState({
        valor: params.cuota.valor_cuotas,
        fecha: '',
        fingreso: '',
        cliente: params.cliente,
        altura: ''
    })

    useEffect(() => {
        fechaHoy()
        if (abono.altura == '') {
            setAlturaCuota()
        }
    }, [])

    function setAlturaCuota() {
        let n = 0;
        params.abonos.forEach(element => {
            if (n < element.altura_cuota) {
                n = element.altura_cuota
            }
        });
        setAbono((valores) => ({
            ...valores,
            altura: n + 1
        }))
    }

    function fechaHoy() {
        if (abono.fecha === '') {
            setAbono((valores) => ({
                ...valores,
                fecha: glob.getFecha(),
                fingreso: glob.getFecha()
            }))
        }
    }

    function cambioValor(e) {
        setAbono((valores) => ({
            ...valores,
            valor: e.target.value
        }))
    }

    function cambioFecha(e) {
        setAbono((valores) => ({
            ...valores,
            fecha: e.target.value
        }))
    }

    function cambioNCuota(e) {
        setAbono((valores) => ({
            ...valores,
            altura: e.target.value
        }))
    }

    function validarDatos(e) {
        e.preventDefault()
        if (abono.valor <= 0 || abono.altura == '') {
            alertDatosFaltantes('Faltan datos importantes!')
        } else {
            if(params.cuota.tt_saldo<abono.valor){
                alertDatosFaltantes('El abono es mayor que el saldo!')
            }else{
                loadinOn()
                document.getElementById('formAbono').submit()
            } 
        }
    }

    function loadinOn(){
        document.getElementById('btnIngresar').style.display='none'
        document.getElementById('btnLoading').style.display=''
    }

    function alertDatosFaltantes(mensaje) {
        Swal.fire({
            title: mensaje,
            icon: 'warning',
            timer: 1000
        })
    }

    return (
        <div className="modal border" tabIndex="-1" id='dialogoIngresarAbono' role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 style={{ fontSize: '1.2em', marginLeft: '0.5em' }} className="modal-title">Ingresar Abono</h1>
                    </div>
                    <div className='container' style={{ margin: '0.2em' }}>
                        <form method="POST" id="formAbono" onSubmit={validarDatos} action={route('abonos.store')} >
                            <input type="hidden" name='_token' value={params.token} />
                            <input type="hidden" name='cliente' value={params.cliente} />
                            <input type="hidden" name='fingreso' value={abono.fingreso} />
                            <input name='valor' onChange={cambioValor} className='form-control' type="number" placeholder='Valor abono' value={abono.valor} />
                            <br />
                            <label>Fecha:</label>
                            <br />
                            <input name='fecha' type="date" value={abono.fecha} className='form-control' onChange={cambioFecha} id="inputDate" />
                            <br />
                            <label>Cuota N°:</label>
                            <input name='altura' onChange={cambioNCuota} className='form-control' type="number" placeholder='Altura cuota' value={abono.altura} />
                            <div className="modal-footer">
                                <SecondaryButton type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</SecondaryButton>
                                <ActiveButton type='submit' id="btnIngresar" className="btn btn-success">Ingresar abono</ActiveButton>
                                <ActiveButton id='btnLoading' style={{ display: 'none', backgroundColor: 'gray' }} type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Loading...
                                </ActiveButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DialogoIngresarAbono