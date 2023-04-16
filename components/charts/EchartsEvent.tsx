import React, { useRef, useImperativeHandle, useState, useEffect } from 'react';

import ReactECharts from 'echarts-for-react';
import { init, ECharts } from "echarts";
import { eventsName } from "../../constants/general";

import moment from 'moment';


/**
 * График в новости
 * @param props 
 * @returns 
 */
export default function EchartsEvent(props: any) {
 
  let markEvent: object[] = [];
  const [xAxis, setXAxis] = useState<any | null>(null);
  const [yAxis, setYAxis] = useState<any | null>(null);
 // const [ yAxisLine, setYAxisLine] = useState<any | null>(null);

  
  const [markEvents, setMarkEvents] = useState<any | null>(null);
  const [rotate, setRotate] = useState(-30);
  
  let xAxisTMP: string[] = [];
  let yAxisTMP: string[] = [];
 // let yAxisLineTMP: string[] = [];
   
  const eChartsRef: any = useRef<ReactECharts>();
  const chart = useRef<ECharts>();


  const onClick = (params: any) => {
  }
  const getMarksConst = (item: any) => {
    const dataColor = eventsName.filter((el) => el.value === +item.typeId);
    return dataColor[0];
  }


  console.log('props.dataInfo',props.dataInfo);

  const reloadDataChart = () => {
    let dataParam = [];
    if (props.dataInfo && props.dataInfo) {
      //    var CurrentDate = moment().subtract('seconds', props.period);
          dataParam = props.dataInfo;
       //   dataParam = props.dataInfo.price.filter((item: any) => {
       //     return moment(item.date, 'YYYY-MM-DD').isAfter(CurrentDate)
       //   })
    }
    xAxisTMP = [];
    yAxisTMP = [];
    markEvent = [];
  //  yAxisLineTMP = [];
    // старая дата
    let dtOld = '';
    let dtOldMonth = ''
    let dtOldDay = ''
   
    for (const index in dataParam) {
      const item = dataParam[index];
      const price =  item.price.toString() ;
      const float =  parseFloat( price) ;

      xAxisTMP.push(float.toString() );

     // yAxisLineTMP.push(parseFloat(item.price.toString()));
      if (item.typeId && +item.typeId !== 0) {


        const dataMark = getMarksConst(item);
        let tmp = {
          name: item.title, 
          xAxis:  (+index),
          yAxis:item.price,
          symbol: 'circle',
          dataIndex: 100 ,
          symbolSize: dataMark.symbolSize,
          silent: true,
          click: () => onClick,
          itemStyle: {
            color: 'rgba(46,46,46, 0.8)'
          }
        }
        markEvent.push(tmp)
      }



        const dt = moment(item.date, 'YYYY-MM-DD').format('DD/MM/YYYY');
        if(dtOld === dt){
          yAxisTMP.push(" ");
        }else{  
          yAxisTMP.push(dt);
        }
       // console.log(dtOld, dt);
        dtOld = dt;
    }
    setMarkEvents(markEvent)
  
    setXAxis(xAxisTMP);
  //  console.log(yAxisTMP);
    setYAxis(yAxisTMP)
   // setYAxisLine(yAxisLineTMP)

  }


  useEffect(() => {
    reloadDataChart();
   
  }, [props.period])
 


  const getOption = () => {
    const data = {
      blur: {
        areaStyle: {
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowBlur: 10
        }
      },
      grid: {
        left: '1%',
        right: '2%',
        bottom: '10%',
        containLabel: true
      },
      style: {
        height: '350',
        width: '100%'
      },
      title: {
        text:props.instrument.instrument_name,
        subtext:props.instrument.instrument_full_name,
        x:'center'
      },
      tooltip: {

      },
      xAxis: {
        animation: false,
        triggerEvent: false,
        silent: false,
        showGrid: true,
        data: yAxis,
        nameGap: 0,
        axisTick: {
          show: false, //为 false 时隐藏
          alignWithLabel: false,
          interval: 0, //可以设置成 0 强制显示所有tick, 不是 label
          length: 1, // tick 长度, 默认5
          lineStyle: {
            color: 'rgb(106,104,103)',
            width: 12 //tick 宽度
          }
        },
        axisLabel: {
          //x轴上标签
          show: true,
          interval: 0,
          rotate: rotate,
          width: 1, 
          textStyle: {
            fontSize: 10 // задаем размер шрифта
          }
        },

        axisLine: {
          //轴线
          show: true, //false 时隐藏
          lineStyle: {
            // текст
            color: 'rgb(106,104,103)', 
            width: 1
          }
        },
      },
      yAxis: {
        min: function (value:any) {
          let min = (value.min/100*10);
           min = value.min - min;
          
           if(min>1){
               min =  +min.toFixed(2);
           }

           if(min>10){
              min =  +min.toFixed(1);
          }

          if(min>100){
            min = parseInt(min.toString());
          }
          return min;
      },
      max: function (value:any) { 
        let max = (value.max/100*5);
        max = value.max + max;
        if(max>10){

        }
        if(max>100){
          max = parseInt(max.toString());
        }
      //  console.log('max',max);
        return  max ;
      },
      //  boundaryGap: ['20%', '20%'],
        animation: false,
        triggerEvent: false,
        silent: false,
        showGrid: true,
      //  data: yAxisLine,  
        nameLocation : 'middle',
        nameGap: 0,
        axisTick: {
          // show: true, //为 false 时隐藏
          // alignWithLabel: true,
          // interval: 10, //可以设置成 0 强制显示所有tick, 不是 label
          // length: 1, // tick 长度, 默认5
          // lineStyle: {
          //   color: 'rgb(106,104,103)',
          //   width: 12 //tick 宽度
          // }
        },
        axisLabel: {
          //x轴上标签
        //  verticalAlign: 'bottom',

         // show: true,
          //interval: 100,
         // rotate: rotate,
        //  width: 1, 
         // shadowBlur: 3,
          hideOverlap: true,
          textStyle: {
            fontSize: 8 // задаем размер шрифта
          }
          
        },
        // minorTick: {
        //   show: true
        // },
        minorSplitLine: {
          show: true
        }, 

      },
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

          markLine: {
            data: [
              {yAxis: 0} // опускаем линию до оси xAxis
            ],
            label: {
              show: true,
              position: 'insideEndTop',
              formatter: 'Минимальное значение: {c}' // отображаем значение
            }
          },


          axisPointer: {
            animation: true,
            label: {
              show: true
            }
          },


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
          markPoint: {
            //    silent :true,
            label: {
              formatter: (param: any) => {
                // return "asdfasdf";
                //    return param != null ? Math.round(param.value) + '' : '';
              }
            },
            data: markEvents,
            tooltip: {
              formatter: (param: any) => {
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

    style={{
      height: 330,
      width: '100%'
    }}

    lazyUpdate={true}
  //  theme={"theme_name"}
  //  onChartReady={onChartReadyCallback}
  // onEvents={EventsDict}
  // opts={}
  />


} 