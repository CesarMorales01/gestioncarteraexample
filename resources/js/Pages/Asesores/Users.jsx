import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react'
import GlobalFunctions from '../services/GlobalFunctions'
import '../../../css/general.css'
import Swal from 'sweetalert2'
import DialogoLoading from '../UIGeneral/DialogoLoading';
import newLogo from '../../../../public/Images/Config/plus.png'
import DialogoNuevoAsesor from './DialogoNuevoAsesor';
import DialogoHabilitarCarteras from './DialogoHabilitarCarteras';

const Users = (params) => {

    const [asesorEdit, setAsesorEdit] = useState({
        'id': ''
    })
    useEffect(() => {
        if (params.state != 'nothing') {
            sweetAlert(params.state)
        }
    }, [])

    function buscarActive(e) { }

    function sweetAlert(mensaje) {
        Swal.fire({
            title: mensaje,
            icon: params.state.includes('elimin') || params.state.includes('asociado') ? 'warning' : 'success',
            timer: params.state.includes('elimin') || params.state.includes('asociado') ? 2000 : 1000
        })
    }

    function abrirDialogoNuevoUsuario() {
        setAsesorEdit({
            'id': ''
        })
        setTimeout(() => {
            document.getElementById('btnDialogoNuevoAsesor').click()
        }, 100);
    }

    function goEditar(item) {
        setAsesorEdit(item)
        setTimeout(() => {
            document.getElementById('btnDialogoNuevoAsesor').click()
        }, 100);
    }

    function goHabCarteras(item) {
        setAsesorEdit(item)
        setTimeout(() => {
            document.getElementById('btnModalHabCarteras').click()
        }, 100);
    }

    function asesorConRegistros() {
        Swal.fire({
            title: 'El asesor ' + asesorEdit.nombre + ' tiene registros en préstamos y/o abonos. ¿Deseas eliminarlo de todas formas?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById('Form_eliminar_asesor').submit()
            }
        })
    }

    function confirmarBorrar() {
        const url = params.globalVars.myUrl + 'user/' + asesorEdit.id + '/edit'
        fetch(url).then((response) => {
            return response.json()
        }).then((json) => {
            document.getElementById('btnDialogoNuevoAsesor').click()
            if (json) {
                asesorConRegistros()
            } else {
                document.getElementById('Form_eliminar_asesor').submit()
            }
        })
    }

    return (
        <AuthenticatedLayout
            user={params.auth}
            clientes={params.clientes}
            globalVars={params.globalVars}
            buscarActive={buscarActive}
        >
            <Head title="Asesores" />
            <div className="py-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className='container'>
                            <div style={{ marginTop: '0.2em' }} align="center" className="row justify-content-center">
                                <div style={{ marginTop: '0.8em' }} className="row">
                                    <div onClick={abrirDialogoNuevoUsuario} className="col-lg-4 col-md-6 col-sm-6 col-6"  >
                                        <div className="card border border-primary card-flyer pointer">
                                            <img style={{ width: '8em', height: '4em', marginTop: '1em' }} src={newLogo} className="card-img-top img-fluid centerImg" alt="" />
                                            <h2 style={{ marginTop: '0.2em' }} className="card-title titulo">Nuevo asesor</h2>
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
                                            <th style={{ textAlign: 'center' }} scope="col">Nombre</th>
                                            <th style={{ textAlign: 'center' }} scope="col">Email</th>
                                            <th style={{ textAlign: 'center' }} scope="col">Tipo de usuario</th>
                                            <th colSpan={'2'} style={{ textAlign: 'center' }} scope="col">Carteras habilitadas</th>
                                            <th style={{ textAlign: 'center' }} scope="col">Hora bloqueo</th>
                                            <th style={{ textAlign: 'center' }} scope="col">Editar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {params.asesores.length == 0 ?
                                            <tr style={{ marginTop: '1.5em' }} className='container'><td colSpan='6'>No se han encontrado resultados....</td></tr>
                                            :
                                            params.asesores.map((item, index) => {
                                                const cartes = []
                                                if (item.unable != '' && item.unable != null) {
                                                    const array = item.unable.split(',')
                                                    array.forEach(element => {
                                                        cartes.push(element)
                                                    });
                                                }
                                                return (
                                                    <tr className='align-middle' style={{ textAlign: 'center' }} key={index}>
                                                        <td>{item.nombre}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.tipo_usuario}</td>
                                                        <td style={{ textAlign: 'left' }}>
                                                            {cartes.map((item1, index) => {
                                                                return (
                                                                    <li style={{ whiteSpace: 'nowrap' }} key={index} >{item1}</li>

                                                                )
                                                            })}
                                                        </td>
                                                        <td>
                                                            <button onClick={() => goHabCarteras(item)} className='btn btn-outline-light btn-sm border' style={{ cursor: 'pointer' }} >
                                                                <svg style={{ padding: '0.2em', backgroundColor: '#127b38' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus-square rounded" viewBox="0 0 16 16">
                                                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                                                </svg>
                                                            </button>
                                                        </td>
                                                        <td>{item.time_blocked}</td>
                                                        <td>
                                                            <button onClick={() => goEditar(item)} className='border' style={{ cursor: 'pointer' }} >
                                                                <svg style={{ padding: '0.2em', backgroundColor: '#127b38' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-fill rounded" viewBox="0 0 16 16">
                                                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                                                </svg>
                                                            </button>
                                                        </td>
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
            <button type="button" id='btnDialogoNuevoAsesor' style={{ display: 'none' }} data-toggle="modal" data-target="#dialogoNuevoUsuario"></button>
            <DialogoNuevoAsesor confirmarBorrar={confirmarBorrar} asesorEdit={asesorEdit} roles={params.roles} token={params.token} ></DialogoNuevoAsesor>
            <button id='btnModalLoading' type="button" style={{ display: 'none' }} data-toggle="modal" data-target="#modalLoading">
            </button>
            <DialogoLoading url={params.globalVars.myUrl}></DialogoLoading>
            <button id='btnModalHabCarteras' type="button" style={{ display: 'none' }} data-toggle="modal" data-target="#modalHabilitarCarteras">
            </button>
            <DialogoHabilitarCarteras asesorEdit={asesorEdit} carteras={params.carteras} token={params.token} ></DialogoHabilitarCarteras>
            <form method="get" action={route('user.show', asesorEdit.id)} id="Form_eliminar_asesor"></form>
        </AuthenticatedLayout>
    )
}

export default Users