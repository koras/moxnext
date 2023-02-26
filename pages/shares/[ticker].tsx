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
  const [period, setPeriod] = useState(0); 

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
        setPeriod(0);
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

 
 

  // надо определить сколько табов показывать в инструменете
  
  const objects = [
    //   {name:'5 лет',id:1,hint:'',hintInfo:'За последние 5 лет',changes:'+212',time:157784630},
    { name: 'Всё время', typeTime: 1, id: 1, hint: '', hintInfo: 'За всю историю', changes: '+212', time: 0 },
    { name: 'Год', typeTime: 2, id: 2, hint: '', hintInfo: 'за последний год', changes: '+15', time: 31556926 },
    { name: 'Mесяц', typeTime: 3, id: 3, hint: '', hintInfo: 'за последний месяц', changes: '+35', time: 2629743 },
    { name: 'Неделя', typeTime: 4, id: 4, hint: '', hintInfo: 'за неделю', changes: '-15', time: 86400 },
   // { name: 'День', typeTime: 5, id: 5, hint: '', hintInfo: 'в течении суток', changes: '+25', time: 86400 },
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
