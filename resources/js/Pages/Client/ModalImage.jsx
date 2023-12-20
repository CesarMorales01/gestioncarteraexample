import React from 'react'
import '../../../css/general.css'

const ModalImage = (params) => {
    return (
        <div className="modal fade bd-example-modal-lg" id='modalImage' tabIndex="-1" role="dialog" >
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <button style={{ textAlign: 'left', margin: '1em', marginBottom: '1.5em' }} type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <i className="fa-regular fa-rectangle-xmark fa-lg"></i>
                    </button>
                    <img className='centerImg rounded' alt='' src={params.urlImagen} style={{ margin: '1em', marginTop: '-1.5em', maxWidth: window.screen.width > 600 ? '50%' : '90%', maxHeight: 'auto' }}></img>
                </div>
            </div>
        </div>
    )
}

export default ModalImage