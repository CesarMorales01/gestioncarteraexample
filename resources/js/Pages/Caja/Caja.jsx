import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react'
import GlobalFunctions from '../services/GlobalFunctions'
import '../../../css/general.css'
import Swal from 'sweetalert2'
import DialogoLoading from '../UIGeneral/DialogoLoading'

import DialogoIngresoCaja from './DialogoIngresoCaja';

const Caja = (params) => {
    const glob = new GlobalFunctions()

    function buscarActive(e) { }

    function abrirModalIngresoCaja() {
        document.getElementById('btnModalIngresoCaja').click()
    }

    function confirmarBorrar(id) {
        Swal.fire({
            title: '¿Eliminar registro ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        }).then((result) => {
            if (result.isConfirmed) {
                loading()
                document.getElementById('formEliminar' + id).submit()
            }
        })
    }

    function loading() {
        document.getElementById('btnModalLoading').click()
    }

    function validarPermisoEliminar(fecha) {
        let mostrar = 'none'
        if (params.auth.role[0] == 'Administrador') {
            mostrar = ''
        } else {
            if (glob.formatFecha(fecha) == glob.getFecha()) {
                mostrar = ''
            }
        }
        return mostrar
    }

    return (
        <AuthenticatedLayout
            user={params.auth}
            clientes={params.clientes}
            globalVars={params.globalVars}
            buscarActive={buscarActive}
        >
            <Head title="Caja" />
            <h1 style={{ fontSize: '1.2em', marginTop: '0.5em' }} id="titulo" className="text-center">Caja {params.caja.cartera}</h1>
            <div className='container'>
                <div style={{ marginTop: '0.2em' }} align="center" className="row justify-content-center">
                    <div style={{ marginTop: '0.8em' }} className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6"  >
                            <button type='button' className='btn btn-success btnVerde' onClick={abrirModalIngresoCaja}>Nuevo ingreso
                                <i style={{ marginLeft: '0.5em' }} className="fa-solid fa-square-plus fa-lg"></i>
                            </button>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6"  >
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: '0.5em', margin: '0.6em', maxHeight: window.screen.width > 600 ? '434px' : '' }} className="table-responsive">
                <table style={{ marginTop: '0.4em', textAlign: 'center' }} className="table table-striped">
                    <thead >
                        <tr className='align-middle' >
                            <th style={{ color: 'white' }} className="navBarFondo rounded">Fecha</th>
                            <th style={{ color: 'white' }} className="navBarFondo rounded">Cobrado</th>
                            <th style={{ color: 'white' }} className="navBarFondo rounded">Otros ingresos</th>
                            <th style={{ color: 'white' }} className="navBarFondo rounded">Observaciones</th>
                            <th style={{ color: 'white' }} className="navBarFondo rounded">Total ingresos</th>
                            <th style={{ color: 'white' }} className="navBarFondo rounded">Prestado</th>
                            <th style={{ color: 'white' }} className="navBarFondo rounded">Gastos</th>
                            <th style={{ color: 'white' }} className="navBarFondo rounded">Observaciones</th>
                            <th style={{ color: 'white' }} className="navBarFondo rounded">Total egresos</th>
                            <th style={{ color: 'white' }} className="navBarFondo rounded">Ingreso neto</th>
                            <th style={{ color: 'white' }} className="navBarFondo rounded">Total caja</th>
                            <th style={{ color: 'white' }} className="navBarFondo rounded">Asesor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {params.caja.caja.map((item, index) => {
                            return (
                                <tr className='align-middle' key={index}>
                                    <td>{item.fecha}</td>
                                    <td>{glob.formatNumber(item.cobrado)}</td>
                                    <td>{glob.formatNumber(item.otros_ingresos)}</td>
                                    <td>{item.comentario_ingresos}</td>
                                    <td>{glob.formatNumber(item.total_ingresos)}</td>
                                    <td>{glob.formatNumber(item.prestado)}</td>
                                    <td>{glob.formatNumber(item.otros_gastos)}</td>
                                    <td>{item.comentario_egresos}</td>
                                    <td>{glob.formatNumber(item.total_egresos)}</td>
                                    <td>{glob.formatNumber(item.entradas_neto)}</td>
                                    <td>{glob.formatNumber(item.total_caja)}</td>
                                    <td style={{ whiteSpace: 'nowrap' }}>
                                        <form method="get" id={"formEliminar" + item.id} action={route('caja.show', item.id)} >
                                            <input type="hidden" name="id" value={item.id} />
                                            <input type="hidden" name="Cobro" value={params.caja.cartera} />
                                            <span style={{ marginRight: '0.4em' }}>{item.asesor}</span>
                                            <button type='button' style={{  display: validarPermisoEliminar(item.fecha) }} id={'btnEliminar' + item.id} onClick={() => confirmarBorrar(item.id)} className='btn btn-danger btn-sm'>
                                                <i style={{ color: 'black' }} className="fa-regular fa-trash-can fa-lg"></i>
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <button type="button" id='btnModalIngresoCaja' style={{ display: 'none' }} data-toggle="modal" data-target="#modalIngresoCaja"></button>
            <DialogoIngresoCaja cartera={params.caja.cartera} autofill={params.caja.autofill} token={params.token}></DialogoIngresoCaja>
            <button id='btnModalLoading' type="button" style={{ display: 'none' }} data-toggle="modal" data-target="#modalLoading">
            </button>
            <DialogoLoading url={params.globalVars.myUrl}></DialogoLoading>
        </AuthenticatedLayout>
    )
}

export default Caja