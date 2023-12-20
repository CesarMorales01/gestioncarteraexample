import React from 'react'

const DialogoMostrarTelefonos = (params) => {
    return (
        <div id='dialogoMostrarTelefonos' className="modal" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <i className="fa-regular fa-rectangle-xmark fa-lg"></i>
                        </button>
                    </div>
                    <div style={{ textAlign: 'center' }} className="modal-body">
                        {params.telefonos.map((item, index)=>{
                            return(
                                <li key={index}>{item}</li>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DialogoMostrarTelefonos