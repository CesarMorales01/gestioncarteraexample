import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react'
import Progressbar from './UIGeneral/ProgressBar'
import logoInformes from '../../../public/Images/Config/reports.webp'
import logoEgresos from '../../../public/Images/Config/spend.jpg'
import logoClientes from '../../../public/Images/Config/clientes.webp'
import logoCarteras from '../../../public/Images/Config/folderLogo.png'
import logoAsesores from '../../../public/Images/Config/asesoresLogo.png'
import logoSolicitudes from '../../../public/Images/Config/solicitudeslogo.png'
import '../../css/general.css'
import CopyRight from './UIGeneral/CopyRight';

export default function Dashboard(params) {

    const [progressBar, setProgressBar] = useState(false)
    const [permisos, setPermisos] = useState([])

    useEffect(() => {
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

    function buscarActive(e) { }

    function goInformes() {
        window.location = params.globalVars.myUrl + "informes/list/nothing"
        setProgressBar(true)
    }

    function goEgresos() {
        window.location = params.globalVars.myUrl + "spend/list/nothing"
        setProgressBar(true)
    }

    function goClientes() {
        window.location = params.globalVars.myUrl + "clientes/nothing"
        setProgressBar(true)
    }

    function goCarteras() {
        window.location = params.globalVars.myUrl + "carteras/list/nothing"
        setProgressBar(true)
    }

    function goAsesores() {
        window.location = params.globalVars.myUrl + "user/list/nothing"
        setProgressBar(true)
    }

    function goSolicitudes() {
        const url = params.globalVars.urlRoot + 'Respuestas_solicitudes_dos.php'
        window.open(url, "nuevo", "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=800, height=600");
    }

    function getClass() {
        let clase = 'col-lg-4 col-md-4 col-sm-6 col-6'
        if (params.auth.role[0] == 'Usuario') {
            clase = 'col-lg-6 col-md-6 col-sm-12 col-12'
        }
        if (params.auth.role[0] == 'Superusuario') {
            clase = 'col-6'
        }
        return clase
    }

    return (
        <AuthenticatedLayout
            user={params.auth}
            clientes={params.clientes}
            globalVars={params.globalVars}
            buscarActive={buscarActive}
        >
            <Head title="Lobby" />
            <div className="py-2">
                <div style={{ display: progressBar ? '' : 'none' }}>
                    <Progressbar progress={progressBar}></Progressbar>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div style={{ textAlign: 'center', padding: '1em' }} className="container">
                            <div className="row justify-content-center" >
                                <div style={{ marginBottom: '1em' }} className={getClass()}  >
                                    <div onClick={goClientes} className="card border border-primary card-flyer pointer">
                                        <img style={{ width: '10em', height: '10em', marginTop: '1em' }} src={logoClientes} className="card-img-top img-fluid centerImg" alt="" />
                                        <div style={{ textAlign: 'center' }} className="card-body">
                                            <h2 className="card-title superTitulo">Clientes</h2>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginBottom: '1em', marginBottom: '1em' }} className={getClass()}  >
                                    <div onClick={goInformes} className="card border border-primary card-flyer pointer">
                                        <img style={{ width: '12em', height: '10em', marginTop: '1em' }} src={logoInformes} className="card-img-top img-fluid centerImg" alt="" />
                                        <div style={{ textAlign: 'center' }} className="card-body">
                                            <h2 className="card-title superTitulo">Informes</h2>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: permisos.includes('ver-gastos') ? '' : 'none', marginBottom: '1em' }} className={getClass()} >
                                    <div onClick={goEgresos} className="card border border-primary card-flyer pointer">
                                        <img style={{ width: '12em', height: '10em', marginTop: '1em' }} src={logoEgresos} className="card-img-top img-fluid centerImg" alt="" />
                                        <div style={{ textAlign: 'center' }} className="card-body">
                                            <h2 className="card-title superTitulo">Gastos</h2>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: permisos.includes('ver-gastos') ? '' : 'none', marginBottom: '1em' }} className={getClass()}  >
                                    <div onClick={goSolicitudes} className="card border border-primary card-flyer pointer">
                                        <img style={{ width: '10em', height: '10em', marginTop: '1em' }} src={logoSolicitudes} className="card-img-top img-fluid centerImg" alt="" />
                                        <div style={{ textAlign: 'center' }} className="card-body">
                                            <h2 className="card-title superTitulo">Solicitudes</h2>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: permisos.includes('editar-carteras') ? '' : 'none', marginBottom: '1em' }} className="col-lg-4 col-md-4 col-sm-6 col-6"  >
                                    <div onClick={goCarteras} className="card border border-primary card-flyer pointer">
                                        <img style={{ width: '10em', height: '9em', marginTop: '1.8em' }} src={logoCarteras} className="card-img-top img-fluid centerImg" alt="" />
                                        <div style={{ textAlign: 'center' }} className="card-body">
                                            <h2 className="card-title superTitulo">Carteras</h2>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: permisos.includes('editar-usuarios') ? '' : 'none', marginBottom: '1em' }} className="col-lg-4 col-md-4 col-sm-6 col-6"  >
                                    <div onClick={goAsesores} className="card border border-primary card-flyer pointer">
                                        <img style={{ padding: '0.5em', width: '14em', height: '10em', marginTop: '1em' }} src={logoAsesores} className="card-img-top img-fluid centerImg" alt="" />
                                        <div style={{ textAlign: 'center' }} className="card-body">
                                            <h2 className="card-title superTitulo">Asesores</h2>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: params.auth.role[0]!='Administrador' ? '' : 'none' }}>
                                    <CopyRight globalVars={params.globalVars}></CopyRight>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
