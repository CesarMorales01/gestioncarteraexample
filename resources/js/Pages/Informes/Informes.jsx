import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react'
import GlobalFunctions from '../services/GlobalFunctions'
import '../../../css/general.css'
import Swal from 'sweetalert2'
import DialogoLoading from '../UIGeneral/DialogoLoading';
import { ChartTotales } from './ChartTotales';
import { ChartClientes } from './ChartClientes';
import DialogoTotalClientes from './DialogoTotalClientes';

const Informes = (params) => {
    const glob = new GlobalFunctions()
    const [carteSelected, setCarteraSelected] = useState(params.carteSelected)
    const [cargar, setCargar] = useState(false)
    const [totalAbonosCartera, setTotalAbonosCartera] = useState(params.datosInformes.abonos.datos[0].totalCartera)
    const [totalPrestCartera, setTotalPrestCartera] = useState(params.datosInformes.prestamos.datos[0].totalCartera)
    const [totales, setTotales] = useState(params.datosInformes.totales)
    const [totalClientesTodo, setTotalClientesTodo] = useState({
        meses: []
    })
    const [permisos, setPermisos] = useState([])

    useEffect(() => {
        if (params.estado != '') {
            sweetAlert(params.estado)
        }
        functionSetPermisos()
    }, [])

    function functionSetPermisos() {
        let array = []
        if (permisos.length == 0) {
            params.auth.permissions.forEach(element => {
                array.push(element.name)
            });
            setPermisos(array)
        }
    }

    useEffect(() => {
        if (cargar) {
            fetchGetDatosAbonos()
            fetchGetDatosPrestamos()
        }
    }, [carteSelected])

    function sweetAlert(mensaje) {
        Swal.fire({
            title: mensaje,
            icon: params.estado.includes('elimin') ? 'warning' : 'success',
            timer: params.estado.includes('elimin') ? 1500 : 1000
        })
    }

    function buscarActive(e) { }

    function loading() {
        document.getElementById('btnModalLoading').click()
    }

    function loadingOff() {
        document.getElementById('btnCloseModalLoading').click()
    }

    function loadingTimeOut() {
        loading()
        setTimeout(() => {
            loadingOff()
        }, 3000);
    }

    function fetchGetDatosPrestamos() {
        const arrayCarte = [];
        arrayCarte.push(carteSelected)
        const obj = {
            'carteras': arrayCarte,
            'ffinal': params.datosInformes.parametros.ffinal,
            'finicial': params.datosInformes.parametros.finicial,
            'asesores': params.datosInformes.parametros.asesores
        }
        const url = params.globalVars.myUrl + 'getPrest/listByDate?_token=' + params.token
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json()
        }).then((json) => {
            setCargar(false)
            setTotalPrestCartera(json.original.datos[0].totalCartera)
        })
    }

    function fetchGetDatosAbonos() {
        loading()
        const arrayCarte = [];
        arrayCarte.push(carteSelected)
        const obj = {
            'carteras': arrayCarte,
            'ffinal': params.datosInformes.parametros.ffinal,
            'finicial': params.datosInformes.parametros.finicial,
            'asesores': params.datosInformes.parametros.asesores
        }
        const url = params.globalVars.myUrl + 'getabonos/listByDate?_token=' + params.token
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json()
        }).then((json) => {
            setCargar(false)
            loadingOff()
            setTotalAbonosCartera(json.original.datos[0].totalCartera)
            setTotales(json.original.datos[0].totales)
        })
    }

    function cambioCartera(e) {
        setCargar(true)
        setCarteraSelected(e.target.value)
        setTotalClientesTodo((valores) => ({
            ...valores,
            meses: [],
        }))
    }

    function goListas() {
        const url = params.globalVars.myUrl + 'listas/' + carteSelected + "/edit"
        window.open(url, "nuevo", "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=800, height=600");
    }

    function goRevisados() {
        const url = params.globalVars.urlRoot + 'Ver_lista_revisados.php?Cobro=' + carteSelected
        window.open(url, "nuevo", "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=800, height=600");
    }

    function fetchUpdateCartePrede() {
        loading()
        const obj = {
            'cartera': carteSelected,
            'id': params.auth.id_asesores
        }
        const url = params.globalVars.myUrl + 'carteras/prede?_token=' + params.token
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json()
        }).then((json) => {
            loadingOff()
        })
    }

    function validarDatos(e) {
        loadingTimeOut()
        e.preventDefault()
        if (totales.abonos.length > 0) {
            const datos = []
            //Invertir para guardar datos actuales que vienen de ultimos....
            const totalesReverse = totales.totales.reverse()
            const abonosReverse = totales.abonos.reverse()
            const saldosReverse = totales.saldos.reverse()
            const moraReverse = totales.mora.reverse()
            const total_clienteReverse = totales.total_clientes.reverse()
            const total_prestamosReverse = totales.total_prestamos.reverse()
            const total_clientes_sinsaldoReverse = totales.total_clientes_sinsaldo.reverse()
            datos.push(totalesReverse[0])
            datos.push(abonosReverse[0])
            datos.push(saldosReverse[0])
            if (moraReverse[0] == null) {
                datos.push(0)
            } else {
                datos.push(moraReverse[0])
            }
            datos.push(total_clienteReverse[0])
            datos.push(total_prestamosReverse[0])
            datos.push(total_clientes_sinsaldoReverse[0])
            datos.push(carteSelected)
            document.getElementById('datosGuardarTotal').value = datos
            document.getElementById('formGuardarTotales').submit()
        } else {
            sweetAlert('¡Ingresa primero préstamos y abonos!')
        }
    }

    function goTotales() {
        const url = params.globalVars.urlRoot + "OpcionesTotales.php?Cobro='" + carteSelected + "'"
        window.open(url, "nuevo", "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=800, height=600");
    }

    function goPrestamosCancelados() {
        const url = params.globalVars.urlRoot + "Cuentas_canceladas_hoy.php?Cobro='" + carteSelected + "'"
        window.open(url, "nuevo", "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=800, height=600");
    }

    function goOtros() {
        const url = params.globalVars.urlRoot + "Advertencias.php?cobro='" + carteSelected + "'"
        window.open(url, "nuevo", "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=800, height=600");
    }

    function goResultados() {
        const url = "https://miscelaneos.tucasabonita.site/"
        window.open(url, "nuevo", "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=800, height=600");
    }

    function fetchTotalClientesTodo() {
        if (totalClientesTodo.meses.length == 0) {
            loading()
            const url = params.globalVars.myUrl + 'totales/' + carteSelected
            fetch(url).then((response) => {
                return response.json()
            }).then((json) => {
                setTotalClientesTodo(json)
                loadingOff()
                abrirDialogoTotalClientes()
            })
        } else {
            abrirDialogoTotalClientes()
        }
    }

    function abrirDialogoTotalClientes() {
        document.getElementById('btnModalTotalClientes').click()
    }

    function goCaja() {
        loadingTimeOut()
    }

    function goListaAbonos() {
        loadingTimeOut()
        window.location = params.globalVars.myUrl + 'getabonos/listByDateShow/' + carteSelected
    }

    function goListaPrestamos() {
        loadingTimeOut()
        window.location = params.globalVars.myUrl + 'getPrest/listByDateShow/' + carteSelected
    }

    return (
        <AuthenticatedLayout
            user={params.auth}
            clientes={params.clientes}
            globalVars={params.globalVars}
            buscarActive={buscarActive}
        >
            <Head title="Informes" />
            <div className="py-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className='container' style={{ textAlign: 'center', marginBottom: '1em' }}>
                            <div style={{ marginTop: '1em' }} className='row justify-content-center'>
                                <div className='col-4'>
                                    <h5 style={{ marginTop: window.screen.width > 600 ? '0.5em' : '', marginLeft: window.screen.width > 600 ? '4em' : '' }} className='titulo'>Informes cartera:</h5>
                                </div>
                                <div className='col-4'>
                                    <select value={carteSelected} onChange={cambioCartera} name='cartera' className="form-select rounded" >
                                        {params.carteras.map((item, index) => {
                                            return (
                                                <option key={index} value={item} >{item}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className='col-4'>
                                    <button style={{ marginTop: '0.25em' }} onClick={fetchUpdateCartePrede} type='button' className='btn btn-outline-info btn-sm'>
                                        <i style={{ marginRight: '0.2em' }} className="fa-solid fa-clipboard-check fa-lg"></i>
                                        Fijar Cartera
                                    </button>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table style={{ marginTop: '0.4em' }} className="table table-sm">
                                    <thead >
                                        <tr className='align-middle' >
                                            <th colSpan={'2'} style={{ color: 'white' }} className="navBarFondo rounded">Cobrado en el dia</th>
                                            <th colSpan={'2'} style={{ color: 'white' }} className="navBarFondo rounded">Prestado en el dia</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th colSpan={'2'}>
                                                <a onClick={goListaAbonos} className='btn btn-outline-success'>${glob.formatNumber(totalAbonosCartera)}
                                                    <i style={{ marginLeft: '0.5em' }} className="fa-solid fa-magnifying-glass-plus fa-lg"></i>
                                                </a>
                                            </th>
                                            <th colSpan={'2'}>
                                                <a onClick={goListaPrestamos} className='btn btn-outline-success'>${glob.formatNumber(totalPrestCartera)}
                                                    <i style={{ marginLeft: '0.5em' }} className="fa-solid fa-magnifying-glass-plus fa-lg"></i>
                                                </a>
                                            </th>
                                        </tr>
                                    </tbody>
                                    <thead>
                                        <tr>
                                            <th style={{ color: 'white' }} >
                                                <a onClick={goListas} className='btn btn-outline-info'>
                                                    Listas
                                                    <i style={{ marginLeft: '0.5em' }} className="fa-solid fa-list fa-lg"></i>
                                                </a>
                                                <button onClick={goRevisados} style={{ marginLeft: '1em', display: 'none' }} className='btn btn-outline-primary btn-sm'>
                                                    <i className="fa-solid fa-check-double fa-lg"></i>
                                                </button>
                                            </th>
                                            <th ><button onClick={goPrestamosCancelados} style={{ display: permisos.includes('borrar-caja') ? '' : 'none' }} className='btn btn-outline-info'>Préstamos cancelados</button></th>
                                            <th>
                                                <button style={{ display: 'none' }} onClick={goOtros} className='btn btn-outline-dark'>Otros</button>
                                                <button onClick={goResultados} style={{ marginLeft: '1em', display: 'none' }} className='btn btn-outline-primary btn-sm'>
                                                    <i className="fa-solid fa-list-ol fa-lg"></i>
                                                </button>
                                            </th>
                                            <th>
                                                <a onClick={goCaja} href={route('caja.edit', carteSelected)} style={{ display: permisos.includes('borrar-caja') ? '' : 'none' }} className='btn btn-outline-success'>
                                                    Caja
                                                    <i style={{ marginLeft: '0.5em' }} className="fa-solid fa-cash-register fa-lg"></i>
                                                </a>
                                            </th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            {permisos.includes('ver-graficos-informes') ?
                                <>
                                    <div style={{ marginTop: '1em', display: permisos.includes('ver-graficos-informes') ? '' : 'none' }} className='border border-2 border-primary rounded'>
                                        {/* Gráfica totales */}
                                        <h1 style={{ fontSize: '1.2em' }} className="text-center font-monospace fw-bold lh-base">Comportamiento totales ultimos 6 meses </h1>
                                        <div style={{ margin: '0.5em' }} className="row">
                                            <div className="col-8">
                                                <button onClick={goTotales} className='btn btn-outline-info btn-sm'>
                                                    Ver todos los registros
                                                    <i style={{ marginLeft: '0.5em' }} className="fa-solid fa-magnifying-glass-plus fa-lg"></i>
                                                </button>
                                            </div>
                                            <div className="col-4">
                                                <form method="POST" id="formGuardarTotales" onSubmit={validarDatos} action={route('totales.store')}>
                                                    <input type="hidden" name='_token' value={params.token} />
                                                    <input type="hidden" name='datos[]' id='datosGuardarTotal' />
                                                    <button type='submit' className='btn btn-outline-success btn-sm'>
                                                        Guardar totales actual
                                                        <i style={{ marginLeft: '0.5em' }} className="fa-regular fa-floppy-disk fa-lg"></i>
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="bg-light mx-auto px-2" >
                                                <ChartTotales totales={totales}></ChartTotales>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '1em', display: permisos.includes('ver-graficos-informes') ? '' : 'none' }} className='border border-2 border-primary rounded'>
                                        {/* Gráfica total clientes */}
                                        <div style={{ margin: '0.5em' }} className="row">
                                            <div className="col-8">
                                                <h1 style={{ fontSize: '1.2em' }} className="text-center font-monospace fw-bold lh-base">Total clientes ultimos 6 meses </h1>
                                            </div>
                                            <div className="col-4">
                                                <a onClick={fetchTotalClientesTodo} className='btn btn-outline-info btn-sm'>
                                                    Ver todos los registros
                                                    <i style={{ marginLeft: '0.5em' }} className="fa-solid fa-magnifying-glass-plus fa-lg"></i>
                                                </a>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="bg-light mx-auto px-2" >
                                                <ChartClientes totales={totales}></ChartClientes>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : ''}
                        </div>
                    </div>
                </div>
            </div>
            <button id='btnModalLoading' type="button" style={{ display: 'none' }} data-toggle="modal" data-target="#modalLoading">
            </button>
            <DialogoLoading url={params.globalVars.myUrl}></DialogoLoading>
            <button id='btnModalTotalClientes' type="button" style={{ display: 'none' }} data-toggle="modal" data-target="#modalTotalClientes">
            </button>
            <DialogoTotalClientes totales={totalClientesTodo} globalVars={params.globalVars} carteSelected={carteSelected}></DialogoTotalClientes>

        </AuthenticatedLayout>
    )
}

export default Informes