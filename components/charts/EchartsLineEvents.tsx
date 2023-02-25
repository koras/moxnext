import React, { useRef, useImperativeHandle, useState, useEffect } from 'react';

import ReactECharts from 'echarts-for-react';
import { init, ECharts } from "echarts";
import { eventsName } from "../../constants/general";

import moment from 'moment';



export function EchartsInfo(props: any) {
  let markEvent: object[] = [];
  const [xAxis, setXAxis] = useState<any | null>(null);

  let xAxisTMP: string[] = [];
  let yAxisTMP: string[] = [];

  const eChartsRef: any = useRef<ReactECharts>();
  const chart = useRef<ECharts>();


  const onClick = (params: any) => {
   // console.log('mey onClick', params)
  }
  const getMarksConst = (item: any) => {
    const dataColor = eventsName.filter((el) => el.value === +item.typeId);
    return dataColor[0];
  }

  const reloadDataChart = () => {
  //  console.log(' reloadDataChart');
  //  console.log('props.dataInfo');
  //  console.log(props.dataInfo);

     
    //  setMarkEvent([])
    //  setXAxis([])
    //  setYAxis([])
    xAxisTMP = [];
    yAxisTMP = [];


    for (const item of props.dataInfo) {

      //xAxis.push(item.price);
      xAxisTMP.push(item.price);
      yAxisTMP.push(item.date);
      // setXAxis([...xAxis, item.price])
      //  setYAxis([...yAxis, item.date ])
      // yAxis.push(item.date);
      if (item.typeId && +item.typeId !== 0) {
        const dataMark = getMarksConst(item);
        let tmp = {
          name: item.title,
          coord: [item.date, item.price],
          symbol: 'circle',
          symbolSize: dataMark.symbolSize,
          silent: true,
          click: () => onClick,
          itemStyle: {
            color: dataMark.color
          }
        }
        //     console.log( tmp);
        markEvent.push(tmp)
        //  setMarkEvent([...markEvent, tmp ])
      }
      //eventsName
    }
   // console.log(xAxisTMP)
    setXAxis(xAxisTMP);
  }




  useEffect(() => {
    //  eChartsRef.current.echarts.setOption(options)
    reloadDataChart();
    const options = getOption();
    //options.series[0].data = props.period;

  //  console.log(options, props.period);

    //chart.current?.setOption(options);xAxis
    if (eChartsRef && eChartsRef.current){
  //    console.log('options');
  //    console.log(options);
    }
  //    eChartsRef.current.getEchartsInstance().setOption(options)

  }, [props.period])






  const onChartReadyCallback = () => {

  }

  const getOption = () => {
    const data = {
      grid: {
        left: '2%',
        right: '2%',
        bottom: '10%',
        containLabel: true
      },
      title: false,
      style: { height: '500px', width: '100%' },
      tooltip: {

      },
      xAxis: {
        animation: false,
        triggerEvent: false,
        silent: false,
        showGrid: true,
        data: yAxisTMP,
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
      },
      yAxis: {},
      series: [
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
          markPoint: {
            //    silent :true,
            label: {
              formatter: (param: any) => {
           //     console.log("test");
                //    console.log(param);
                // return "asdfasdf";
                //    return param != null ? Math.round(param.value) + '' : '';
              }
            },
            data: markEvent,
            tooltip: {
              formatter: (param: any) => {
                //  console.log(param);
           //     console.log('asdad');
                return param.name + '<br>' + (param.data.coord || '');
              }
            }
          },
          smooth: true,
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


  //  lazyUpdate={true}
  //  theme={"theme_name"}
  //  onChartReady={onChartReadyCallback}
  // onEvents={EventsDict}
  // opts={}
  />


} 