import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import React,{useRef} from 'react';

import styles from './style.module.css'
import stylesHome from './../../components/styleContent.module.css'

import Tabs from "../../components/tabs/index";

import Button from "@mui/material/Button";

import { instrumentStore } from "../../stories/storeInstrument";
import moment from 'moment';

import ContentBox from "../../components/ContentBox";
import { LineTicker } from "../../components/charts/LineEvents";
import { EchartsInfo } from "../../components/charts/EchartsLineEvents";


 
import ListEvents from "../../components/news/Lists";

import { eventsName } from "../../constants/general";


import { useQuery,useQueries } from 'react-query'

import {
  useState,
  useEffect
} from 'react'
import {
  useRouter
} from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Index() { 

  const router:any = useRouter();
  interface IEvent {
    title: string;
    typeId: number;
    date: string;
    source: string;
    slug: string;
    shorttext: string;
    fulltext: string;
}


  const { ticker } = router.query
  const [isload, setLoad] = useState(false);
  const [instrument, setInstrument] = useState({});
  const [rangeTime, setRangeTime] = useState(0);
  const [period, setPeriod] = useState(0);
  const [dataInfoParams, setDataInfoParams] = useState([]);


   

  const [newsEvent, setNews] = useState<string[]>([]);
  const chartsRef:any = useRef(null);
   

 
  const getUrlEdit = (ticker:string) => {  
    router.push("/event/create/" + ticker + "/") 
  };

 // let  dataInfoParams = [];
  
  let dataInfo = instrumentStore.getChart(ticker);

  //setDataInfoParams(dataInfo);
  // const getMarksConst = (item:any) => {
  //   const dataColor =   eventsName.filter((el) =>  el.value === +item.typeId);
  //   return dataColor[0];
  //   }

  // let xAxis = [];
  // let yAxis = [];
  // let  tmp = {};
  // // события на графике
  // let markEvent = [];
  
  // for (const item of dataInfo) {
  //   xAxis.push(item.price);
  //   yAxis.push(item.date);
  //     if(item.typeId && +item.typeId !== 0){
  //     const dataMark =   getMarksConst(item);
  //      tmp =  {
  //           name: item.title,
  //           coord:[item.date, item.price],
  //           symbol: 'circle',
  //           symbolSize: dataMark.symbolSize,
  //           silent: true,
  //           click: ()=>onClick,
  //           itemStyle: {
  //                 color: dataMark.color
  //           }
  //         }
  //      //     console.log( tmp);
  //       markEvent.push(tmp)
  //     }
  //   //eventsName
  // }


  const handleTimeChange = (params: any) => {
    if(params === 0){ 
      setDataInfoParams(dataInfo);
      console.log( 'Ноль');
      console.log( dataInfoParams);
      setPeriod(params);
      return;
    }
    console.log('handleTimeChange', params);


    var CurrentDate = moment().subtract('seconds', params);
    const info = CurrentDate.format("YYYY-MM-DD");

   const  dataParam =  dataInfo.filter((item:any)=>  {
    return   moment(item.date, 'YYYY-MM-DD').isAfter(CurrentDate)
    })
   
    setDataInfoParams(dataParam);
    console.log( 'dataInfoParams');
    console.log( dataInfoParams);

    //setRangeTime(params); 
   // setPeriod(params)
   let  chart:any = chartsRef.current;
  //   console.log( 'char',chart);
//    console.log( 'char',chart, chartsRef.current?.childMethod());

  setPeriod(params);
//setPeriod([1,2,3,4,5,5,5,6,1,1]);
 //  chart.data.datasets[0].data.push(123)
  }


 




  const objects = [
    //   {name:'5 лет',id:1,hint:'',hintInfo:'За последние 5 лет',changes:'+212',time:157784630},
    { name: 'Всё время', typeTime: 1, id: 1, hint: '', hintInfo: 'За всю историю', changes: '+212', time: 0 },
    { name: 'Год',typeTime: 2, id: 2, hint: '', hintInfo: 'за последний год', changes: '+15', time: 31556926 },
    { name: 'Mесяц',typeTime: 3, id: 3, hint: '', hintInfo: 'за последний месяц', changes: '+35', time: 2629743 },
    { name: 'Неделя',typeTime: 4, id: 4, hint: '', hintInfo: 'за неделю', changes: '-15', time: 86400 },
    { name: 'День', typeTime: 5,id: 5, hint: '', hintInfo: 'в течении суток', changes: '+25', time: 86400 },
  ]

  const infoBox = { title: 'Изменение цены', hintInfo: 'в течении суток', changes: '+212' };

  return (
    <ContentBox title="" hideBorder={true}>
      <div className={styles.graphicHead}>
        <div className={styles.title}>Биткоин:График событий</div>
        <div className={styles.button}>
          <Button size="small" onClick={() => getUrlEdit(ticker)} variant="outlined">Добавить событие</Button>
        </div>
      </div>
      <div className={stylesHome.boxContent}>
        <div className={styles.graphicTab}>
          <Tabs onTimeChange={handleTimeChange} objects={objects} infoBox={infoBox} />
          
          <div  className={styles.graphicTabBox}>
         
          <EchartsInfo 
            instrument={instrument} 
            dataInfo={dataInfoParams}
            period={period}  
            ticker={ticker} /> 

          </div>
        </div>

        <div className={styles.pageText}> 
           <ListEvents instrument={instrument} news={newsEvent}/> 
      
        </div>
      </div>
    </ContentBox>

  )
}
