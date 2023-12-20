import React from 'react'
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react';

const Error403 = (params) => {

  useEffect(() => {
    Swal.fire({
      title: params.resp,
      icon: 'warning',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000
    })
    setTimeout(() => {
      window.location.href= params.globalVars.myUrl
    }, 3000);
  }, [])

  return (
    <div >

    </div>
  )
}

export default Error403
