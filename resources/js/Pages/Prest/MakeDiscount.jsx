import React from 'react'
import { useState, useEffect } from 'react'
import GlobalFunctions from '../services/GlobalFunctions'
import SecondaryButton from '@/Components/SecondaryButton'

const MakeDiscount = (params) => {
    const glob = new GlobalFunctions()
    const [datosPrest, setDatosPrest] = useState({
        fecha: '',
        prestamo: 0,
        mesesTransc: 0,
        redondeadoMesesTrans: 0,
        costoServicio: 0,
        costoServicioPesos: 0,
        totalCostoServicioMesesTransc: 0,
        totalPagarConDesc: 0,
        abonos: 0,
        totalPagarDescMenosAbonos: 0,
        saldoSinDescuento: 0,
        valorDescuento: 0
    })

    useEffect(() => {
        // redondeo meses transcurridos
        if (params.prest != null) {
            const redondeado = (params.prest.diasHastaHoy / 30)
            const redondeado1 = redondeado.toFixed(2)
            let redondMesesTrans = 0
            const timeMeses = parseFloat(params.prest.tiempo_meses)
            if (redondeado1 > timeMeses) {
                redondMesesTrans = params.prest.tiempo_meses
                document.getElementById('spanTiempoTransc').innerText = "Vencido="
            } else {
                redondMesesTrans = Math.ceil(redondeado1)
            }
            // calculo total interes en meses transcurridos
            const interesEntero = parseInt(params.prest.interes)
            const interesDecimal = parseFloat(interesEntero / 100)
            const interesMes = parseInt(params.prest.valorprestamo * interesDecimal)
            const totalIntereses = interesMes * redondMesesTrans
            // total a pagar con descuento
            const totalConDescuento = parseInt(params.prest.valorprestamo) + totalIntereses
            const totalMenosAbonos = totalConDescuento - parseInt(params.prest.tt_abonos)
            //valor del descuento
            const descuento = parseInt(params.prest.tt_saldo) - totalMenosAbonos
            setDatosPrest((valores) => ({
                ...valores,
                fecha: params.prest.fecha_prest,
                prestamo: params.prest.valorprestamo,
                costoServicio: params.prest.interes,
                saldoSinDescuento: params.prest.tt_saldo,
                abonos: params.prest.tt_abonos,
                mesesTransc: redondeado1,
                redondeadoMesesTrans: redondMesesTrans,
                costoServicioPesos: interesMes,
                totalCostoServicioMesesTransc: totalIntereses,
                totalPagarConDesc: totalConDescuento,
                totalPagarDescMenosAbonos: totalMenosAbonos,
                valorDescuento: descuento
            }))
        }
    }, [])

    return (
        <div className="modal fade" id="discountModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 style={{ fontWeight: 'bold' }} className="modal-title" id="exampleModalLabel">Descuento por pronto pago</h5>
                        <button type="button" data-dismiss="modal">
                            <svg style={{ color: 'red' }} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-x-square" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <table className="table table-striped">
                                <tbody>
                                    <tr>
                                        <th scope="row">Fecha préstamo</th>
                                        <td>{datosPrest.fecha}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Vencimiento</th>
                                        <td>{params.prest!=null ? params.prest.vencimiento : ''}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Valor Prestamo</th>
                                        <td>{glob.formatNumber(datosPrest.prestamo)} </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Tiempo transcurrido (meses)</th>
                                        <td>{datosPrest.mesesTransc} <span id='spanTiempoTransc'>aprox a</span> {datosPrest.redondeadoMesesTrans}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Costo servicio (%)</th>
                                        <td>{datosPrest.costoServicio}%. En pesos:  {glob.formatNumber(datosPrest.costoServicioPesos)} </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Total Costo servicio en meses transcurridos</th>
                                        <td>{glob.formatNumber(datosPrest.totalCostoServicioMesesTransc)}

                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Total a pagar con Descuento</th>
                                        <td>{glob.formatNumber(datosPrest.totalPagarConDesc)}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">- Abonos</th>
                                        <td>{glob.formatNumber(datosPrest.abonos)}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row " style={{ color: "green" }}>Total a pagar con descuento menos abonos</th>
                                        <td>{glob.formatNumber(datosPrest.totalPagarDescMenosAbonos)}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" style={{ color: "red" }}>Saldo sin descuento</th>
                                        <td>{glob.formatNumber(datosPrest.saldoSinDescuento)}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" style={{ color: "green" }}>Valor del descuento</th>
                                        <td>{glob.formatNumber(datosPrest.valorDescuento)}</td>
                                    </tr>

                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MakeDiscount