import { Autocomplete, TextField } from '@mui/material'

import React, { useState, useEffect } from 'react'
import DialogoBuscarClient from '../Client/DialogoBuscarClient'
import DialogoBuscarClient1 from '../Client/DialogoBuscarClient1'

function AutoCompleteSm(params) {

    const [value, setValue] = React.useState('')
    const [inputValue, setInputValue] = React.useState('')
    const [datos, setDatos] = React.useState([])
    const [encontrados, setEncontrados] = React.useState([])

    useEffect(() => {
        getSize()
        if (datos.length == 0) {
            getDatosClientes()
        }
        const keyDownHandler = event => {
            if (event.key == 'X') {
                document.getElementById('combo-box-demo').focus()
                setTimeout(() => {
                    setInputValue('')
                }, 100);
            }
        }
        document.addEventListener('keydown', keyDownHandler);
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        }
    }, [])

    window.onresize = getSize

    function getSize() {
        let ancho = window.innerWidth;
        if (ancho < 1090 && ancho > 700 & document.getElementById('btnSearch') != null) {
            document.getElementById('btnSearch').style.display = 'none'
        } else {
            document.getElementById('btnSearch').style.display = 'inline'
        }
    }

    function getDatosClientes() {
        let data = []
        if(data.length==0){
            params.clientes.forEach(element => {
                element.forEach(element => {
                    let nombre = ''
                    if (element.apellidos != '' && element.apellidos!=null) {
                        nombre = element.nombre + " " + element.apellidos
                    } else {
                        nombre = element.nombre
                    }
                    let opt = new OptionsAuto(element.cedula, nombre)
                    data.push(opt)
                })
            })
            setDatos(data)
        }
    }

    function getInputChange(newInputValue) {
        // se ejecuta siempre que hay cambio en el input
        setInputValue(newInputValue)
    }

    function loadinOnAutoComplete() {
        const botones=document.getElementsByClassName("btnSearchAutocomplete")
        botones[0].style.display ='none';
        botones[1].style.display ='none';
        const botonesLoading=document.getElementsByClassName("btnSearchLoadingAutocomplete")
        botonesLoading[0].style.display ='';
        botonesLoading[1].style.display ='';
    }

    function getOnchange(newValue) {
        // Se ejecuta al cambiar un valor del array
        const tipo = typeof newValue
        if (tipo === 'object') {
            if (newValue != null) {
                loadinOnAutoComplete()
                window.location.href = params.globalVars.myUrl + 'client/' + newValue.id + "/edit"
            }
        } else {
            buscarClientesArray(newValue)
        }
    }

    function buscarClientesArray(newValue) {
        newValue=newValue.toLowerCase()
        let newArray = []
        params.clientes.forEach(element => {
            element.forEach(element => {
                let encontrado = ''
                if (element.nombre.toLowerCase().includes(newValue)) {
                    encontrado = element
                }
                if (element.apellidos != '' && element.apellidos != null && encontrado == '') {
                    if (element.apellidos.toLowerCase().includes(newValue)) {
                        encontrado = element
                    }
                }
                if (element.direccion != '' && element.direccion != null && encontrado == '') {
                    if (element.direccion.toLowerCase().includes(newValue)) {
                        encontrado = element
                    }
                }
                if (encontrado != '') {
                    newArray.push(encontrado)
                }
            })
        })
        console.log(newArray)
        setEncontrados(newArray)
        document.getElementById('btnDialogoBuscarClient1').click()
    }

    function buscar() {
        buscarClientesArray(inputValue)
    }

    function submitHandler(e) {
        e.preventDefault();
    }

    return (
        <div >
            <form style={{ marginLeft: '0.3em', padding: '0.3em' }} onSubmit={submitHandler} id="formAutocomplete" className="form-inline">
                <div className="input-group">
                    <Autocomplete onBlur={() => params.buscarActive(false)} onFocus={() => params.buscarActive(true)} className='rounded' style={{ backgroundColor: 'white' }}
                        disablePortal
                        id="combo-box-demo"
                        value={value}
                        sx={{ width: 260 }}
                        renderInput={(params) => <TextField id='autoCompleteTF' {...params} InputLabelProps={{ style: { color: 'black' } }} label="Buscar cliente..." size="small" />}
                        onChange={(_, newValue) => {
                            getOnchange(newValue)
                        }}
                        inputValue={inputValue}
                        onInputChange={(_, newInputValue) => {
                            getInputChange(newInputValue)
                        }}
                        options={datos}
                        freeSolo
                    />
                    <button id='btnSearch' type='button' className='btn btn-success btnSearchAutocomplete' onClick={buscar}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </button>
                    <button style={{ display: 'none' }} id='btnSearchLoading' type='button' className='btn btn-success btnSearchLoadingAutocomplete'>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    </button>
                </div>
            </form>
            <button id='btnDialogoBuscarClient1' type='button' data-toggle="modal" data-target="#dialogoSearchClients1"></button>
            <DialogoBuscarClient1 encontrados={encontrados}></DialogoBuscarClient1>
        </div>
    )
}

export default AutoCompleteSm;

class OptionsAuto {
    constructor(id, label) {
        this.id = id;
        this.label = label;
    }

    getLabel() {
        return this.label
    }

    getId() {
        return this.id
    }

}