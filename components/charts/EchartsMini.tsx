import React, { useRef, useImperativeHandle, useState, useEffect } from 'react';

import ReactECharts from 'echarts-for-react';
import { init, ECharts } from "echarts";
import { eventsName } from "../../constants/general";

import moment from 'moment';



export default function EchartsMini(props: any) {

  const [xAxis, setXAxis] = useState<any | null>(null);
  //const [yAxis, setYAxis] = useState<any | null>(null);



  let xAxisTMP: string[] = [];
  let yAxis: string[] = [];

  const eChartsRef: any = useRef<ReactECharts>();
  const chart = useRef<ECharts>();


  xAxisTMP = [];
  //  yAxis = []; 

  // старая дата  
  for (const item of props.prices) {
    yAxis.push(item.price)
  }


  const getOption = () => {
    const data = {
      blur: {
        areaStyle: {
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowBlur: 10
        }
      },
      grid: {
        disabled: true,
        left: '0%',
        right: '0%',
        bottom: '0%',
        containLabel: false
      },
      style: {
        height: '120',
        width: '100%'
      },
      title: false,
      tooltip: {

      },
      xAxis: {

        xisTick: {
          show: false, // Hide Ticks,
        },
        splitLine: {
          show: false
        },
        data: yAxis,
        axisTick: {
          show: false, //为 false 时隐藏
          alignWithLabel: false,
          interval: 0, //可以设置成 0 强制显示所有tick, 不是 label
          length: 0, // tick 长度, 默认5
          lineStyle: {
            color: 'rgb(106,104,103)',
            width: 0 //tick 宽度
          }
        },
        axisLabel: {
          show: false,
        },

        axisLine: {
          show: false,
          lineStyle: {
            color: 'rgb(106,104,103)',
            width: 0
          }
        },
      },
      yAxis: {
        splitLine: {
          show: false
        }
      },
      
      series: [
        {
          animation: false,
          type: 'line',
          data: yAxis,
          triggerLineEvent: true,
          symbol: 'none',

   


          areaStyle: {

            color: 'rgba(225,236,230,1)',
            opacity: 0.4,
          },

          emphasis: {
            disabled: true,
          },
          lineStyle: {
            color: 'rgba(144,163,155,1)',
            shadowBlur: 0,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            opacity: 1,
            borderType: [0],
            borderDashOffset: 0,
            shadowColor: 'rgba(0, 0, 0, 0)',
            width: 2,

          },
          itemStyle: {

            color: '#0770FF',
            opacity: 0.7,
          },
          smooth: false,
        },
      ],
    };
    return data;
  }


  const onChartClick = (params: any) => {
    // console.log('mey', params)
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
    option={getOption()}
    notMerge={true}

    style={{
      height: 120,
      width: '100%'
    }}

    lazyUpdate={true}
  //  theme={"theme_name"}
  //  onChartReady={onChartReadyCallback}
  // onEvents={EventsDict}
  // opts={}
  />


} 