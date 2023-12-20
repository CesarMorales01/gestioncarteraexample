import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react'
import GlobalFunctions from '../services/GlobalFunctions'
import '../../../css/general.css'
import Swal from 'sweetalert2'
import DialogoLoading from '../UIGeneral/DialogoLoading';
import newLogo from '../../../../public/Images/Config/plus.png'
import DialogoNuevaCartera from './DialogoNuevaCartera';

const Carteras = (params) => {

    useEffect(() => {
        if (params.state != 'nothing') {
            sweetAlert(params.state)
        }
    }, [])

    function buscarActive(e) { }

    function sweetAlert(mensaje) {
        Swal.fire({
            title: mensaje,
            icon: params.state.includes('elimin') ? 'warning' : 'success',
            timer: params.state.includes('elimin') ? 2000 : 1000
        })
    }

    function abrirDialogoNuevaCartera() {
        document.getElementById('btnDialogoNuevaCartera').click()
    }

    function confirmarBorrar(item) {
        Swal.fire({
            title: '¿Eliminar cartera ' + item.Nombre + ' ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById('btnModalLoading').click()
                document.getElementById('formEliminar' + item.id).submit()
            }
        })
    }

    function goEditar(id) {
        Swal.fire({
            title: 'Para cambiar el nombre a una cartera puedes comunicarte con servicio técnico.',
            icon: 'success',
            timer: 2000
        })
    }

    return (
        <AuthenticatedLayout
            user={params.auth}
            clientes={params.clientes}
            globalVars={params.globalVars}
            buscarActive={buscarActive}
        >
            <Head title="Carteras" />
            <div className="py-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className='container'>
                            <div style={{ marginTop: '0.2em' }} align="center" className="row justify-content-center">
                                <div style={{ marginTop: '0.8em' }} className="row">
                                    <div onClick={abrirDialogoNuevaCartera} className="col-lg-4 col-md-6 col-sm-6 col-6"  >
                                        <div className="card border border-primary card-flyer pointer">
                                            <img style={{ width: '8em', height: '4em', marginTop: '1em' }} src={newLogo} className="card-img-top img-fluid centerImg" alt="" />
                                            <h2 style={{ marginTop: '0.2em' }} className="card-title titulo">Nueva cartera</h2>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-6 col-6"  >
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginTop: '0.5em' }} className='table-responsive'>
                                <table className="table table-striped table-sm roundedTable">
                                    <thead className='navBarFondo align-middle'>
                                        <tr>
                                            <th style={{ textAlign: 'center' }} scope="col">Cartera</th>
                                            <th style={{ textAlign: 'center' }} scope="col">Editar</th>
                                            <th style={{ textAlign: 'center' }} scope="col">Eliminar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {params.carteras.length == 0 ?
                                            <tr style={{ marginTop: '1.5em' }} className='container'><td colSpan='6'>No se han encontrado resultados....</td></tr>
                                            :
                                            params.carteras.map((item, index) => {
                                                return (
                                                    <tr style={{ textAlign: 'center' }} key={index}>
                                                        <th>{item.Nombre}</th>
                                                        <th>
                                                            <button onClick={() => goEditar(item.id)} className='border' style={{ cursor: 'pointer' }} >
                                                                <svg style={{ padding: '0.2em', backgroundColor: '#127b38' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-fill rounded" viewBox="0 0 16 16">
                                                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                                                </svg>
                                                            </button>
                                                        </th>
                                                        <th >
                                                            <form method="get" id={"formEliminar" + item.id} action={route('carteras.show', item.id)} >
                                                                <input type='hidden' name='cartera' value={item.Nombre}></input>
                                                                <input type='hidden' name='id' value={item.id}></input>
                                                            </form>
                                                            <button id={'btnEliminarIngreso' + item.id} onClick={() => confirmarBorrar(item)} className='border border-dark rounded cursorPointer' style={{ padding: '0.2em', backgroundColor: 'red', display: item.precio === 0 ? 'none' : 'inline' }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                                </svg>
                                                            </button>
                                                            <div >
                                                                <span id={'loadingIngreso' + item.id} style={{ display: 'none' }} className="spinner-border text-danger" role="status" aria-hidden="true"></span>
                                                            </div>
                                                        </th>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" id='btnDialogoNuevaCartera' style={{ display: 'none' }} data-toggle="modal" data-target="#dialogoNuevaCartera"></button>
            <DialogoNuevaCartera token={params.token}></DialogoNuevaCartera>
            <button id='btnModalLoading' type="button" style={{ display: 'none' }} data-toggle="modal" data-target="#modalLoading">
            </button>
            <DialogoLoading url={params.globalVars.myUrl}></DialogoLoading>
        </AuthenticatedLayout>
    )
}

export default Carteras