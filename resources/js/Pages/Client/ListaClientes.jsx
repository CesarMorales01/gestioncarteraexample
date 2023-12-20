import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react'
import GlobalFunctions from '../services/GlobalFunctions'
import '../../../css/general.css'
import Swal from 'sweetalert2'
import DialogoLoading from '../UIGeneral/DialogoLoading';
import newLogo from '../../../../public/Images/Config/plus.png'
import TablaClientes from './TablaClientes';

const ListaClientes = (params) => {
    const glob = new GlobalFunctions()
    const [filterLista, setFilterLista] = useState(params.listaClientes.data)
    const [pagination, setPagination] = useState(params.listaClientes.links)
    const [cargar, setCargar] = useState(false)
    const [carteraSeleccionada, setCarteraSeleccionada] = useState(params.cartera)
    const [noData, setNoData] = useState(false)
    const [permisos, setPermisos] = useState([])

    useEffect(() => {
        if (cargar) {
            fetchClientesByCartera()
        }
        if (filterLista.length == 0) {
            setNoData(true)
        } else {
            setNoData(false)
        }
    }, [cargar])

    useEffect(() => {
        if (params.state != 'nothing') {
            sweetAlert(params.state)
        }
        setPermisos(glob.cargarPermisos(params.auth.permissions))
    }, [])

    function fetchClientesByCartera() {
        const url = params.globalVars.myUrl + 'clientes/list/' + carteraSeleccionada
        loading()
        fetch(url)
            .then((response) => {
                return response.json()
            }).then((json) => {
                loadingOff()
                setCargar(false)
                setFilterLista(json.data)
                setPagination(json.links)
            })
    }

    function buscarActive(e) { }

    function sweetAlert(mensaje) {
        Swal.fire({
            title: mensaje,
            icon: params.state.includes('elimin') ? 'warning' : 'success',
            timer: params.state.includes('elimin') ? 2000 : 1000
        })
    }

    function cambioCartera(e) {
        setCargar(true)
        setCarteraSeleccionada(e.target.value)
    }

    function goCCM() {
        const url = 'https://tucasabonita.site/CCM/buscarClientesCCM.php'
        window.open(url, "nuevo", "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=800, height=600");
    }

    function newCliente() {
        loading()
        window.location = params.globalVars.myUrl + 'client/create'
    }

    function loading() {
        document.getElementById('btnModalLoading').click()
    }

    function loadingOff() {
        document.getElementById('btnCloseModalLoading').click()
    }

    return (
        <AuthenticatedLayout
            user={params.auth}
            clientes={params.clientes}
            globalVars={params.globalVars}
            buscarActive={buscarActive}
        >
            <Head title="Clientes" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className='container'>
                        <div style={{ marginTop: '0.8em' }} className="row">
                            <div style={{ width: window.screen.width > 600 ? '' : '15em' }} onClick={newCliente} className="col-6"  >
                                <div className="card border border-primary card-flyer pointer">
                                    <img style={{ width: window.screen.width > 600 ? '8em' : '4em', height: 'auto', marginTop: '1em' }} src={newLogo} className="card-img-top img-fluid centerImg" alt="" />
                                    <h2 style={{ marginTop: '0.2em', textAlign: 'center' }} className="card-title titulo">Nuevo cliente</h2>
                                </div>
                            </div>
                            <div style={{ textAlign: 'center' }} className="col-lg-3 col-md-3 col-sm-6 col-6"  >
                                <label style={{ marginTop: '0.5em' }}>
                                    <strong>Selecciona cartera:</strong>
                                    <select onChange={cambioCartera} className="form-select rounded" aria-label="Default select example" value={carteraSeleccionada} >
                                        {params.carteras.map((item, index) => {
                                            return (
                                                <option key={index} value={item}>{item}</option>
                                            )
                                        })}
                                    </select>
                                </label>
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '1.8em', display: 'none' }} className="col-lg-3 col-md-3 col-sm-6 col-6"  >
                                <a onClick={goCCM} className='btn btn-outline-warning'>
                                    Consultar CCM
                                    <i style={{ marginLeft: '0.5em' }} className="fa-solid fa-ban fa-lg"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <TablaClientes permisos={permisos} globalVars={params.globalVars} noData={noData} pagination={pagination} clientes={filterLista}></TablaClientes>
                </div>
            </div>
            <button id='btnModalLoading' type="button" style={{ display: 'none' }} data-toggle="modal" data-target="#modalLoading">
            </button>
            <DialogoLoading url={params.globalVars.myUrl}></DialogoLoading>
        </AuthenticatedLayout >
    )
}

export default ListaClientes