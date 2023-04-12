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
//import { LineTicker } from "../../components/charts/LineEvents";
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
    all: 31556926000,
    year5: 157784630,
    year: 31556926,
    month: 2629743,
    week: 604800,
    day: 86400,
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
  const [periodName, setPeriodName] = useState('all'); 

  const [news, setNews] = useState<string[]>([]);
  const chartsRef: any = useRef(null);

  const getUrlEdit = (ticker: string) => {
    router.push("/event/create/" + ticker + "/")
  };


  const { isLoading, error, data, status, isFetching } = useQuery({
    queryKey: ["chart", ticker],
    queryFn: async () => instrumentStore.getChart(ticker),
    //  staleTime: 1 * 60 * 1000,
    // cacheTime: 5 * 60 * 1000,
    enabled: ticker !== undefined,
    onSuccess: async (data: any) => {
      //    setPeriod(0);
      //   const events = data.filter((item: any) => {
      //    return item.title !=""
      //  })
      //  setNews(events);
    },
  });
  if (isLoading) return <p>Загрузка...</p>;


  if (!router.isReady) {
    return <span>!router.isReady</span>
  }




  const handleTimeChange = (params: any, typeDateName: any) => {
    console.log(typeDateName)
    setPeriod(params);
    setPeriodName(typeDateName);
  }


  let tabTime = {
    all: [],
    year5: [],
    year: [],
    month: [],
    week: [],
  };


  const periodAll = moment().subtract('seconds', periods.all);
   
  const periodYear5 = moment().subtract('seconds', periods.year5);
  const periodYear = moment().subtract('seconds', periods.year);
  const periodMonth = moment().subtract('seconds', periods.month);
  const periodWeek = moment().subtract('seconds', periods.week);



  // надо определить сколько табов показывать в инструменете
  //  for (const tab of data.price) {
  if( data.price){ 
    tabTime.all = data.price.filter((item: any) => {
      return moment(item.date, 'YYYY-MM-DD').isAfter(periodAll)
    })
    tabTime.year5 = data.price.filter((item: any) => {
      return moment(item.date, 'YYYY-MM-DD').isAfter(periodYear5)
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

  }

 

  const getPercent = (_priceDate: any, _priceCurrent: any) => {
    if (_priceCurrent >= _priceDate) {
      // цена выросла
      if (_priceCurrent != 0) {
        const mount = (_priceCurrent - _priceDate) / (_priceCurrent / 100);
        return '+' + parseInt(mount.toString());
      }
    } else {
      // цена упала
      if (_priceDate != 0) {
        const mount = (_priceDate - _priceCurrent) / (_priceDate / 100);
        return '-' + parseInt(mount.toString())
      }
    }
    return "0";
  }




  const getNameInstrument = (data:any) => {
      if(data && data.instrument && data.instrument.instrument_name){
        return data.instrument.instrument_name;
      }
      return '';
  }


  let objects = [
    { name: 'Всё время', typeTime: 1, typeName: 'all', id: 1, hint: '', hintInfo: 'За всю историю', changes: '0', price: 0, time: periods.all },
    { name: '5 лет', typeTime: 2, typeName: 'year5', id: 2, hint: '', hintInfo: 'за 5 лет', changes: '0', price: 0, time: periods.year5 },
    { name: 'Год', typeTime: 3, typeName: 'year', id: 3, hint: '', hintInfo: 'за последний год', changes: '0', price: 0, time: periods.year },
    { name: 'Mесяц', typeTime: 4, typeName: 'month', id: 4, hint: '', hintInfo: 'за последний месяц', changes: '0', price: 0, time: periods.month },
  ]

  const getDateState = (_data: any, _priceCurent: any) => {
    objects[0].changes = getPercent(_data[0].price, _priceCurent);
    var currentDateYears5 = moment().subtract('seconds', periods.year5);
    const dataYears5 = _data.filter((item: any) => {
      return moment(item.date, 'YYYY-MM-DD').isAfter(currentDateYears5)
    })
    objects[1].changes = getPercent(dataYears5[0].price, _priceCurent);
    var currentDateYears = moment().subtract('seconds', periods.year);
    const dataYears = _data.filter((item: any) => {
      return moment(item.date, 'YYYY-MM-DD').isAfter(currentDateYears)
    })
    objects[2].changes = getPercent(dataYears[0].price, _priceCurent);
    var currentDateMonth = moment().subtract('seconds', periods.month);
    const dataMonth = _data.filter((item: any) => {
      return moment(item.date, 'YYYY-MM-DD').isAfter(currentDateMonth)
    })
    objects[3].changes = getPercent(dataMonth[0].price, _priceCurent);
  }




  if(data.instrument && data.instrument.price && data.price ){ 
    getDateState(data.price, data.instrument.price)
  }

  const getPageTitle = (instrument:any) => {
    return  "События и новости на графике " + instrument.instrument_name 
  }

  return (
    <ContentBox title="" hideBorder={true}  pageTitle={getPageTitle(data.instrument)}>
      <div className={styles.graphicHead}>
        <div className={styles.title}>{getNameInstrument(data)} : график событий</div>
        <div className={styles.button}>
          <Button size="small" onClick={() => getUrlEdit(ticker)} variant="outlined">Добавить событие</Button>
        </div>
      </div>
      <div className={stylesHome.boxContent}>
        <div className={styles.graphicTab}>
          <Tabs onTimeChange={handleTimeChange} objects={objects} />
          <div className={styles.graphicTabBox}>
            <EchartsInfo
              instrument={data.instrument}
              dataInfo={data}
              period={period}
              periodName={periodName} 
              ticker={ticker} />
          </div>
        </div>

        <div className={styles.pageText}>
          <ListEvents instrument={data.instrument} period={period} periodName={periodName} data={data} />
        </div>
      </div>
    </ContentBox>

  )
}
