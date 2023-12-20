import React from 'react'
import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import '../../../css/general.css'
import GlobalFunctions from '../services/GlobalFunctions'
import DialogoLoading from '../UIGeneral/DialogoLoading';
import Swal from 'sweetalert2'

const Listas = (params) => {
    const glob = new GlobalFunctions()
    const [permisos, setPermisos] = useState([])
    const [lista, setLista] = useState(params.listas)
    const [cargar, setCargar] = useState(false)
    const [carteSelected, setCarteSelected] = useState(params.cartera)

    useEffect(() => {
        setPermisos(glob.cargarPermisos(params.datos.auth.permissions))
    }, [])

    useEffect(() => {
        if (cargar) {
            fetchListas()
        }
    }, [carteSelected])

    function fetchListas() {
        loading()
        const url = params.globalVars.myUrl + 'listas?_token=' + params.token
        const obj = {
            'cartera': carteSelected,
        }
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
            if(json.length>0){
                setCarteSelected(json[0].cobro)
            }
            setLista(json)
        })
    }

    function abrirDialogo(item) {
        let content = item.split(',')
        let newContent = ''
        content.forEach(element => {
            newContent = newContent + element + "<br></br>"
        });
        Swal.fire({
            html:
                newContent,
        })
    }

    function confirmarBorrar(id) {
        Swal.fire({
            title: '¿Eliminar registro ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        }).then((result) => {
            if (result.isConfirmed) {
                loading()
                document.getElementById('formEliminar' + id).submit()
            }
        })
    }

    function loading() {
        document.getElementById('btnModalLoading').click()
    }

    function loadingOff() {
        document.getElementById('btnCloseModalLoading').click()
    }

    function cambioCartera(e) {
        setCargar(true)
        setCarteSelected(e.target.value)
    }

    return (
        <>
            <Head title="Listas" />
            <h1 className='titulo' style={{ margin: '1em', textAlign: 'center' }}><strong>Listas {params.cartera}</strong></h1>
            <div style={{ textAlign: 'centera', width: '40%', marginTop: '-0.2em' }} className='container'>
                <select value={carteSelected} onChange={cambioCartera} className="form-select rounded" >
                    {params.carteras.map((item, index) => {
                        return (
                            <option key={index} value={item} >{item}</option>
                        )
                    })}
                </select>
            </div>
            <div style={{ textAlign: 'center' }} className='table-responsive'>
                <table style={{ margin: '0.5em' }} className="table table-sm">
                    <thead className="navBarFondo">
                        <tr>
                            <th style={{ color: 'white' }} >Fecha</th>
                            <th style={{ color: 'white' }} >Total cobrado</th>
                            <th style={{ color: 'white' }} >Total egresos</th>
                            <th style={{ color: 'white' }} >Efectivo neto</th>
                            <th style={{ color: 'white' }} >Lista</th>
                            <th style={{ color: 'white' }} >Asesor</th>
                            <th style={{ color: 'white', display: permisos.includes('borrar-listas') ? '' : 'none' }} >Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.length == 0 ?
                            <tr style={{ marginTop: '1.5em' }} className='container'><td colSpan='7'>No se han encontrado resultados....</td></tr>
                            :
                            lista.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.fecha}</td>
                                        <td>{item.total_cobrado}</td>
                                        <td>{item.total_egresos}</td>
                                        <td>{item.total_neto}</td>
                                        <textarea readOnly onClick={() => abrirDialogo(item.lista)} value={item.lista}></textarea>
                                        <td>{item.asesor}</td>
                                        <td>
                                            <form method="get" id={"formEliminar" + item.id} action={route('listas.show', item.id)} >
                                                <input type="hidden" name="id" value={item.id} />
                                                <input type="hidden" name="Cobro" value={carteSelected} />
                                            </form>
                                            <button id={'btnEliminar' + item.id} onClick={() => confirmarBorrar(item.id)} className='border border-dark rounded cursorPointer' style={{ display: permisos.includes('borrar-listas') ? '' : 'none', padding: '0.2em', backgroundColor: 'red' }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })

                        }
                    </tbody>
                </table>
                <button id='btnModalLoading' type="button" style={{ display: 'none' }} data-toggle="modal" data-target="#modalLoading">
                </button>
                <DialogoLoading url={params.datos.globalVars.myUrl}></DialogoLoading>
            </div>
            <button id='btnModalLoading' type="button" style={{ display: 'none' }} data-toggle="modal" data-target="#modalLoading">
            </button>
            <DialogoLoading url={params.globalVars.myUrl}></DialogoLoading>
        </>
    )
}

export default Listas