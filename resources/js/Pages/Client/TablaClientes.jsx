import React from 'react'
import Paginacion from './Paginacion'
import DialogoLoading from '../UIGeneral/DialogoLoading'

const TablaClientes = (params) => {

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

    return (
        <div style={{ margin: '0.5em' }} className='table-responsive'>
            <table className="table table-striped  roundedTable">
                <thead className='navBarFondo align-middle'>
                    <tr>
                        <th style={{ textAlign: 'center' }} scope="col">Nombres</th>
                        <th style={{ textAlign: 'center' }} scope="col">Apellidos</th>
                        <th style={{ textAlign: 'center' }} scope="col">Cedula</th>
                        <th style={{ textAlign: 'center' }} scope="col">Direccion de domicilio</th>
                        <th style={{ textAlign: 'center' }} scope="col">Direccion de trabajo</th>
                        <th style={{ textAlign: 'center', display: params.permisos.includes('editar-cliente') ? '' : 'none' }} scope="col">Detalles</th>
                    </tr>
                </thead>
                <tbody>
                    {params.noData ?
                        <tr style={{ marginTop: '1.5em' }} className='container'><td colSpan='6'>No se han encontrado resultados....</td></tr>
                        :
                        params.clientes.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <th>{item.nombre}</th>
                                    <td>{item.apellidos}</td>
                                    <td>{item.cedula}</td>
                                    <td>{item.direccion}</td>
                                    <td>{item.direccion_trabajo}</td>
                                    <th style={{ textAlign: 'center', display: params.permisos.includes('editar-cliente') ? '' : 'none' }}>
                                        <a onClick={loadingTimeOut} href={route('client.edit', item.cedula)} className='btn btn-outline-info' style={{ cursor: 'pointer' }} >
                                            <i className="fa-solid fa-circle-info fa-lg"></i>
                                        </a>
                                    </th>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {params.noData ?
                ''
                :
                <Paginacion class="mt-6" links={params.pagination}></Paginacion>
            }
            <button id='btnModalLoading' type="button" style={{ display: 'none' }} data-toggle="modal" data-target="#modalLoading">
            </button>
            <DialogoLoading url={params.globalVars.myUrl}></DialogoLoading>
        </div>
    )
}

export default TablaClientes