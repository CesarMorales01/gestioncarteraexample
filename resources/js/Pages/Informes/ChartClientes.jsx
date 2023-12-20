import React from 'react'
import LineChart from 'echarts-for-react';

export const ChartClientes = (params) => {

    const option = {
        xAxis: {
          type: 'category',
          data: params.totales.meses
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: params.totales.total_clientes,
            type: 'line',
            name: 'Total clientes'
          },
          {
            data: params.totales.total_prestamos,
            type: 'line',
            name: 'Total prestamos'
          },
          {
            data: params.totales.total_clientes_sinsaldo,
            type: 'line',
            name: 'Total clientes sin saldo'
          }
        ],
        tooltip: {
          trigger: 'axis',
        }
      }; 


  return (
    <LineChart option={option} />
  )
}