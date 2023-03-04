import React,{useRef, useImperativeHandle,useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


import { instrument } from "../../stories/storeInstrument";

//import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


/**
 * https://echarts.apache.org/examples/en/editor.html?c=area-basic
 */
 
/**
 * documentation 
 * @link https://www.chartjs.org/docs/latest/developers/updates.html
 * 
 */

 export function LineTicker(props:any, ref:any) {

  const  ticker =   props.ticker;
 

  
  
 

  useEffect(()=>{
    childMethod();

    let  chart:any = chartRef.current;
    chart.data.datasets[0].data.push({"Price":5152,"Date":""}) 
    chart.data.datasets[0].data.push({"Price":5152,"Date":""}) 
    chart.data.datasets[0].data.push({"Price":5152,"Date":""}) 
    chart.data.datasets[0].data.push({"Price":5152,"Date":""}) 
    chart.data.labels.push('2013');
    chart.data.labels.push('2013');
    chart.data.labels.push('2013');
    chart.data.labels.push('2013');
    chart.update();

  },[props.period])
  
  // useImperativeHandle(ref, () => ({
  //   childMethod() {
  //     childMethod()
  //   }
  // }))

  const  childMethod = () => {
    console.log('call me');
    console.log(props.period);



    let  chart:any = chartRef.current;
    chart.data.datasets[0].data.push(123)
    chart.data.labels.push('2013');


    console.log(chart    ); 
    chart.update();

  }


  const options:any = {
  responsive: true,
  plugins: {
    id: 'myEventCatcher', 
    legend: {
   //   position: 'top',
    },
    title: {
      display: false,
      text: '',
    },
    subtitle: {
      display: false,
      text: ''
  },

  tooltip: {
    callbacks: {
        label: function(context:any) {
          console.log(context);
            let label = context.dataset.label || '';

            if (label) {
                label += ': ';
            }
            if (context.parsed.y !== null) {
                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
            }
            return label;
        }
      },
    },
 
    tooltips: {
      mode: "index",
      intersect: false,
    },
    
    hover: {
      mode: "nearest",
      intersect: false,
    },
  
  },
  scales: {
    y: {
        beginAtZero: true
    }
  },
  elements:{
    point:{
      radius: 4,
      hitRadius:4
    },
    line:{
      backgroundColor:'rgba(255, 159, 64, 1)'
    }
  },
  interaction:{
    mode: 'index',
  },
  
  events: ['mousemove', 'mouseout', 'click'],

  onClick : (event:any, items:any) =>{
    if(items && items[0]){ 
    let  chart:any = chartRef.current;
    chart.data.datasets[0].data.push(123)
    chart.data.labels.push('2013');


    console.log(chart    ); 
    chart.update();
    // ChartJS.update();
    }
  },
  legend: {
      display: false
  },
      tooltips: {
        callbacks: {
           label: function(tooltipItem:any) {
                  return tooltipItem.yLabel;
           }
        }
    }
};

 

  let  dataInfo = instrument.getChart(ticker);
 
  console.log('props.rangeTime',props.rangeTime)



  const chartRef:any = useRef('chart');

 

  return <Line  ref={chartRef} options={options} data={dataInfo}  />;
}
