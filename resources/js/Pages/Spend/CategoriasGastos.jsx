import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import React from 'react'
import Swal from 'sweetalert2'
import NuevaCategoriaGasto from './NuevaCategoriaGasto';


const CategoriasGastos = (params) => {

    function fetchConfirmarEliminar(id) {
        loadingOn(id)
        const url = params.globalVars.myUrl + 'cateSpend/' + id + "/edit"
        fetch(url)
            .then((response) => {
                return response.json()
            }).then((json) => {
                if (json == 'No puedes eliminar esta categoria porque esta ocupada en algunos gastos!') {
                    sweetAlert(json)
                    loadingOff(id)
                } else {
                    window.location = params.globalVars.myUrl + 'spend/list/Categoria eliminada!'
                }
            })
    }

    function sweetAlert(mensaje) {
        Swal.fire({
            title: mensaje,
            icon: 'warning',
            timer: 2000
        })
    }

    function loadingOn(id) {
        document.getElementById(id + 'btnliminarCategoriaIngresoLoading').style.display = ''
        document.getElementById(id + 'btnliminarCategoriaIngreso').style.display = 'none'
    }

    function loadingOff(id) {
        document.getElementById(id + 'btnliminarCategoriaIngresoLoading').style.display = 'none'
        document.getElementById(id + 'btnliminarCategoriaIngreso').style.display = ''
    }

    function sweetEliminar(item) {
        Swal.fire({
            title: '¿Eliminar la categoria ' + item.nombre + " ?",
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            confirmButtonColor: '#cc0000',
            cancelButtonColor: 'gray',
        }).then((result) => {
            if (result.isConfirmed) {
                fetchConfirmarEliminar(item.id)
            }
        })
    }

    function cerrarDialogoNuevaCate() {
        document.getElementById('btnNuevaCategoria').click()
    }

    return (
        <div className="modal fade bd-example-modal-lg" id='dialogoCategorias' tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 style={{ fontSize: '1.5em', marginLeft: '0.5em' }} className="modal-title" id="exampleModalLabel">Categorias gastos</h1>
                        <button type="button" data-dismiss="modal">
                            <svg style={{ color: 'red' }} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-x-square" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </button>
                    </div>
                    <div className='container' style={{ margin: '0.2em' }}>
                        <div style={{ marginTop: '1em', marginBottom: '1em' }} className="container" >
                            <PrimaryButton type="button" id='btnNuevaCategoria' data-toggle="modal" data-target="#dialogoNuevaCategoriaIngreso" className='btn btn-success btn-sm'>
                                Nueva categoria
                            </PrimaryButton>
                            <NuevaCategoriaGasto cerrar={cerrarDialogoNuevaCate} token={params.token}></NuevaCategoriaGasto>
                        </div>
                        <div className='container table-responsive'>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Categoria</th>
                                        <th scope="col">Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {params.categorias.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.nombre}</td>
                                                <td >
                                                    <button id={item.id + 'btnliminarCategoriaIngreso'} onClick={() => sweetEliminar(item)} className='border border-dark rounded cursorPointer' style={{ padding: '0.2em', backgroundColor: 'red' }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                        </svg>
                                                    </button>
                                                    <div style={{ display: 'none' }} id={item.id + 'btnliminarCategoriaIngresoLoading'} className="spinner-border text-danger" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <br />
                </div>
            </div>
        </div>
    )
}

export default CategoriasGastos