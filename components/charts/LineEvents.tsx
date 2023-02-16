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

//   const dataData = [ 
//   //   {"Price":6048,Date:"2013-11-01"},
//   //   {"Price":4048,Date:"2013-11-02"},
//   //   {"Price":6048,Date:"2013-11-10"},
//   // {"Price":5084,Date:"2014-11-11"},
//   // {"Price":4103,Date:"2014-11-12"},
//   // {"Price":3030,Date:"2014-11-13"},
//   // {"Price":3152,Date:"2015-11-14"},
//   // {"Price":6280,Date:"2015-11-17"},
//   // {"Price":8280,Date:"2015-11-23"},
//     {"Price":6048,"Date":"2013" },
//     {"Price":4048,"Date":""},
//     {"Price":2048,"Date":""},
//     {"Price":1048,"Date":""},
//     {"Price":6048,"Date":""},
//     {"Price":5084,"Date":"2014"},
//     {"Price":4103,"Date":""},
//     {"Price":3030,"Date":""},
//     {"Price":5152,"Date":""},
//     {"Price":2152,"Date":""},
//     {"Price":5152,"Date":""},
//     {"Price":2152,"Date":""},
//     {"Price":5152,"Date":""},
//     {"Price":2152,"Date":""},
//     {"Price":3152,"Date":"2015"},
//     {"Price":5152,"Date":""},
//     {"Price":2152,"Date":""},
//     {"Price":6280,"Date":"2015"},
//   ]

//  //   console.log( data);

// const dataInfo =  {
//     fill: true,
//     labels: ["2013","","","","","2014","","","","","","","","","2015", "", "" , "2015" ],
//     datasets: [
//       {
//         fill: true,
   
//         data: dataData,
     
//         parsing: {
//          xAxisKey: "Date",
//           yAxisKey: "Price",
//        //   labelsKey: "Price",

//         },
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.2)", 
//         ],
//         pointRadius: [1,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//           1,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//           1,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
//           1,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, ],
//         borderColor: [
//           "rgba(255, 99, 132, 1)",
//           "rgba(54, 162, 235, 1)",
//           "rgba(255, 206, 86, 1)",
//           "rgba(75, 192, 192, 1)",
//           "rgba(153, 102, 255, 1)",
//           "rgba(255, 159, 64, 1)",
//         ],
//         //  borderWidth: [2, 2,   3, 2, 4, 4],
//         borderWidth: 1,
//         //  borderWidth: 1,
//         tension: 0.1,
//       },
//     ],
//   };



  const chartRef:any = useRef('chart');

 

  return <Line  ref={chartRef} options={options} data={dataInfo}  />;
}
