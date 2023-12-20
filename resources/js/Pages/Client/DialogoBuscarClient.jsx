import React from 'react'
import { useState, useEffect } from 'react';

const DialogoBuscarClient = (params) => {

    const [clientes, setClientes] = useState(params.encontrados)

    useEffect(() => {
        if (clientes.length != params.encontrados.length) {
            setClientes(params.encontrados)
        }
    })

    return (
        <div className="modal border" tabIndex="-1" id='dialogoSearchClients' role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 style={{ fontSize: '1.2em', marginLeft: '0.5em', textAlign: 'center' }} className="modal-title">Clientes encontrados</h1>
                        <button type="button" data-dismiss="modal">
                            <svg style={{ color: 'red' }} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-x-square" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </button>
                    </div>
                    <div className='container table-responsive' >
                        <table className="table table-striped roundedTable">
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Cedula</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientes.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className='align-middle'>{item.nombre}</td>
                                            <td className='align-middle'>{item.cedula}</td>
                                            <td>
                                                <a href={route('client.edit', item.cedula)} className='btn btn-success' style={{ backgroundColor: 'green' }}>
                                                    Detalles
                                                </a>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DialogoBuscarClient