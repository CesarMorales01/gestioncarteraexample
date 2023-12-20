import React, { useState, useEffect, useRef } from 'react'
import GlobalFunctions from '../services/GlobalFunctions'
import '../../../css/general.css'
import SecondaryButton from '@/Components/SecondaryButton'
import ActiveButton from '@/Components/ActiveButton'
import checklogo from '../../../../public/Images/Config/checklogo.png'
import cancellogo from '../../../../public/Images/Config/cancellogo.png'

const DialogoHabilitarCarteras = (params) => {
    const glob = new GlobalFunctions()
    const [carterasSeleccionadas, setCarterasSeleccionadas] = useState([])
    const [asesor, setAsesor] = useState({
        'id': ''
    })

    useEffect(() => {
        if (asesor.id != params.asesorEdit.id) {
            if (params.asesorEdit.id != '') {
                cargarParametros()
            }
        }
    })

    function cargarParametros() {
        setAsesor(params.asesorEdit)
        const array = []
        if (params.asesorEdit.unable != '' && params.asesorEdit.unable != null) {
            const cartes = params.asesorEdit.unable.split(',')
            cartes.forEach(element => {
                array.push(element.trim())
            });
        }
        setCarterasSeleccionadas(array)
    }

    function loadingOn() {
        document.getElementById('btnHabCarteras').style.display = 'none'
        document.getElementById('btnLoadingHabCarteras').style.display = ''
    }

    function addCartera(item) {
        let find = false
        carterasSeleccionadas.forEach(element => {
            if (element == item.Nombre) {
                find = true
            }
        });
        if (find) {
            const filter = carterasSeleccionadas.filter((cart) => cart != item.Nombre);
            setCarterasSeleccionadas(filter)
            document.getElementById('img' + item.id).src = cancellogo
        } else {
            const array = carterasSeleccionadas
            array.push(item.Nombre)
            setCarterasSeleccionadas(array)
            document.getElementById('img' + item.id).src = checklogo
        }
    }

    function enviarFormulario() {
        //El layout no se actualiza con las variables de estado....
        document.getElementById('input_carteras').value = carterasSeleccionadas
        loadingOn()
        document.getElementById('Form_hab_carte').submit()
    }

    function selectAll() {
        const array = []
        if (carterasSeleccionadas.length == 0) {
            params.carteras.forEach(element => {
                array.push(element.Nombre)
            });
        }
        setCarterasSeleccionadas(array)
    }

    return (
        <div className="modal fade" id="modalHabilitarCarteras" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className='titulo'>Habilitar carteras para asesor {asesor.nombre}</h5>
                        <button onClick={selectAll} className='btn btn-outline-dark btn-sm'>
                            <i style={{ marginRight: '0.5em', display: carterasSeleccionadas.length == 0 ? '' : 'none' }} className="fa-regular fa-square-check fa-lg"></i>
                            <i style={{ marginRight: '0.5em', display: carterasSeleccionadas.length == 0 ? 'none' : '' }} className="fa-solid fa-ban fa-lg"></i>
                            {carterasSeleccionadas.length == 0 ? 'Seleccionar todas' : 'Quitar todas'}

                        </button>
                    </div>
                    <div className="modal-body">
                        <form method="get" action={route('carteras.edit', asesor.id)} id="Form_hab_carte">
                            <input type="hidden" id='input_carteras' name='carteras' value={carterasSeleccionadas} />
                        </form>
                        <div style={{ textAlign: 'center', padding: '1em' }} className="container">
                            <div className="row justify-content-center" >
                                {params.carteras.map((item, index) => {
                                    let img = cancellogo
                                    carterasSeleccionadas.forEach(element => {
                                        if (item.Nombre == element) {
                                            img = checklogo
                                        }
                                    })
                                    return (
                                        <div key={index} style={{ marginBottom: '1em' }} className="col-lg-4 col-md-4 col-sm-6 col-6"  >
                                            <div style={{ width: '11em', height: '9em' }} onClick={() => addCartera(item)} className="card border border-primary card-flyer pointer align-middle">
                                                <img id={'img' + item.id} style={{ width: '3em', height: '3em', marginTop: '1em' }} src={img} className="card-img-top img-fluid centerImg" alt="" />
                                                <div style={{ textAlign: 'center' }} className="card-body">
                                                    <h2 className="card-title superTitulo">{item.Nombre}</h2>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <SecondaryButton type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</SecondaryButton>
                        <ActiveButton onClick={enviarFormulario} type='button' id="btnHabCarteras" className="btn btn-success">Habilitar carteras</ActiveButton>
                        <ActiveButton id='btnLoadingHabCarteras' style={{ display: 'none', backgroundColor: 'gray' }} type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </ActiveButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DialogoHabilitarCarteras