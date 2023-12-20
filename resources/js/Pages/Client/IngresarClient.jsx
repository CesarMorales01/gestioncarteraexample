import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react'
import GlobalFunctions from '../services/GlobalFunctions'
import '../../../css/general.css'
import Swal from 'sweetalert2'
import DialogoAgregarTel from './DialogoAgregarTel';
import ModalImage from './ModalImage';

const IngresarClient = (params) => {

    const glob = new GlobalFunctions()
    const [newDatosPersonales, setNewDatosPersonales] = useState({
        nombre: '',
        apellidos: '',
        cedula: '',
        direccion: '',
        otros: '',
        telefonos: [],
        dir_trabajo: '',
        tel_trabajo: '',
        usuario: '',
        clave: '',
        correo: '',
        fecha: glob.getFecha(),
        nombre_fiador: '',
        dir_fiador: '',
        tel_fiador: '',
        letra: '',
        cartera: '',
        imagen: '',
        cedFrontal: '',
        cedPosterior: ''
    })
    const [imageToModal, setImageToModal] = useState('')

    const [divs, setDivs] = useState({
        trabajo: false,
        usuario: false,
        referencia: false
    })

    useEffect(() => {
        if (params.cliente.cedula != '') {
            cargarDatos()
        }
    }, [])

    function cargarDatos() {
        setNewDatosPersonales((valores) => ({
            ...valores,
            nombre: params.cliente.nombre,
            apellidos: params.cliente.apellidos,
            cedula: params.cliente.cedula,
            direccion: params.cliente.direccion,
            dir_trabajo: params.cliente.direccion_trabajo,
            tel_trabajo: params.cliente.telefono_trabajo,
            otros: params.cliente.otro_rifa,
            usuario: params.cliente.usuario.usuario,
            correo: params.cliente.usuario.correo,
            clave: params.cliente.usuario.clave,
            nombre_fiador: params.cliente.nombre_fiador,
            dir_fiador: params.cliente.dir_fiador,
            tel_fiador: params.cliente.tel_fiador,
            letra: params.cliente.valor_letra,
            cartera: params.cliente.Cobro,
            imagen: params.cliente.imagen != '' && params.cliente.imagen != null ? params.globalVars.urlImagenes + params.cliente.imagen : '',
            cedFrontal: params.cliente.fotoCedula.cedFrontal != '' ? params.globalVars.urlCedulas + params.cliente.fotoCedula.cedFrontal : '',
            cedPosterior: params.cliente.fotoCedula.cedPosterior != '' ? params.globalVars.urlCedulas + params.cliente.fotoCedula.cedPosterior : ''
        }))
        setTelefonos()
    }

    function setTelefonos() {
        let tels = newDatosPersonales.telefonos
        for (let i = 0; i < params.cliente.telefonos.length; i++) {
            tels.push(params.cliente.telefonos[i])
        }
        setNewDatosPersonales((valores) => ({
            ...valores,
            telefonos: tels
        }))
    }

    function cambioNombre(e) {
        setNewDatosPersonales((valores) => ({
            ...valores,
            nombre: e.target.value,
            usuario: e.target.value.replace(' ', '.')
        }))
    }

    function cambioApellidos(e) {
        setNewDatosPersonales((valores) => ({
            ...valores,
            apellidos: e.target.value,
        }))
    }

    function cambioCedula(e) {
        setNewDatosPersonales((valores) => ({
            ...valores,
            cedula: e.target.value,
        }))
    }

    function cambioCorreo(e) {
        setNewDatosPersonales((valores) => ({
            ...valores,
            correo: e.target.value,
        }))
    }

    function cambioDireccion(e) {
        setNewDatosPersonales((valores) => ({
            ...valores,
            direccion: e.target.value,
        }))
    }

    function cambioComentario(e) {
        setNewDatosPersonales((valores) => ({
            ...valores,
            otros: e.target.value,
        }))
    }

    function cambioInfoDireccion(e) {
        setNewDatosPersonales((valores) => ({
            ...valores,
            dir_trabajo: e.target.value,
        }))
    }

    function cambioCartera(e) {
        setNewDatosPersonales((valores) => ({
            ...valores,
            cartera: e.target.value,
        }))
    }

    function cambioDirDiador(e) {
        setNewDatosPersonales((valores) => ({
            ...valores,
            dir_fiador: e.target.value,
        }))
    }

    function cambioNombreFiador(e) {
        setNewDatosPersonales((valores) => ({
            ...valores,
            nombre_fiador: e.target.value,
        }))
    }

    function cambioTelFiador(e) {
        setNewDatosPersonales((valores) => ({
            ...valores,
            tel_fiador: e.target.value,
        }))
    }

    function cambioLetra(e) {
        setNewDatosPersonales((valores) => ({
            ...valores,
            letra: e.target.value,
        }))
    }

    function cambioTelTrabajo(e) {
        setNewDatosPersonales((valores) => ({
            ...valores,
            tel_trabajo: e.target.value,
        }))
    }

    function cambioUsuario(e) {
        setNewDatosPersonales((valores) => ({
            ...valores,
            usuario: e.target.value,
        }))
    }

    function cambioClave(e) {
        setNewDatosPersonales((valores) => ({
            ...valores,
            clave: e.target.value,
        }))
    }

    function borrarTelefono(tel) {
        const temp = newDatosPersonales.telefonos.filter((art) => art !== tel);
        setNewDatosPersonales((valores) => ({
            ...valores,
            telefonos: temp
        }))
    }

    function cerrarDialogoNewTel() {
        document.getElementById('btnCerrarDialogoNewTel').click()
    }

    function mostrarDivTrabajo() {
        setDivs((valores) => ({
            ...valores,
            trabajo: divs.trabajo ? false : true
        }))
    }

    function mostrarDivFiador() {
        setDivs((valores) => ({
            ...valores,
            referencia: divs.referencia ? false : true
        }))
    }

    function mostrarDivUsuario() {
        setDivs((valores) => ({
            ...valores,
            usuario: divs.usuario ? false : true
        }))
    }

    function agregarTelefono(e) {
        cerrarDialogoNewTel()
        let array = []
        setNewDatosPersonales((valores) => ({
            ...valores,
            telefonos: array
        }))
        let tels = newDatosPersonales.telefonos
        tels.push(e.target.value)
        setTimeout(() => {
            setNewDatosPersonales((valores) => ({
                ...valores,
                telefonos: tels
            }))
        }, 100);
    }

    function loadingOn() {
        document.getElementById('btnModificarUsuario').style.display = 'none'
        document.getElementById('btnLoadingUsuario').style.display = 'inline'
    }

    function loadingOff() {
        document.getElementById('btnModificarUsuario').style.display = 'inline'
        document.getElementById('btnLoadingUsuario').style.display = 'none'
    }

    function validarInfo(e) {
        e.preventDefault()
        if (newDatosPersonales.nombre == '' || newDatosPersonales.cedula == '') {
            alertDatosFaltantes('Ingresa nombre y/o cédula!')
        } else {
            loadingOn()
            // Poner vacio si no server responde con error
            let correo = newDatosPersonales.correo
            if (newDatosPersonales.correo == '') {
                correo = "vacio"
            }
            const url = params.globalVars.myUrl + 'api/client/getclient/' + newDatosPersonales.cedula + "/" + correo
            fetch(url)
                .then((response) => {
                    return response.json()
                }).then((json) => {
                    if (params.cliente.cedula == '') {
                        if (json.cliente == null && json.usuario == null) {
                            document.getElementById('formCrear').submit()
                        } else {
                            loadingOff()
                            alertDatosFaltantes('Ya existe un usuario con el número de identificación o el email ingresado!')
                        }
                    } else {
                        let validado = 0
                        if (json.cliente != null) {
                            if (json.cliente.cedula == params.cliente.cedula) {
                                validado++
                            }
                        } else {
                            validado++
                        }
                        if (json.usuario != null) {
                            if (json.usuario.correo == params.cliente.usuario.correo) {
                                validado++
                            }
                        } else {
                            validado++
                        }
                        if (validado == 2) {
                            updateUsuario()
                        } else {
                            loadingOff()
                            alertDatosFaltantes('Ya existe un usuario con el número de identificación o el email ingresado!')
                        }
                    }
                })
        }
    }

    function updateUsuario() {
        const form = document.getElementById("formCrear")
        form.action = route('client.actualizar', params.cliente.cedula)
        form.submit()
    }

    function alertDatosFaltantes(mensaje) {
        Swal.fire({
            title: mensaje,
            icon: 'warning',
            timer: 1500,
            showCancelButton: false,
            showConfirmButton: false,
        })
    }

    function enviarBorrar() {
        document.getElementById('btnEliminar').click()
        loadingOn()
    }

    function abrirDialogoEliminar() {
        Swal.fire({
            title: '¿Eliminar este cliente?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                enviarBorrar()
            }
        })
    }

    function buscarActive(e) { }

    function mostrarImagen(event, id) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function (event) {
            var img = document.getElementById(id);
            img.src = event.target.result;
        }
        reader.readAsDataURL(file);
    }

    function spinOff(id) {
        document.getElementById(id).style.display = 'none'
    }

    function bigImage(img) {
        setImageToModal(img)
        setTimeout(() => {
            document.getElementById('btnModalImage').click()
        }, 100);
    }

    return (
        <AuthenticatedLayout
            user={params.auth}
            clientes={params.clientes}
            globalVars={params.globalVars}
            buscarActive={buscarActive}
        >
            <Head title="Ingresar cliente" />
            <div className="container">
                <h1 style={{ marginTop: '0.5em', fontSize: '1.5em' }} id="titulo" className="text-center"> {params.cliente.cedula == '' ? 'Nuevo cliente' : 'Editar cliente'}</h1>
                <a id='btnEliminar' style={{ display: 'none' }} href={route('client.delete', newDatosPersonales.cedula)}></a>
                <form action={route('client.store')} id='formCrear' method='post' onSubmit={validarInfo} encType="multipart/form-data">
                    <input type="hidden" name='_token' value={params.token} />
                    <input type="hidden" name='fecha' value={newDatosPersonales.fecha} />
                    <input type="hidden" name='cedulaAnterior' value={params.cliente.cedula} />
                    <input type="hidden" name='cedFrontalAnterior' value={params.cliente.fotoCedula!=null ? params.cliente.fotoCedula.cedFrontal : ''} />
                    <input type="hidden" name='cedPosteriorAnterior' value={params.cliente.fotoCedula!=null ? params.cliente.fotoCedula.cedPosterior : ''} />
                    {/* datos personales*/}
                    <div id="div_datos_personales" style={{ backgroundColor: '#f4f4f4', padding: '0.4em' }}>
                        <div className="row justify-content-center" >
                            <div className="col-lg-5 col-sm-12" >
                                <strong style={{ fontSize: '1em' }} >Datos personales</strong>
                                <p style={{ textAlign: 'justify', color: 'black' }}>Nombres</p>
                                <input type="text" name='nombre' onChange={cambioNombre} id='inputNombre' className="form-control rounded" value={newDatosPersonales.nombre == '' ? '' : newDatosPersonales.nombre} />
                                <p style={{ textAlign: 'justify', color: 'black', marginTop: '0.5em' }}>Apellidos (Opcional)</p>
                                <input type="text" name='apellidos' onChange={cambioApellidos} id='inputApellidos' className="form-control rounded" value={newDatosPersonales.apellidos == '' ? '' : newDatosPersonales.apellidos} />
                                <p style={{ textAlign: 'justify', color: 'black', marginTop: '0.5em' }}>Cédula</p>
                                <input name='cedula' readOnly={params.cliente.cedula ? true : false} type="number" id='inputCedula' onChange={cambioCedula} placeholder="Número de cédula" className="form-control rounded" defaultValue={newDatosPersonales.cedula == '' ? '' : newDatosPersonales.cedula} />
                            </div>
                            <div className="col-lg-3 col-sm-12" >
                                <strong style={{ fontSize: '1em' }} >Foto cliente (Opcional)</strong>
                                <input name='imagen' data-toggle="tooltip" id='fileImagen' title="" type="file" onChange={(e) => mostrarImagen(e, 'img')} />
                                <input type='hidden' name='imagenAnterior' defaultValue={params.cliente.imagen}></input>
                                <br /><br />
                                <img onClick={()=>bigImage(newDatosPersonales.imagen)} onLoad={() => spinOff('spanvalidandoNombreImagen')} className='border centerImg' id="img" width="60%" height="auto" src={newDatosPersonales.imagen == '' ? params.globalVars.myUrl + "Images/Config/noPreview.jpg" : newDatosPersonales.imagen} />
                                <span id='spanvalidandoNombreImagen' style={{ display: '' }} className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                <i onClick={()=>bigImage(newDatosPersonales.imagen)} style={{ paddingTop: '1em', padding: '0.8em', display: newDatosPersonales.imagen != '' ? '' : 'none' }} className="fa-solid fa-magnifying-glass-plus fa-xs btn btn-outline-info btn-sm"></i>
                            </div>
                        </div>
                    </div>
                    {/* Direccion Domi*/}
                    <div style={{ backgroundColor: '#f4f4f4', padding: '0.5em' }}>
                        <div className="row justify-content-center" >
                            <div className="col-lg-8 col-sm-12">
                                <strong style={{ fontSize: '1em' }} >Dirección de domicilio</strong>
                                <textarea name='direccion' onChange={cambioDireccion} rows="2" className="form-control" value={newDatosPersonales.direccion == '' ? '' : newDatosPersonales.direccion}></textarea>
                                <strong style={{ fontSize: '1em' }} >Comentarios</strong>
                                <textarea name='otros' onChange={cambioComentario} rows="1" className="form-control" value={newDatosPersonales.otros == '' ? '' : newDatosPersonales.otros}></textarea>
                                <br />
                            </div>
                        </div>
                        <p style={{ textAlign: 'center', color: 'black', marginTop: '-0.5em' }}>Télefonos</p>
                        {/* div telefonos */}
                        <div style={{ textAlign: 'center' }} className="container">
                            <div className="row justify-content-center" >
                                <input name='telefonos[]' value={newDatosPersonales.telefonos} type='hidden' id='inputTelefonos' />
                                {newDatosPersonales.telefonos.map((item, index) => {
                                    return (
                                        <div key={index} style={{ margin: '1em' }} className="col-lg-3 col-md-3 col-sm-4 col-4 border">
                                            <p>{item}</p>
                                            <button className='rounded-circle' type="button" onClick={() => borrarTelefono(item)} style={{ backgroundColor: 'orange' }}>
                                                <svg style={{ padding: '0.2em' }} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                </svg>
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                            <button id='btnCerrarDialogoNewTel' type="button" className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#dialogoNewTel"><i className="fa-solid fa-plus"></i>Nuevo télefono
                            </button>
                            <DialogoAgregarTel cerrarDialogo={cerrarDialogoNewTel} agregarTelefono={agregarTelefono} />
                        </div>
                        {/* fin div telefonos */}
                    </div>
                    <div className='container' style={{ textAlign: 'center', width: '50%', marginBottom: '1em' }}>
                        Cartera:
                        <select value={newDatosPersonales.cartera} onChange={cambioCartera} name='cartera' className="form-select rounded" >
                            {params.carteras.map((item, index) => {
                                return (
                                    <option key={index} value={item} >{item}</option>
                                )
                            })}
                        </select>
                    </div>
                    {/* Div fotos cedula*/}
                    <div style={{ marginBottom: '1em', textAlign: 'center' }} className='row'>
                        <strong style={{ fontSize: '1em' }} >Fotos cedula cliente (Opcionales)</strong>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12" >
                            <strong style={{ fontSize: '1em' }} >Frontal</strong>
                            <br></br>
                            <input name='cedFrontal' data-toggle="tooltip" id='fileImagen' title="" type="file" onChange={(e) => mostrarImagen(e, 'imgCed1')} />
                            <input type='hidden' name='imagenAnterior' defaultValue={params.cliente.imagen}></input>
                            <br /><br />
                            <img onClick={()=>bigImage(newDatosPersonales.cedFrontal)} onLoad={() => spinOff('spingCedula1')} className='border centerImg' id="imgCed1" width="40%" height="auto" src={newDatosPersonales.cedFrontal == '' ? params.globalVars.myUrl + "Images/Config/noPreview.jpg" : newDatosPersonales.cedFrontal} />
                            <span id='spingCedula1' style={{ display: '' }} className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <i onClick={()=>bigImage(newDatosPersonales.cedFrontal)} style={{ paddingTop: '1em', padding: '0.8em', display: newDatosPersonales.cedFrontal != '' ? '' : 'none' }} className="fa-solid fa-magnifying-glass-plus fa-xs btn btn-outline-info btn-sm"></i>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12" >
                            <strong style={{ fontSize: '1em' }} >Posterior</strong>
                            <br></br>
                            <input name='cedPosterior' data-toggle="tooltip" id='fileImagen' title="" type="file" onChange={(e) => mostrarImagen(e, 'imgCed2')} />
                            <input type='hidden' name='imagenAnterior' defaultValue={params.cliente.imagen}></input>
                            <br /><br />
                            <img onClick={()=>bigImage(newDatosPersonales.cedPosterior)} onLoad={() => spinOff('spingCedula2')} className='border centerImg' id="imgCed2" width="40%" height="auto" src={newDatosPersonales.cedPosterior == '' ? params.globalVars.myUrl + "Images/Config/noPreview.jpg" : newDatosPersonales.cedPosterior} />
                            <span id='spingCedula2' style={{ display: '' }} className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <i onClick={()=>bigImage(newDatosPersonales.cedPosterior)} style={{ paddingTop: '1em', padding: '0.8em', display: newDatosPersonales.cedPosterior != '' ? '' : 'none' }} className="fa-solid fa-magnifying-glass-plus fa-xs btn btn-outline-info btn-sm"></i>
                        </div>
                    </div>
                    <hr style={{ width: '60%', margin: '0.5em', marginLeft: 'auto', marginRight: 'auto' }}></hr>
                    <div style={{ textAlign: 'center' }}>
                        <a onClick={mostrarDivTrabajo} className={divs.trabajo ? 'btn btn-success' : 'btn btn-outline-info'} style={{ fontSize: '1em', color: 'black', marginBottom: '0.5em' }} ><strong style={{ fontSize: '1em' }} >Datos de trabajo</strong></a>
                    </div>
                    {/* Div trabajo */}
                    <div style={{ backgroundColor: '#f4f4f4', padding: '0.3em', marginBottom: '1em', display: divs.trabajo ? '' : 'none' }}>
                        <div className="row justify-content-center">
                            <div className="col-lg-8 col-sm-12" >
                                <div style={{ backgroundColor: '#f4f4f4', padding: '0.3em' }}>
                                    <label style={{ fontSize: '1em' }} >Dirección de trabajo (Opcional)</label>
                                    <textarea name='dir_trabajo' onChange={cambioInfoDireccion} rows="2" placeholder="Dirección de trabajo" className="form-control" value={newDatosPersonales.dir_trabajo == '' ? '' : newDatosPersonales.dir_trabajo}></textarea>
                                    <p style={{ textAlign: 'justify', color: 'black' }}>Télefono de trabajo (Opcional)</p>
                                    <input name='tel_trabajo' type="text" onChange={cambioTelTrabajo} className="form-control rounded" value={newDatosPersonales.tel_trabajo == '' ? '' : newDatosPersonales.tel_trabajo} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <a onClick={mostrarDivFiador} className={divs.referencia ? 'btn btn-success' : 'btn btn-outline-info'} style={{ fontSize: '1em', color: 'black', marginBottom: '0.5em' }} ><strong style={{ fontSize: '1em' }} >Datos de referencia y letra</strong></a>
                    </div>
                    {/* Div fiador */}
                    <div style={{ backgroundColor: '#f4f4f4', padding: '0.3em', marginBottom: '1em', display: divs.referencia ? '' : 'none' }}>
                        <div className="row justify-content-center">
                            <div className="col-lg-8 col-sm-12" >
                                <div style={{ backgroundColor: '#f4f4f4', padding: '0.3em' }}>
                                    <p style={{ textAlign: 'justify', color: 'black' }}>Nombre referencia (Opcional)</p>
                                    <input name='nombre_fiador' type="text" onChange={cambioNombreFiador} className="form-control rounded" value={newDatosPersonales.nombre_fiador == '' ? '' : newDatosPersonales.nombre_fiador} />
                                    <label style={{ fontSize: '1em' }} >Dirección de referencia (Opcional)</label>
                                    <textarea name='dir_fiador' onChange={cambioDirDiador} rows="2" placeholder="Dirección de referencia" className="form-control" value={newDatosPersonales.dir_fiador == '' ? '' : newDatosPersonales.dir_fiador}></textarea>
                                    <p style={{ textAlign: 'justify', color: 'black' }}>Télefono de referencia (Opcional)</p>
                                    <input name='tel_fiador' type="text" onChange={cambioTelFiador} className="form-control rounded" value={newDatosPersonales.tel_fiador == '' ? '' : newDatosPersonales.tel_fiador} />
                                    <p style={{ textAlign: 'justify', color: 'black' }}>Valor letra (Opcional)</p>
                                    <input name='valor_letra' type="text" onChange={cambioLetra} className="form-control rounded" value={newDatosPersonales.letra == '' ? '' : newDatosPersonales.letra} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Datos usuario */}
                    <div style={{ textAlign: 'center' }}>
                        <a onClick={mostrarDivUsuario} className={divs.usuario ? 'btn btn-success' : 'btn btn-outline-info'} style={{ fontSize: '1em', color: 'black', marginBottom: '0.5em' }} ><strong style={{ fontSize: '1em' }} >Datos de cuenta</strong></a>
                    </div>
                    <div style={{ backgroundColor: '#f4f4f4', padding: '0.3em', display: divs.usuario ? '' : 'none' }}>
                        <div className="row justify-content-center">
                            <div className="col-lg-8 col-sm-12" >
                                <div style={{ backgroundColor: '#f4f4f4', padding: '0.3em' }}>
                                    <p style={{ textAlign: 'justify', color: 'black' }}>Nombre de usuario</p>
                                    <input name='usuario' type="text" onChange={cambioUsuario} className="form-control rounded" id="inputUsuario" value={newDatosPersonales.usuario == '' ? '' : newDatosPersonales.usuario} />
                                    <br />
                                    <p style={{ textAlign: 'justify', color: 'black' }}>E-mail (Opcional)</p>
                                    <input name='correo' type="text" onChange={cambioCorreo} className="form-control rounded" id="inputCorreo" defaultValue={newDatosPersonales.correo == '' ? '' : newDatosPersonales.correo} />
                                    <br />
                                </div>
                                <strong style={{ fontSize: '1em', display: '' }} >Contraseña</strong>
                                <div style={{ backgroundColor: '#f4f4f4', padding: '0.5em', display: '' }}>
                                    <input name='clave' type="password" onChange={cambioClave} id="inputClave" className="form-control rounded" value={newDatosPersonales.clave == '' ? '' : newDatosPersonales.clave} />
                                    <br />
                                </div>
                            </div>
                            <br />
                        </div>
                    </div>
                    <div style={{ textAlign: 'center' }} className="row justify-content-center">
                        <div className="col-12" >
                            <button style={{ backgroundColor: '#0b6730' }} className='btn btn-success' type='submit' id="btnModificarUsuario">{params.cliente.cedula == '' ? 'Crear Cliente' : 'Editar cliente'}</button>
                            <button id='btnLoadingUsuario' style={{ display: 'none', backgroundColor: 'green' }} className="btn btn-primary" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading...
                            </button>
                        </div>
                        <br /><br />
                        <div className="col-12" >
                            <button onClick={abrirDialogoEliminar} id='btnDialogoEliminar' style={{ marginTop: '0.5em', display: params.cliente.cedula == '' ? 'none' : 'inline', backgroundColor: 'red' }} className="btn btn-danger" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <br />
                </form>
            </div>
            <button type="button" id='btnModalImage' style={{ display: 'none' }} data-toggle="modal" data-target="#modalImage"></button>
            <ModalImage urlImagen={imageToModal}></ModalImage>
        </AuthenticatedLayout>
    )
}

export default IngresarClient