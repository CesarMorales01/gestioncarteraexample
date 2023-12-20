import React from 'react'
import LineChart from 'echarts-for-react';

export const ChartTotales = (params) => {
 
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
            data: params.totales.totales,
            type: 'line',
            name: 'Total cuentas'
          },
          {
            data: params.totales.saldos,
            type: 'line',
            name: 'Total saldos'
          },
          {
            data: params.totales.abonos,
            type: 'line',
            name: 'Total abonos'
          },
          {
            data: params.totales.mora,
            type: 'line',
            name: 'Total cartera en mora'
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
