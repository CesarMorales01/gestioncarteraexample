import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react'
import GlobalFunctions from '../services/GlobalFunctions'
import '../../../css/general.css'
import DialogoIngresarAbono from '../Prest/IngresarAbono';
import Swal from 'sweetalert2'
import IngresarPrest from '../Prest/IngresarPrest';
import MakeDiscount from '../Prest/MakeDiscount';
import DialogoLoading from '../UIGeneral/DialogoLoading';
import DialogoMostrarTelefonos from './DialogoMostrarTelefonos';

export default function Client(params) {

    const glob = new GlobalFunctions()
    const [permisos, setPermisos] = useState([])
    const [searchActive, setSearchActive] = useState(false)

    useEffect(() => {
        setPermisos(glob.cargarPermisos(params.auth.permissions))
    }, [])

    useEffect(() => {
        const keyDownHandler = event => {
            if (event.key == 'a' && searchActive != true) {
                document.getElementById('btnDialogoAbono').click()
            }
            if (event.key == 'p' && searchActive != true) {
                document.getElementById('btnDialogoPrestamo').click()
            }
        }
        document.addEventListener('keydown', keyDownHandler);
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        }
    });

    function setSizeText(id) {
        const text = document.getElementById(id)
        const letras = text.value
        const size = Math.round(letras.length / 44)
        text.rows = size + 1
    }

    function defaultSize(id) {
        document.getElementById(id).rows = "1"
    }

    function checkColorMora() {
        let color = ''
        if (params.prest != null && parseInt(params.prest.cuotasenmora) > 0) {
            color = '#c93c20'
        }
        return color
    }

    function checkColorVencimiento() {
        let color = ''
        if (params.prest != null && parseInt(params.prest.validarVencimiento) < 0) {
            color = '#c93c20'
        }
        return color
    }

    function confirmarEliminar(item) {
        Swal.fire({
            title: '¿Desea eliminar abono de $' + glob.formatNumber(item.valor_abono) + ' ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById('formEliminarAbono' + item.id).submit()
            }
        })
    }

    function mostrarEliminar(item) {
        let mostrar = ''
        if (params.auth.role != 'Administrador') {
            if (item.fecha != glob.getFecha()) {
                mostrar = 'none'
            }
            if (item.asesor != params.auth.name) {
                mostrar = 'none'
            }
        }
        return mostrar
    }

    function dialogoEliminarPrest() {
        Swal.fire({
            title: '¿Desea eliminar  prestamo y abonos de ' + params.cliente.nombre + ' ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        }).then((result) => {
            if (result.isConfirmed) {
                loading()
                const url = params.globalVars.myUrl + "prest/" + params.cliente.cedula + "/edit"
                window.location = url
            }
        })
    }

    function buscarActive(e) {
        setSearchActive(e)
    }

    function confirmarGuardarHisto() {
        Swal.fire({
            title: '¿Guardar una copia de préstamo de ' + params.cliente.nombre + ' ?',
            icon: 'info',
            confirmButtonText: 'Guardar',
            confirmButtonColor: 'green',
            cancelButtonColor: '#3085d6',
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                loading()
                window.location = params.globalVars.urlRoot + "Guardar_historial_web.php?cedula=" + params.cliente.cedula
            }
        })
    }

    function GoHisto() {
        const url = params.globalVars.urlRoot + 'Ver_historial.php?cedula=' + params.cliente.cedula + '&nombre=' + params.cliente.nombre
        window.open(url, "nuevo", "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=800, height=600");
    }

    function goRevisado() {
        const url = params.globalVars.urlRoot + 'Form_marcar_revisado.php?cedula=' + params.cliente.cedula + '&nombre=' + params.cliente.nombre+'&Cobro='+params.cliente.Cobro+'&asesor='+params.auth.name
        window.open(url, "nuevo", "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=800, height=600");
    }

    function loading() {
        document.getElementById('btnModalLoading').click()
        setTimeout(() => {
            document.getElementById('btnModalLoading').click()
        }, 3000);
    }

    return (
        <AuthenticatedLayout
            user={params.auth}
            clientes={params.clientes}
            globalVars={params.globalVars}
            buscarActive={buscarActive}
        >
            <Head title="Detalle cuenta" />
            <div className="py-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="table-responsive">
                            <table style={{ marginTop: '0.4em' }} className="table table-sm">
                                <thead >
                                    <tr className='align-middle' >
                                        <th colSpan="4" style={{ color: 'white' }} className="navBarFondo rounded">Cliente</th>
                                    </tr>
                                    <tr className='align-middle' >
                                        <th className="fondoCelda centerCelda rounded">Nombre</th>
                                        <th >{params.cliente.nombre} {params.cliente.apellidos != '' ? params.cliente.apellidos : ''}</th>
                                        <th className="fondoCelda centerCelda rounded">Cedula</th>
                                        <th >{params.cliente.cedula}</th>
                                    </tr>
                                    <tr className='align-middle' >
                                        <th className="fondoCelda centerCelda rounded" >Dirección</th>
                                        <th >
                                            <div>
                                                <textarea className='rounded' readOnly cols='26' onMouseOut={() => defaultSize('dir' + params.cliente.cedula)} onMouseOver={() => setSizeText('dir' + params.cliente.cedula)} id={'dir' + params.cliente.cedula} value={params.cliente.direccion} rows='1'></textarea>
                                            </div>
                                        </th>
                                        <th className="fondoCelda centerCelda rounded">Telefonos</th>
                                        <th >
                                            <div>
                                                {params.cliente.telefonos.length > 2 ?
                                                    <li>{params.cliente.telefonos[0]} <button data-toggle="modal" data-target="#dialogoMostrarTelefonos" className='btn btn-link'>y otros...</button></li>
                                                    :
                                                    params.cliente.telefonos.map((item, index) => {
                                                        return (
                                                            <li key={index}>{item}</li>
                                                        )
                                                    })}
                                            </div>
                                        </th>
                                    </tr>
                                    <tr className='align-middle' >
                                        <th className="fondoCelda centerCelda rounded" >Dir trabajo</th>
                                        <th >
                                            <div>
                                                <textarea className='rounded' readOnly cols='26' onMouseOut={() => defaultSize('dirtra' + params.cliente.cedula)} onMouseOver={() => setSizeText('dirtra' + params.cliente.cedula)} id={'dirtra' + params.cliente.cedula} value={params.cliente.direccion_trabajo == '' || params.cliente.direccion_trabajo == null ? '' : params.cliente.direccion_trabajo} rows='1'></textarea>
                                            </div>
                                        </th>
                                        <th className="fondoCelda centerCelda rounded">Tel trabajo</th>
                                        <th >
                                            <div>
                                                <textarea className='rounded' readOnly cols='26' onMouseOut={() => defaultSize('teltra' + params.cliente.cedula)} onMouseOver={() => setSizeText('teltra' + params.cliente.cedula)} id={'teltra' + params.cliente.cedula} value={params.cliente.telefono_trabajo == '' || params.cliente.telefono_trabajo == null ? '' : params.cliente.telefono_trabajo} rows='1'></textarea>
                                            </div>
                                        </th>
                                    </tr>
                                    <tr className='align-middle' >
                                        <th className="fondoCelda centerCelda rounded" >Cartera</th>
                                        <th >{params.cliente.Cobro}</th>
                                        <th className="fondoCelda centerCelda rounded">Comentarios</th>
                                        <th >
                                            <div>
                                                <textarea className='rounded' readOnly cols='26' onMouseOut={() => defaultSize('otros' + params.cliente.cedula)} onMouseOver={() => setSizeText('otros' + params.cliente.cedula)} id={'otros' + params.cliente.cedula} value={params.cliente.otro_rifa == '' || params.cliente.otro_rifa == null ? '' : params.cliente.otro_rifa} rows='1'></textarea>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>

                            </table>
                        </div>
                        {/* Tabla acciones */}
                        <div className="container">
                            <table className="table table-sm ">
                                <thead >
                                    <tr className='align-middle' >
                                        <th colSpan="6" style={{ color: 'white' }} className="rounded navBarFondo">Acciones</th>
                                    </tr>
                                    <tr className='align-middle' >
                                        <th className="centerCelda">
                                            <button id='btnDialogoAbono' data-toggle="modal" data-target="#dialogoIngresarAbono" disabled={params.prest != null ? false : true} style={{ backgroundColor: 'green', color: 'white', display: permisos.includes('ingresar-abono') ? '' : 'none' }} className='btn btn-sm'>
                                                Ingresar abono
                                            </button>
                                        </th>
                                        <th className="centerCelda">
                                            <button id='btnDialogoPrestamo' disabled={params.prest != null ? true : false} style={{ backgroundColor: 'green', color: 'white', display: permisos.includes('ingresar-prest') ? '' : 'none' }} className='btn btn-sm' type="button" data-toggle="modal" data-target="#prestamoModal">
                                                Ingresar préstamo
                                            </button>
                                        </th>
                                        <th className="centerCelda">
                                            <a onClick={GoHisto} className='btn btn-primary btn-sm'>
                                                Ver historial
                                            </a>
                                            <button onClick={goRevisado} style={{ marginLeft: '1em', display: 'none' }} className='btn btn-outline-primary btn-sm'>
                                                <i className="fa-solid fa-check-double fa-lg"></i>
                                            </button>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className="centerCelda">
                                            <button onClick={() => confirmarGuardarHisto()} className='btn btn-primary btn-sm' disabled={params.prest != null ? false : true} style={{ display: permisos.includes('guardar-historial') ? '' : 'none' }}>
                                                Guardar en historial
                                            </button>
                                        </th>
                                        <th className="centerCelda">
                                            <a onClick={loading} href={route('client.show', params.cliente.cedula)} className='btn btn-primary btn-sm' style={{ display: permisos.includes('editar-cliente') ? '' : 'none' }}>
                                                Editar info cliente
                                            </a>
                                        </th>
                                        <th className="centerCelda">
                                            <button onClick={dialogoEliminarPrest} disabled={params.prest != null ? false : true} style={{ color: 'white', fontSize: '0.8em', display: permisos.includes('eliminar-prest') ? '' : 'none' }} className='btn btn-danger btn-sm'>
                                                Eliminar prést y abonos
                                            </button>
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        {/* Tabla prestamo */}
                        <div className="table-responsive ">
                            <table className="table table-sm">
                                <thead >
                                    <tr className='align-middle' >
                                        <th colSpan="6" style={{ color: 'white' }} className="rounded navBarFondo">Préstamo</th>
                                    </tr>
                                    <tr className='align-middle' >
                                        <th className="fondoCelda centerCelda rounded">Fecha préstamo</th>
                                        <th className='centerCelda'>{params.prest == null ? '' : params.prest.fecha_prest}</th>
                                        <th className="fondoCelda centerCelda rounded">Valor préstamo</th>
                                        <th className='centerCelda'>{params.prest == null ? '' : glob.formatNumber(params.prest.valorprestamo)}</th>
                                        <th className="fondoCelda centerCelda rounded">N° cuotas</th>
                                        <th className='centerCelda'>{params.prest == null ? '' : params.prest.n_cuotas}</th>
                                    </tr>
                                    <tr className='align-middle' >
                                        <th className="fondoCelda centerCelda rounded">Valor cuotas</th>
                                        <th className='centerCelda'>{params.prest == null ? '' : glob.formatNumber(params.prest.valor_cuotas)}</th>
                                        <th className="fondoCelda centerCelda rounded">Periodicidad</th>
                                        <th className='centerCelda'>{params.prest == null ? '' : params.prest.periodicidad}</th>
                                        <th className="fondoCelda centerCelda rounded">Tiempo (meses)</th>
                                        <th className='centerCelda'>{params.prest == null ? '' : params.prest.tiempo_meses}</th>
                                    </tr>
                                    <tr className='align-middle' >
                                        <th className="fondoCelda centerCelda rounded">Total a pagar</th>
                                        <th className='centerCelda rounded' >{params.prest == null ? '' : glob.formatNumber(params.prest.totalapagar)}</th>
                                        <th className="fondoCelda centerCelda rounded">Total abonos</th>
                                        <th className='centerCelda'>{params.prest == null ? '' : glob.formatNumber(params.prest.tt_abonos)}</th>
                                        <th className="fondoCelda centerCelda rounded">Cuotas en mora</th>
                                        <th className='rounded centerCelda' style={{ backgroundColor: checkColorMora() }}>{params.prest == null ? '' : params.prest.cuotasenmora}</th>
                                    </tr>
                                    <tr className='align-middle' >
                                        <th className="fondoCelda centerCelda rounded">Vencimiento</th>
                                        <th className='rounded centerCelda' style={{ backgroundColor: checkColorVencimiento() }}>{params.prest == null ? '' : params.prest.vencimiento}</th>
                                        <th className="fondoCelda centerCelda rounded">Saldo</th>
                                        <th className='centerCelda'>{params.prest == null ? '' : glob.formatNumber(params.prest.tt_saldo)}</th>
                                        <th className="centerCelda rounded">
                                            <button disabled={params.prest == null ? true : false} style={{ backgroundColor: 'green', color: 'white' }} className='btn btn-sm' type="button" data-toggle="modal" data-target="#discountModal">
                                                Calcular descuento
                                            </button>
                                        </th>
                                        <th className="fondoCelda centerCelda rounded">
                                            <button disabled={params.prest == null ? true : false} style={{ backgroundColor: 'green', color: 'white', display: permisos.includes('editar-prest') ? '' : 'none' }} className='btn btn-sm' type="button" data-toggle="modal" data-target="#prestamoModal">
                                                Editar préstamo
                                            </button>
                                        </th>
                                    </tr>

                                </thead>
                            </table>
                        </div>
                        {/* Tabla abonos */}
                        <div className="table-responsive">
                            <table className="table table-sm">
                                <thead >
                                    <tr className='align-middle' >
                                        <th colSpan="6" style={{ color: 'white' }} className="rounded navBarFondo">Abonos</th>
                                    </tr>
                                    <tr className='align-middle' >
                                        <th className="fondoCelda centerCelda rounded">Fecha</th>
                                        <th className="fondoCelda centerCelda rounded">Cuota n°</th>
                                        <th className="fondoCelda centerCelda rounded">Abono</th>
                                        <th className="fondoCelda centerCelda rounded">Asesor</th>
                                        <th className="fondoCelda centerCelda rounded"><span style={{ display: permisos.includes('eliminar-prest') ? '' : 'none' }}>Eliminar</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {params.abonos.map((item) => {
                                        return (
                                            <tr key={item.id} className='centerCelda'>
                                                <th>{item.fecha}</th>
                                                <td>{item.altura_cuota}</td>
                                                <td>{glob.formatNumber(item.valor_abono)}</td>
                                                <td>{item.asesor}</td>
                                                <td>
                                                    <form method="POST" id={"formEliminarAbono" + item.id} action={route('abonos.deleteone')}>
                                                        <input type="hidden" name='_token' value={params.token} />
                                                        <input type="hidden" name='id' value={item.id} />
                                                    </form>
                                                    <button onClick={() => confirmarEliminar(item)} style={{ display: mostrarEliminar(item) }} className='btn btn-sm'>
                                                        <svg style={{ color: 'red' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <DialogoIngresarAbono token={params.token} abonos={params.abonos} cuota={params.prest != null ? params.prest : ''} cliente={params.cliente.cedula}></DialogoIngresarAbono>
                <IngresarPrest cliente={params.cliente} prest={params.prest != null ? params.prest : ''} globalVars={params.globalVars} permisos={permisos} token={params.token}></IngresarPrest>
                <MakeDiscount prest={params.prest}></MakeDiscount>
                <button id='btnModalLoading' type="button" style={{ display: 'none' }} data-toggle="modal" data-target="#modalLoading">
                </button>
                <DialogoLoading url={params.globalVars.myUrl}></DialogoLoading>
                <DialogoMostrarTelefonos telefonos={params.cliente.telefonos}></DialogoMostrarTelefonos>
            </div>
        </AuthenticatedLayout>
    );
}