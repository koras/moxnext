import React,{useRef, useImperativeHandle,useEffect } from 'react';



//import ReactECharts from 'echarts-for-react';  // or var ReactECharts = require('echarts-for-react');
import  echarts,{ EChart } from '@hcorta/react-echarts'

import { instrument } from "../../stories/storeInstrument";

//import faker from 'faker';




/**
 * https://echarts.apache.org/examples/en/editor.html?c=area-basic
 */
 
/**
 * documentation 
 * @link https://www.chartjs.org/docs/latest/developers/updates.html
 * 
 */

 export function EchartsInfo(props:any, ref:any) {

  const  ticker =   props.ticker;
 

  
  
 

  useEffect(()=>{
    childMethod();


  },[props.period])
  
  // useImperativeHandle(ref, () => ({
  //   childMethod() {
  //     childMethod()
  //   }
  // }))

  const  childMethod = () => {
    console.log('call me');
 
  }
 
 

  let  dataInfo = instrument.getChart(ticker);
 
  console.log('props.rangeTime',props.rangeTime)
  let xAxis = [];
  let yAxis = [];


  // console.log(dataInfo )
  // for(const item of dataData){
   for(const item of dataInfo ){
   // console.log(item)
    xAxis.push(item.Price);
    yAxis.push(item.Date);
   
   }





  const chartRef:any = useRef('chart');


  const getOption = () => {

  }

  const EventsDict = () => {

  }

 

// const colr =   new echarts.graphic.LinearGradient(0.4, 0.3, 1, [
//               {
//                 offset: 0,
//                 color: 'rgb(255, 158, 68)'
//               }//,
//             //  {
//               //  offset: 1,
//              //   color: 'rgb(255, 70, 131)'
//             //  }
//             ]);

console.log( 'EChart.graphic');
//console.log( (new EChart).graphic);
// https://codesandbox.io/s/react-chartjs-2-line-chart-example-5z3ss
//dataData
  return (
    <EChart
      style={{height: '550px', width: '100%'}}
   //   className={'my-classname'}
      xAxis={{
   //     type: 'category',
        boundaryGap: false,
         data:    yAxis
      }}
      yAxis={{
        type: 'value',
    //    boundaryGap: [0, '100%']
    
    //  label: {
       // show: true,
      //  formatter: function (params:any) {
      //    console.log(params);
      //    return echarts.format.formatTime('yyyy-MM-dd', params.value);
      //  },
   //     backgroundColor: '#7581BD'
      //},
      //handle: {
      //  show: false,
      //  color: '#7581BD'
     // }

      }}
      series={
        {
          type: 'line',
          data:  xAxis,
          triggerLineEvent: false,
          symbol: 'none',
          sampling: 'lttb', 
          silent: true,
          itemStyle: {
            color: '#6a6867' 
          },
          areaStyle: {
            color: '#dadada', 
          },
        }
      }
    />
  )

}
// EChart