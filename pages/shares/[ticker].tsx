import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import React, { useRef, useState, useEffect, useReducer } from 'react';

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


import { useQuery, useQueries } from 'react-query'


import {
  useRouter
} from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Index() {

  const periods = {
    all: 3155692600,
    year:31556926,
    month:2629743,
    week:86400,
  }

  const router: any = useRouter();
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
  const [instrument, setInstrument] = useState({}); 
  const [period, setPeriod] = useState(periods.all); 

  const [news, setNews] = useState<string[]>([]);
  const chartsRef: any = useRef(null);

  const getUrlEdit = (ticker: string) => {
    router.push("/event/create/" + ticker + "/")
  };

  //console.log('ticker',ticker);

  const { isLoading, error, data, status,isFetching } = useQuery({
    queryKey: ["chart", ticker],
    queryFn: async () =>  instrumentStore.getChart(ticker) ,
  //  staleTime: 1 * 60 * 1000,
   // cacheTime: 5 * 60 * 1000,
    enabled: ticker !== undefined,
    onSuccess: async (data:any) => { 
    //    setPeriod(0);
    //   const events = data.filter((item: any) => {
    //    return item.title !=""
    //  })
    //  setNews(events);
     },
    } ); 
  if (isLoading) return <p>Загрузка...</p>;


  if (!router.isReady) { 
    return <span>!router.isReady</span>
  } 
 
 


  const handleTimeChange = (params: any) => {
    setPeriod(params);
  }

 
  console.log(data.price);
    let tabTime  = {
      all:[],
      year:[],
      month:[],
      week:[],
    };

    // const periods = {
    //   all: 3155692600,
    //   year:31556926,
    //   month:2629743,
    //   week:86400,
    // }
    const  periodAll  = moment().subtract('seconds', periods.all);
    const  periodYear  = moment().subtract('seconds', periods.year);
    const  periodMonth = moment().subtract('seconds', periods.month);
    const  periodWeek = moment().subtract('seconds', periods.week);
 


  // надо определить сколько табов показывать в инструменете
  //  for (const tab of data.price) {
  //     console.log(tab );
      tabTime.all = data.price.filter((item: any) => {
        return moment(item.date, 'YYYY-MM-DD').isAfter(periodAll)
      })
      tabTime.year = data.price.filter((item: any) => {
        return moment(item.date, 'YYYY-MM-DD').isAfter(periodYear)
      })
      tabTime.month = data.price.filter((item: any) => {
          return moment(item.date, 'YYYY-MM-DD').isAfter(periodMonth)
        })
      tabTime.week = data.price.filter((item: any) => {
         return moment(item.date, 'YYYY-MM-DD').isAfter(periodWeek)
       })
   console.log(tabTime);


  let objects = [ 
    { name: 'Всё время', typeTime: 1, id: 1, hint: '', hintInfo: 'За всю историю', changes: '0', price:0, time: periods.all },
    { name: 'Год', typeTime: 2, id: 2, hint: '', hintInfo: 'за последний год', changes: '0', price:0, time: periods.year},
    { name: 'Mесяц', typeTime: 3, id: 3, hint: '', hintInfo: 'за последний месяц', changes: '0', price:0, time: periods.month },
    { name: 'Неделя', typeTime: 4, id: 4, hint: '', hintInfo: 'за неделю', changes: '0', price:0, time: periods.week },
   // { name: 'День', typeTime: 5, id: 5, hint: '', hintInfo: 'в течении суток', changes: '+25', time: 86400 },
  ]


    const getPercent = (_priceDate:any, _priceCurrent:any) => {
        if(_priceCurrent >= _priceDate){
            // цена выросла
            if(_priceCurrent != 0){
              const mount = (_priceCurrent - _priceDate) / (_priceCurrent / 100);
               return   '+' + parseInt(mount);
            }
        }else{
          // цена упала
            if(_priceDate != 0){ 

              const mount = ( _priceDate - _priceCurrent) /  (_priceDate/100);

               return  '-' + parseInt(mount)
            }
        }
        return "0";
    }


    const getDateState = (_data:any,_priceCurent:any) =>{
 
 
      objects[0].changes = getPercent(_data[0].price, data.instrument.price);

      var currentDateYears = moment().subtract('seconds', periods.year);
      const dataYears =  _data.filter((item: any) => {
        return moment(item.date, 'YYYY-MM-DD').isAfter(currentDateYears)
      })
      objects[1].changes = getPercent(dataYears[0].price, data.instrument.price);
   

      var currentDateMonth = moment().subtract('seconds', periods.month);
      const dataMonth =  _data.filter((item: any) => {
        return moment(item.date, 'YYYY-MM-DD').isAfter(currentDateMonth)
      })
      objects[2].changes = getPercent(dataMonth[0].price, data.instrument.price);
 
      var currentDateWeek = moment().subtract('seconds', periods.month);
      const dataWeek =  _data.filter((item: any) => {
        return moment(item.date, 'YYYY-MM-DD').isAfter(currentDateWeek)
      })
      objects[3].changes =  getPercent(dataYears[0].price, data.instrument.price);
 
      console.log(objects);

  }
  
  console.log(getDateState(data.price, data.instrument.price))
  console.log(data.instrument.price)
   

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
          <div className={styles.graphicTabBox}>
             <EchartsInfo
              instrument={instrument}
              dataInfo={data}
              period={period}
              ticker={ticker} /> 
          </div>
        </div>

        <div className={styles.pageText}>
            <ListEvents instrument={instrument}  period={period} data={data} />  

        </div>
      </div>
    </ContentBox>

  )
}
