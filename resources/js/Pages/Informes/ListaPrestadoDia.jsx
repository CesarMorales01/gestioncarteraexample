import React from 'react'
import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import '../../../css/general.css'
import GlobalFunctions from '../services/GlobalFunctions'
import DialogoLoading from '../UIGeneral/DialogoLoading';

const ListaPrestadoDia = (params) => {
    const glob = new GlobalFunctions()
    const [datosPrestamos, setDatosPrestamos] = useState(params.datosInformes.prestamos)
    const [cargar, setCargar] = useState(false)
    const [fechas, setFechas] = useState({
        finicial: params.datosInformes.parametros.finicial,
        ffinal: params.datosInformes.parametros.ffinal
    })
    const [carteSelected, setCarteSelected] = useState(params.datosInformes.parametros.carteras[0])
    const [asesorSelected, setAsesorSelected] = useState(params.datosInformes.parametros.asesores[0].nombre)
    const [allCarteras, setAllCarteras] = useState(params.datosInformes.parametros.carteras.length > 1 ? true : false)
    const [allAsesores, setAllAsesores] = useState(params.datosInformes.parametros.asesores.length > 1 ? true : false)
    const [permisos, setPermisos] = useState([])

    useEffect(() => {
        if (cargar) {
            fetchGetDatosPrestamos()
        }
        setPermisos(glob.cargarPermisos(params.auth.permissions))
    }, [fechas, carteSelected, asesorSelected, allCarteras, allAsesores])

    function fetchGetDatosPrestamos() {
        loading()
        const arrayCarte = [];
        if (allCarteras) {
            params.carteras.forEach(element => {
                arrayCarte.push(element)
            });
        } else {
            arrayCarte.push(carteSelected)
        }
        const arrayAsesores = [];
        if (allAsesores) {
            params.datosInformes.parametros.asesores.forEach(element => {
                const objAsesor = {
                    'nombre': element.nombre
                }
                arrayAsesores.push(objAsesor)
            });
        } else {
            const objAsesor = {
                'nombre': asesorSelected
            }
            arrayAsesores.push(objAsesor)
        }
        const obj = {
            'carteras': arrayCarte,
            'ffinal': fechas.ffinal,
            'finicial': fechas.finicial,
            'asesores': arrayAsesores
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
            loading()
            setDatosPrestamos(json.original)
        })
    }

    function loading() {
        document.getElementById('btnModalLoading').click()
    }

    function cambioFechaInicio(e) {
        setCargar(true)
        setFechas((valores) => ({
            ...valores,
            finicial: e.target.value
        }))
    }

    function cambioFechaFinal(e) {
        setCargar(true)
        setFechas((valores) => ({
            ...valores,
            ffinal: e.target.value
        }))
    }

    function cambioCartera(e) {
        setCargar(true)
        setAllCarteras(false)
        setCarteSelected(e.target.value)
    }

    function cambioAsesor(e) {
        setCargar(true)
        setAllAsesores(false)
        setAsesorSelected(e.target.value)
    }

    function cambioAllCarteras() {
        setCargar(true)
        if (allCarteras) {
            setAllCarteras(false)
        } else {
            setAllCarteras(true)
        }
    }

    function cambioAllAsesores() {
        setCargar(true)
        if (allAsesores) {
            setAllAsesores(false)
        } else {
            setAllAsesores(true)
        }
    }

    function diaAnterior() {
        setCargar(true)
        var currentDateObj = new Date(fechas.finicial)
        var numberOfMlSeconds = currentDateObj.getTime();
        var addMlSeconds = 60 * 60000;
        var newDateObj = new Date(numberOfMlSeconds + addMlSeconds)
        document.getElementById('inputDateFinicial').value = glob.formatFecha(newDateObj)
        document.getElementById('inputDateFfinal').value = glob.formatFecha(newDateObj)
        setFechas((valores) => ({
            ...valores,
            finicial: glob.formatFecha(newDateObj),
            ffinal: glob.formatFecha(newDateObj)
        }))
    }

    function diaSiguiente() {
        setCargar(true)
        var currentDateObj = new Date(fechas.finicial)
        var newDateObj = currentDateObj.setDate(currentDateObj.getDate() + 2);
        document.getElementById('inputDateFinicial').value = glob.formatFecha(newDateObj)
        document.getElementById('inputDateFfinal').value = glob.formatFecha(newDateObj)
        setFechas((valores) => ({
            ...valores,
            finicial: glob.formatFecha(newDateObj),
            ffinal: glob.formatFecha(newDateObj)
        }))
    }

    function buscarActive(e) { }

    return (
        <AuthenticatedLayout
            user={params.auth}
            clientes={params.clientes}
            globalVars={params.globalVars}
            buscarActive={buscarActive}
        >
            <Head title="Lista prestado" />
            <div className='container'>
                <div style={{ marginTop: '0.5em' }} className="row justify-content-center">
                    <div className='row col-lg-6 col-md-12 col-sm-12 col-12'>
                        <div style={{ textAlign: 'center' }} className='col-12'>
                            <span className='titulo' style={{ width: '80%' }}><strong>Prestamos entre</strong></span>
                        </div>
                        <div className="col-2">
                            <button data-toggle="tooltip" data-placement="top" title="Dia anterior" onClick={diaAnterior} className='border border-dark rounded cursorPointer' style={{ marginTop: '0.2em', marginLeft: '0.2em', padding: '0.5em', backgroundColor: '#00722e' }} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                                </svg>
                            </button>
                        </div>
                        <div className="col-4">
                            <input type="date" className='form-control rounded' defaultValue={fechas.finicial} onChange={cambioFechaInicio} name="fecha_prest" id="inputDateFinicial" />
                        </div>
                        <div className="col-4" >
                            <input type="date" className='form-control rounded' defaultValue={fechas.ffinal} onChange={cambioFechaFinal} name="fecha_prest" id="inputDateFfinal" />
                        </div>
                        <div className="col-2">
                            <button data-toggle="tooltip" data-placement="top" title="Dia siguiente" onClick={diaSiguiente} className='border border-dark rounded cursorPointer' style={{ marginTop: '0.2em', marginLeft: '0.2em', padding: '0.5em', backgroundColor: '#00722e' }} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className='row justify-content-center col-lg-6 col-md-12 col-sm-12 col-12' style={{ marginTop: '1em' }} >
                        <div className='row col-6'>
                            <div className='col-8'>
                                <span className='titulo' style={{ marginLeft: '1.5em', marginBottom: '0.2em' }}><strong>Cartera</strong></span>
                                <select value={carteSelected} onChange={cambioCartera} name='cartera' className="form-select rounded" >
                                    {params.carteras.map((item, index) => {
                                        return (
                                            <option key={index} value={item} >{item}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-4'>
                                <span style={{ color: 'black', marginTop: '0.8em' }}>Todas</span>
                                <label style={{ marginTop: '0.7em' }} className="relative inline-flex  cursor-pointer">
                                    <input checked={allCarteras} onChange={cambioAllCarteras} type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                        <div className='row col-6'>
                            <div className='col-8'>
                                <h5 className='titulo' style={{ marginLeft: '1.5em', marginBottom: '0.2em' }}><strong>Asesor</strong></h5>
                                <select value={asesorSelected} onChange={cambioAsesor} name='cartera' className="form-select rounded" >
                                    {params.datosInformes.parametros.asesores.map((item, index) => {
                                        return (
                                            <option key={index} value={item.nombre} >{item.nombre}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div style={{ display: params.auth.role[0] == 'Usuario' ? 'none' : '' }} className='col-4'>
                                <span style={{ color: 'black', marginTop: '0.8em' }}>Todos</span>
                                <label style={{ marginTop: '0.7em' }} className="relative inline-flex  cursor-pointer">
                                    <input checked={allAsesores} onChange={cambioAllAsesores} type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
                {datosPrestamos.datos.length == 0 ?
                    <span style={{ marginTop: '1.5em' }} className='container'><td colSpan='6'>No se han encontrado resultados....</td></span>
                    :
                    datosPrestamos.datos.map((item, index) => {
                        return (
                            <div key={index}>
                                <div style={{ textAlign: 'center' }} className='table-responsive'>
                                    <div>
                                        <table className="table table-sm">
                                            <thead className="navBarFondo rounded">
                                                <tr style={{ fontStyle: 'italic' }}>
                                                    <th style={{ color: 'white' }}  >Total prestado {item.cartera}</th>
                                                    <th style={{ color: 'white' }} >${glob.formatNumber(item.totalCartera)}</th>
                                                    <th></th>
                                                    <th style={{ color: 'white', fontSize: '0.9em', display: permisos.includes('ver-graficos-informes') ? '' : 'none' }}  >Total utilidad {item.cartera}</th>
                                                    <th style={{ color: 'white', fontSize: '0.9em', display: permisos.includes('ver-graficos-informes') ? '' : 'none' }} >${glob.formatNumber(item.totalUtilidad)}</th>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                    {item.datos.length == 0 ?
                                        <></>
                                        :
                                        item.datos.map((item1, index) => {
                                            return (
                                                <table key={index} style={{ marginTop: '0.4em', display: item1.lista.length == 0 ? 'none' : '' }} className="table table-sm">
                                                    <thead >
                                                        <tr className='align-middle' >
                                                            <th style={{ color: 'white' }} className="navBarFondo rounded">Fecha ingreso</th>
                                                            <th style={{ color: 'white' }} className="navBarFondo rounded">Prestamo</th>
                                                            <th style={{ color: 'white' }} className="navBarFondo rounded">Cliente</th>
                                                            <th style={{ color: 'white' }} className="navBarFondo rounded">Asesor</th>
                                                            <th style={{ color: 'white', display: permisos.includes('ver-graficos-informes') ? '' : 'none' }} className="navBarFondo rounded">Utilidad</th>
                                                        </tr>
                                                    </thead>
                                                    {item1.lista.length == 0 ?
                                                        <></>
                                                        :
                                                        item1.lista.map((item2, index) => {
                                                            
                                                            return (
                                                                <tbody key={index}>
                                                                    <tr className='align-middle' key={index} data-toggle="tooltip" data-placement="top" title="Guardado en historial!" style={{ backgroundColor: item2.histo ? '#a18262' : '' }}>
                                                                        <td>{item2.fecha_prest}</td>
                                                                        <td style={{ whiteSpace: 'nowrap' }}>$ {glob.formatNumber(item2.valorprestamo)}</td>
                                                                        <td>{window.screen.width > 600 ? item2.cliente : item2.cliente.substring(0, 22)}</td>
                                                                        <td>{item2.asesor}</td>
                                                                        <td style={{ whiteSpace: 'nowrap', display: permisos.includes('ver-graficos-informes') ? '' : 'none' }}>$ {glob.formatNumber(item2.utilidad)}</td>
                                                                    </tr>
                                                                </tbody>
                                                            )
                                                        })
                                                    }
                                                    <thead>
                                                        <tr style={{ fontStyle: 'italic' }} className='align-middle' >
                                                            <th scope="col">Total prestado asesor {item1.asesor}</th>
                                                            <th style={{ whiteSpace: 'nowrap' }} scope="col">$ {glob.formatNumber(item1.totalAsesor)}</th>
                                                            <th></th>
                                                            <th style={{ display: permisos.includes('ver-graficos-informes') ? '' : 'none' }} scope="col">Total utilidades</th>
                                                            <th style={{ whiteSpace: 'nowrap', display: permisos.includes('ver-graficos-informes') ? '' : 'none' }} scope="col">$ {glob.formatNumber(item1.totalUtilidad)}</th>
                                                        </tr>
                                                    </thead>
                                                </table>
                                            )
                                        })
                                    }
                                </div>
                                <hr className='rounded' style={{ height: '0.5em' }}></hr>
                                <br></br>
                            </div>
                        )
                    })
                }

            </div>
            <button id='btnModalLoading' type="button" style={{ display: 'none' }} data-toggle="modal" data-target="#modalLoading">
            </button>
            <DialogoLoading url={params.globalVars.myUrl}></DialogoLoading>
        </AuthenticatedLayout>
    )
}

export default ListaPrestadoDia