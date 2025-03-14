import React, { useState, useEffect, useRef } from 'react'
import GlobalFunctions from '../services/GlobalFunctions'
import '../../../css/general.css'
import SecondaryButton from '@/Components/SecondaryButton'
import ActiveButton from '@/Components/ActiveButton'
import Swal from 'sweetalert2'

const DialogoNuevoAsesor = (params) => {
    const glob = new GlobalFunctions()
    const [asesor, setAsesor] = useState({
        'id': '',
        'nombre': '',
        'email': '',
        'tipo': 'usuario',
        'bloqueo': {
            'hora': '20',
            'min': '00'
        },
        'contra': ''
    })
    const [quitarBloqueo, setQuitarBloqueo] = useState(false)
    const [horas, setHoras] = useState([])
    const [mins, setMins] = useState([])

    useEffect(() => {
        cargarHoras()
    }, [])

    useEffect(() => {
        if (asesor.id != params.asesorEdit.id) {
            if (params.asesorEdit.id != '') {
                cargarParametros()
            } else {
                setAsesor((valores) => ({
                    ...valores,
                    'id': '',
                    'nombre': '',
                    'email': '',
                    'tipo': 'usuario',
                    'bloqueo': {
                        'hora': '20',
                        'min': '00'
                    },
                    'contra': ''
                }))
            }
        }
    })

    function cargarParametros() {
        const getHora = [];
        if (params.asesorEdit.time_blocked == '') {
            cargarQuitarBloqueo(true)
            getHora.push('--')
            getHora.push('--')
        } else {
            cargarQuitarBloqueo(false)
            const getArray = params.asesorEdit.time_blocked.split(':')
            getHora.push(getArray[0])
            getHora.push(getArray[1])
        }
        setAsesor((valores) => ({
            ...valores,
            id: params.asesorEdit.id,
            nombre: params.asesorEdit.nombre,
            email: params.asesorEdit.email,
            tipo: params.asesorEdit.tipo_usuario,
            bloqueo: {
                'hora': getHora[0],
                'min': getHora[1]
            },
            contra: params.asesorEdit.imei
        }))

    }

    function cargarHoras() {
        const horas = []
        for (let i = 0; i < 24; i++) {
            let h = i
            if (i < 10) {
                h = '0' + i
            }
            horas.push(h)
        }
        setHoras(horas)
        const minutos = []
        for (let i = 0; i < 51; i += 10) {
            let h = i
            if (i < 10) {
                h = '0' + i
            }
            minutos.push(h)
        }
        setMins(minutos)
        setAsesor((valores) => ({
            ...valores,
            bloqueo: {
                'hora': '20',
                'min': '00'
            }
        }))
    }

    function cambioNombre(event) {
        setAsesor((valores) => ({
            ...valores,
            nombre: event.target.value
        }))
    }

    function cambioEmail(event) {
        setAsesor((valores) => ({
            ...valores,
            email: event.target.value
        }))
    }

    function cambioBloqueoHora(event) {
        setAsesor((valores) => ({
            ...valores,
            bloqueo: {
                'hora': event.target.value,
                'min': asesor.bloqueo.min
            }
        }))
    }

    function cambioBloqueoMinutos(event) {
        setAsesor((valores) => ({
            ...valores,
            bloqueo: {
                'hora': asesor.bloqueo.hora,
                'min': event.target.value
            }
        }))
    }

    function cambioContra(event) {
        setAsesor((valores) => ({
            ...valores,
            contra: event.target.value
        }))
    }

    function cambioTipo(event) {
        setAsesor((valores) => ({
            ...valores,
            tipo: event.target.value
        }))
    }

    function cargarQuitarBloqueo(bool) {
        if (bool) {
            setQuitarBloqueo(true)
            quitarOpcionesSelect()
        } else {
            cargarHoras()
            setQuitarBloqueo(false)
        }
    }

    function cambioQuitarBloqueo(e) {
        if (e.target.checked) {
            setQuitarBloqueo(true)
            quitarOpcionesSelect()
        } else {
            cargarHoras()
            setQuitarBloqueo(false)
        }
    }

    function quitarOpcionesSelect() {
        const array = []
        array.push('--')
        setHoras(array)
        const noBloq = {
            'hora': '--',
            'min': '--'
        }
        setAsesor((valores) => ({
            ...valores,
            bloqueo: noBloq
        }))
        setMins(array)
    }

    function loadingOn() {
        document.getElementById('btnIngresar').style.display = 'none'
        document.getElementById('btnLoadingIngresar').style.display = ''
    }

    function validarDatos() {
        if (asesor.nombre != '' && asesor.email != '' && asesor.contra != '') {
            loadingOn()
            if (asesor.id != '') {
                const form = document.getElementById("Form_ingresar")
                form.action = route('user.actualizar')
                form.submit()
            } else {
                document.getElementById('Form_ingresar').submit()
            }
        } else {
            alertDatosFaltantes()
        }
    }

    function alertDatosFaltantes() {
        Swal.fire({
            title: 'Faltan datos importantes!',
            icon: 'warning',
            timer: 1000
        })
    }

    function confirmarBorrar() {
        Swal.fire({
            title: '¿Eliminar asesor ' + asesor.nombre + ' ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById('inputConfirmarBorrar').click()
            }
        })
    }

    return (
        <div className="modal fade" id="dialogoNuevoUsuario" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className='titulo'>{asesor.id == '' ? 'Crear asesor' : 'Editar asesor'}</h5>
                        <input type='hidden' id='inputConfirmarBorrar' onClick={params.confirmarBorrar}></input>
                        <button id='btnEliminarAsesor' onClick={confirmarBorrar} className='border border-dark rounded cursorPointer' style={{ padding: '0.2em', backgroundColor: 'red', display: asesor.id == '' ? 'none' : '' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                            </svg>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div style={{ textAlign: 'center' }} className="container">
                            <form method="post" action={route('user.store')} id="Form_ingresar">
                                <div style={{ marginBottom: '0.5em' }} className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-12 col-12" >
                                        Nombre:
                                        <br />
                                        <input className='rounded form-control' type="text" onChange={cambioNombre} name="nombre" value={asesor.nombre} />
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12 col-12"  >
                                        E-mail:
                                        <br />
                                        <input className='rounded form-control' type="email" onChange={cambioEmail} name="email" value={asesor.email} />
                                    </div>
                                </div>
                                <div className="row" >
                                    <div style={{ marginTop: '0.5em' }} className="col-lg-6 col-md-6 col-sm-12 col-12"  >
                                        <span style={{ marginTop: '2em' }}>Contraseña:</span>
                                        <br />
                                        <input className='rounded form-control' type="password" onChange={cambioContra} name="contra" id="date" value={asesor.contra} />
                                    </div>
                                    <div style={{ marginTop: '0.5em' }} className="col-lg-6 col-md-6 col-sm-12 col-12"  >
                                        Hora de bloqueo (Opcional)
                                        <br />
                                        <div className='row justify-content-center'>
                                            <div className="col-3">
                                                Hora
                                                <br />
                                                <select onChange={cambioBloqueoHora} name='hora' value={asesor.bloqueo.hora} disabled={quitarBloqueo ? true : false} className='rounded'>
                                                    {horas.map((item) => {
                                                        return (
                                                            <option key={item}>{item}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                            <div className="col-3">
                                                Minutos
                                                <br />
                                                <select onChange={cambioBloqueoMinutos} name='minutos' value={asesor.bloqueo.min} disabled={quitarBloqueo ? true : false} className='rounded'>
                                                    {mins.map((item) => {
                                                        return (
                                                            <option key={item}>{item}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                            <div className="col-6">
                                                <p style={{ color: 'black', marginBottom: '0.5em', marginTop: '0.5em' }}>¿Quitar bloqueo?</p>
                                                <label className="relative inline-flex items-center mr-5 cursor-pointer">
                                                    <input type='hidden' defaultValue={quitarBloqueo} name='quitarBloqueo'></input>
                                                    <input type="checkbox" className="sr-only peer" checked={quitarBloqueo} onChange={cambioQuitarBloqueo} />
                                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{quitarBloqueo ? 'Si' : 'No'}</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'center', marginTop: '0.5em' }} className="row" >
                                    <div className="col-12"  >
                                        Tipo de usuario:
                                        <br />
                                        <select name='tipo' value={asesor.tipo} onChange={cambioTipo} className='rounded'>
                                            {params.roles.map((item) => {
                                                const rol = item.name.toLowerCase()
                                                return (
                                                    <option key={rol}>{rol}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <input type="hidden" name='_token' defaultValue={params.token} />
                                <input type="hidden" name='id' defaultValue={asesor.id} />
                            </form>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <SecondaryButton type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</SecondaryButton>
                        <ActiveButton onClick={validarDatos} type='button' id="btnIngresar" className="btn btn-success">{asesor.id == '' ? 'Crear asesor' : 'Editar asesor'}</ActiveButton>
                        <ActiveButton id='btnLoadingIngresar' style={{ display: 'none', backgroundColor: 'gray' }} type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </ActiveButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DialogoNuevoAsesor