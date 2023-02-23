import React, { useRef, useImperativeHandle, useEffect } from 'react';



//import ReactECharts from 'echarts-for-react';  // or var ReactECharts = require('echarts-for-react');
import { EChart } from '@hcorta/react-echarts'

import { instrument } from "../../stories/storeInstrument";

import { eventsName } from "../../constants/general";

//import faker from 'faker';




/**
 * https://echarts.apache.org/examples/en/editor.html?c=area-basic
 */

/**
 * documentation 
 * @link https://www.chartjs.org/docs/latest/developers/updates.html
 * 
 */

export function EchartsInfo(props: any, ref: any) {

  const ticker = props.ticker;



  const chartRef: any = useRef('chart');




  useEffect(() => {
    childMethod();


  }, [props.period])

  // useImperativeHandle(ref, () => ({
  //   childMethod() {
  //     childMethod()
  //   }
  // }))

  const childMethod = () => {
    console.log('call me');

  }



  let dataInfo = instrument.getChart(ticker);

  console.log('props.rangeTime', props.rangeTime)
  let xAxis = [];
  let yAxis = [];
  let  tmp = {};
  // события на графике
  let markEvent = [];


  const getMarksConst = (item:any) => {
    const dataColor =   eventsName.filter((el) =>  el.value === +item.typeId);
    return dataColor[0];
    }
  
  for (const item of dataInfo) {
    xAxis.push(item.price);
    yAxis.push(item.date);

    // name: 'Mark',
    // coord: ['2019-01-18', 500],
    // //      value: "Сплит акций",
    // symbol: 'circle',
    // symbolSize: 15,
    // silent: true,
    // click: onClick,
    // itemStyle: {
    //   color: 'rgb(41,60,85)'
    // }
 

 
      if(item.typeId && +item.typeId !== 0){
      const dataMark =   getMarksConst(item);
        console.log( +item.typeId, item);
       tmp =  {
            name: item.title,
            coord:[item.date, item.price],
            symbol: 'circle',
            symbolSize: dataMark.symbolSize,
            silent: true,
            click: ()=>onClick,
            itemStyle: {
                  color: dataMark.color
            }
          }
       //     console.log( tmp);
        markEvent.push(tmp)
      }
    //eventsName


  }

 


//https://codesandbox.io/s/series-line-echart-forked-5p0ej?file=/src/xAxis-category.js
  const getOption = () => {

  }
  const upColor = '#ec0000';
  const upBorderColor = '#8A0000';
  const downColor = '#00da3c';
  const downBorderColor = '#008F28';
  console.log('EChart.graphic');
  //console.log( (new EChart).graphic);
  // https://codesandbox.io/s/react-chartjs-2-line-chart-example-5z3ss
  //dataData



  const onClick = (params:any) => {
    console.log('mey onClick',params)
  }
  const onChartClick = (params: any) => {
    console.log('mey', params)
  }

  const onEvents = {
    'click': onChartClick,
  }
  // https://echarts.apache.org/examples/en/editor.html?c=candlestick-sh
  return (
    <EChart

      ref={(e: any) => { chartRef }}
      onEvents={onEvents}

      click={{ onChartClick }}



      blur={{
        areaStyle: {
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowBlur: 10
        }
      }}

      grid={{
        left: '2%',
        right: '2%',
        bottom: '10%',
        containLabel: true
      }}
      style={{ height: '500px', width: '100%' }}
      //   className={'my-classname'}


      xAxis={{
        animation: false,
        triggerEvent: false,
        silent:  false,
        showGrid: true, 
        data: yAxis, 
        nameGap: 0, 
        axisTick: { 
          show: true, //为 false 时隐藏
          alignWithLabel: true,
          interval: 0, //可以设置成 0 强制显示所有tick, 不是 label
          length: 1, // tick 长度, 默认5
          lineStyle: {
            color: "gray",
            width: 2 //tick 宽度
          }
        },
        axisLabel: {
          //x轴上标签
           show: true, 
        },

        axisLine: {
          //轴线
          show: true, //false 时隐藏
          lineStyle: {
            color: "green", //同时改变了 label 颜色
            width: 0 //x轴线条粗细，默认1px
          }
        },
      }}
      yAxis={{
 
      }}

      tooltip={{
        //  trigger: 'axis',
        triggerOn: 'click',
        //   alwaysShowContent: true,
        position: function (pt: any) {
          console.log(pt);
          return [pt[0], 13];
        }
      }}

      // singleAxis={ {
      //   top: 50,
      //   bottom: 50,
      //   axisTick: {},
      //   axisLabel: {},
      //   type: 'time',
      //   axisPointer: {
      //     animation: true,
      //     label: {
      //       show: true
      //     }
      //   },
      //   splitLine: {
      //     show: true,
      //     lineStyle: {
      //       type: 'dashed',
      //       opacity: 0.2
      //     }
      //   }
      // }}


      series={
        {

          animation: false,
          type: 'line', 
          data: xAxis,
          triggerLineEvent: true,
          symbol: 'none',

          silent: false,
          symbolSize: 5,
          sampling: 'lttb', 
        splitLine: {
            show: true,
          lineStyle: {
            type: 'dashed',
            opacity: 1
          }
        },
        axisPointer: {
          animation: true,
          label: {
            show: true
          }
        },

 
          areaStyle: {
 
             color: ['rgba(225,236,230,1)'], 
            opacity: 0.4, 
          },
          
          emphasis:{
            disabled:true,
          },
          lineStyle: {
            color: ['rgba(144,163,155,1)', 'rgba(144,163,155,1)'],
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
            opacity:  0.7, 
          },
          markPoint: {
            //    silent :true,
            label: {
              formatter: (param: any) => {
                console.log("test");
                console.log(param);
                // return "asdfasdf";
                //    return param != null ? Math.round(param.value) + '' : '';
              }
            },
            // data: [
            //   {
            //     name: 'Mark',
            //     coord: ['2019-01-18', 500],
            //     //      value: "Сплит акций",
            //     symbol: 'circle',
            //     symbolSize: 15,
            //     silent: true,
            //     click: onClick,
            //     itemStyle: {
            //       color: 'rgb(41,60,85)'
            //     }
            //   },
            //   {
            //     name: 'Mark1',
            //     coord: ['2021-07-23', 200],
            //     //      value: "Сплит акций",
            //     symbol: 'circle',
            //     symbolSize: 15,
            //     silent: true,
            //     click: onClick,
            //     itemStyle: {
            //       color: 'rgba(178, 177, 177,1)'
            //     }
            //   },
            // ],
            data: markEvent,
            tooltip: {
              formatter: (param: any) => {
                console.log(param);
                console.log('asdad');
                return param.name + '<br>' + (param.data.coord || '');
              }
            }
          },
          smooth: true,
        }
      }
    />
  )

}
// EChart