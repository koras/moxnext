import React, { useRef, useImperativeHandle, useState, useEffect } from 'react';

import ReactECharts from 'echarts-for-react';  
import { init, ECharts } from "echarts";
 
import moment from 'moment';
//import { eventsName } from "../../constants/general";



export function EchartsInfo(props: any) {

 
  const eChartsRef: any = useRef<ReactECharts>();
  const chart = useRef<ECharts>();
//  reloadDataChart();

// const containerRef = (element: HTMLDivElement | null) => {
//   // ignore if already set
//   if (element && !chart.current) {
//     // create a chart and set properties
//     const newChart = init(element);
//     newChart.setOption(getOption());
//  //   newChart.resize();
//     newChart.on("showTip", console.log);
//     // store to the chart ref
//     eChartsRef.current = newChart;
//     console.log(  eChartsRef.current );
//   }
// };



  useEffect(() => { 
 //  eChartsRef.current.echarts.setOption(options)
 
const options = getOption();




  options.series[0].data = props.period;
 
  console.log(options,props.period);

  //chart.current?.setOption(options);
  if (eChartsRef && eChartsRef.current)
        eChartsRef.current.getEchartsInstance().setOption(options)
  }, [props.period])


 

   

  const   onChartReadyCallback = ()=>{ 
   
  }
  
const   getOption = ()=>{ 
  const data = {

    grid:{
      left: '2%',
      right: '2%',
      bottom: '10%',
      containLabel: true
    },
    title: false,
    tooltip: {},
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "line",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  };
  return  data;
}


const onChartClick = (params: any) => {
  console.log('mey', params)
}
const onEvents = {
  'click': onChartClick,
}
 

 //
  return <ReactECharts
 // echarts={echarts}
  ref={eChartsRef}
  onEvents={onEvents}
//  click={{ onChartClick }}
  option={ getOption()}
  notMerge={true}
  
  
//  lazyUpdate={true}
//  theme={"theme_name"}
//  onChartReady={onChartReadyCallback}
  // onEvents={EventsDict}
 // opts={}
/>
 

} 