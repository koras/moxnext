import React, { useRef, useImperativeHandle, useState, useEffect } from 'react';

import ReactECharts from 'echarts-for-react';
import { init, ECharts } from "echarts";
import { eventsName } from "../../constants/general";

import moment from 'moment';



export function EchartsInfo(props: any) {
  let markEvent: object[] = [];
  const [xAxis, setXAxis] = useState<any | null>(null);
  const [yAxis, setYAxis] = useState<any | null>(null);
  const [xAxisLineDate, setXAxisLineDate] = useState<any | null>(null);
 // const [ yAxisLine, setYAxisLine] = useState<any | null>(null);

  
  const [markEvents, setMarkEvents] = useState<any | null>(null);
  const [rotate, setRotate] = useState(-50);
  
  let xAxisTMP: string[] = [];
  let yAxisTMP: string[] = [];
  let xLineDate : string[] = [];
 // let yAxisLineTMP: string[] = [];
   
  const eChartsRef: any = useRef<ReactECharts>();
  const chart = useRef<ECharts>();


  const onClick = (params: any) => {
  }
  const getMarksConst = (item: any) => {
    const dataColor = eventsName.filter((el) => el.value === +item.typeId);
    return dataColor[0];
  }
  const reloadDataChart = () => {
    let dataParam = [];
    if (props.dataInfo && props.dataInfo.price) {
          var CurrentDate = moment().subtract('seconds', props.period);

          dataParam = props.dataInfo.price.filter((item: any) => {
            return moment(item.date, 'YYYY-MM-DD').isAfter(CurrentDate)
          })
    }
    xAxisTMP = [];
    xLineDate = [];
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
       //   coord: [item.date, item.price],
          xAxis:  (+index),
          yAxis:item.price,
          symbol: 'circle',
          dataIndex: 100 ,
          symbolSize: dataMark.symbolSize,
          silent: true,
          click: () => onClick,
          itemStyle: {
            color: dataMark.color
          }
        }
        markEvent.push(tmp)
      }


      if(props.periodName === "all"){ 
        const dt = moment(item.date, 'YYYY-MM-DD').format('YYYY');
        if(dtOld === dt){
          yAxisTMP.push(" ");
        }else{  
          yAxisTMP.push(dt);
        }
        
        xLineDate.push(moment(item.date, 'YYYY-MM-DD').format('DD/MM/YYYY'));
       // console.log(dtOld, dt);
        dtOld = dt;

        
      }else if(props.periodName === "year5"){ // month
        const dt = moment(item.date, 'YYYY-MM-DD').format('YYYY');
        if(dtOld === dt){
          yAxisTMP.push(" ");
        }else{  
          yAxisTMP.push(dt); 
        }
        xLineDate.push(moment(item.date, 'YYYY-MM-DD').format('DD/MM/YYYY'));
       // console.log(dtOld, dt);
        dtOld = dt;

      }else if(props.periodName === "year"){ // month
        const dtYears = moment(item.date, 'YYYY-MM-DD').format('YY');
        const dtMonth = moment(item.date, 'YYYY-MM-DD').format('MMMM');
        if(dtOldMonth == dtMonth){
          yAxisTMP.push(" ");
        }else{  
          if( dtOld === dtYears){ 
            yAxisTMP.push(dtMonth);
          }else{
            yAxisTMP.push(dtMonth+"/"+dtYears);
          } 
        }
        xLineDate.push(moment(item.date, 'YYYY-MM-DD').format('DD/MM/YYYY'));

       dtOld = dtYears;
       dtOldMonth = dtMonth;

      }else if(props.periodName === "month"  ){ 
        const dtYears = moment(item.date, 'YYYY-MM-DD').format('YY');
        const dtMonth = moment(item.date, 'YYYY-MM-DD').format('MMMM');
        const dtDay = moment(item.date, 'YYYY-MM-DD').format('DD');
        if(dtOldDay === dtDay){
          yAxisTMP.push(" ");
        }else{
          if(dtMonth === dtOldMonth){

            yAxisTMP.push(dtDay);
          }else{
            
            yAxisTMP.push(dtDay + "/"+dtOldMonth);
          }
        }

       dtOld = dtYears;
       dtOldMonth = dtMonth;
       dtOldDay = dtDay;
       xLineDate.push(moment(item.date, 'YYYY-MM-DD').format('DD/MM/YYYY'));



      } else if(props.periodName === "week"){ 
        const dtYears = moment(item.date, 'YYYY-MM-DD').format('YY');
        const dtMonth = moment(item.date, 'YYYY-MM-DD').format('MMMM');
        const dtDay = moment(item.date, 'YYYY-MM-DD').format('DD');
          yAxisTMP.push(" "); 
            yAxisTMP.push(dtDay + " "+dtMonth);
      }    
      else{
        yAxisTMP.push(item.date);
      }
    }
    setMarkEvents(markEvent)
  
    setXAxis(xAxisTMP);
    
    setYAxis(yAxisTMP);
    console.log(xLineDate);
    setXAxisLineDate(xLineDate); 


    if(props.periodName === "all"){ 
        setRotate(-50);
    }else if(props.periodName === "year5"){ // month
       
        setRotate(-50);
    }else if(props.periodName === "year"){ // month
     
      setRotate(-50);
    }else if(props.periodName === "month"){ 
      setRotate(0);
    }  else{
  
      setRotate(0);
   }

  //  rotate, setRotate] = useState(-50);
  }


  useEffect(() => {
    reloadDataChart();
   
  }, [props.period,props.periodName])
 




  const onChartReadyCallback = () => {

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
        left: '6%',
        right: '2%',
        bottom: '20%',
        containLabel: false
      },
      style: {
        height: '500',
        width: '100%'
      },
      title: false,
      tooltip: { 
        trigger: 'item',
        formatter: function(params:any) {
       //   console.log(params);
          if (params.componentType === 'markPoint') {
            // Вернуть форматированный тултип только для markPoint
            return 'Ваш формат для markPoint tooltip';
          } else {
            // Вернуть пустую строку для остальных элементов
            return '';
          }
        }
    //    trigger: 'none', 
      },
      xAxis: {
        data: yAxis,
     //   nameGap: 0,
   //     trigger: 'axis',
        axisTick: {  
          alignWithLabel: true,
          interval: 0, //可以设置成 0 强制显示所有tick, 不是 label
          length: 1, // tick 长度, 默认5
          lineStyle: {
            color: 'rgb(106,104,103)',
            width: 12 //tick 宽度
          }
        },
        axisLabel: {
          showMaxLabel: true,
          //x轴上标签
          show: true,
          interval: 0,
          rotate: rotate,
          width: 1, 
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

        axisPointer: {
          showMaxLabel: true,
          axis: 'all',
      //    status :true,
          show: true,
        // type: 'none',  
         // show:true,
          label: {
            formatter: function(params:any) {  

            //  console.log('-------',params);
              // if(params.seriesData && params.seriesData[0] && params.seriesData[0].name ){

              //   console.log('-------',params );
              //   return params.seriesData[0].name ;
              // }  
              if(params.seriesData && params.seriesData[0] && params.seriesData[0].dataIndex ){
                const index = params.seriesData[0].dataIndex;
             //   console.log('++',params.seriesData[0].dataIndex      ,xAxisLineDate[index]        );
                return xAxisLineDate[index] ;
              }else{
                if( params.axisIndex ){
                  return xAxisLineDate[params.axisIndex] ;
                }
                console.log('----',params ,params.axisIndex,xAxisLineDate[params.axisIndex]   );
                return "--";
                return xAxisLineDate[params.axisIndex] ;
              }
            //  console.log(params,props);
        //
           //   if(params.seriesData && params.seriesData[0] && params.seriesData[0].dataIndex){ 
             //   const index = params.seriesData[0].dataIndex;
            //    console.log('index',index);
             
          //    }

           //   return null;
           //   return 'X: ' + params;
            }
          }
        },
      //  tooltip: { 
          //  trigger: 'none', 
        //    },
        
      },
      yAxis: {
       // tooltip: { 
       //   trigger: 'none', 
        //  },
        type: 'value',
        axisPointer: {
          
       //   type: 'none',
          animation: true,
          show: true,
          label: {
            formatter: function(params:any)  {
              let num = params.value;
              let min = (num/100*10);
              min = num - min;
             
              if(min>1){
                  min =  +min.toFixed(2);
              }
   
              if(min>10){
                 min =  +min.toFixed(1);
             }
   
             if(min>100){
               min = parseInt(min.toString());
             }

              return '' + min + '₽';
            }
          }
        },
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
        animation: true,
        triggerEvent: true,
        silent: false,
        showGrid: true,
      //  data: yAxisLine,  
        nameLocation : 'middle',
        nameGap: 0,
        axisTick: {
        },
        axisLabel: {
          hideOverlap: true
        },
        minorSplitLine: {
          show: true
        }, 
      },
      series: [
        {
          animation: false,
          type: 'line',
          data: xAxis,
          triggerLineEvent: false,
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

         //   color: '#0770FF',
         //   opacity: 0.7,
          },
          markPoint: {
            width: 100,
          //  trigger: 'line', 
           // symbol: 'circle',
            data: markEvents,
         //   symbolSize: 0,
            tooltip: {
              formatter: (param: any) => {
                if(param.componentType ==  "markPoint"){ 

                  console.log(param.data);

                  const index = param.data.xAxis;
                  
                       let date =  xAxisLineDate[index] ;
      // xLineDate.push(moment(item.date, 'YYYY-MM-DD').format('DD/MM/YYYY'));

                let data =  `${param.name}<br><span  style="color:#00131c;font-weight: 700;">${param.data.yAxis}₽</span><br><span  style="color:#00131c;font-weight: 700;">${date} </span>` || '';

                return `<div style="width: 200px; ; word-wrap: break-word;white-space: normal; display:block">${data}</div>`;
              }
              return '';
              },
            //  trigger: 'item',
              borderWidth:2,
            }
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
      height: 350,
      width: '100%'
    }}

    lazyUpdate={true}
  //  theme={"theme_name"}
  //  onChartReady={onChartReadyCallback}
  // onEvents={EventsDict}
  // opts={}
  />


} 