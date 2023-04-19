import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import stylesTrend from './../components/trend/Trend.module.css'
const crypto = require('crypto');
import { instrumentStore } from './../stories/storeInstrument'

import DashboardTrend from './../components/trend/DashboardTrend'


import ContentBox from "../components/ContentBox";
import { getServerSession } from "next-auth";
import { loadEnvConfig } from '@next/env'
import { useSession, getSession } from "next-auth/react"
import { useRouter } from 'next/router'

import { useQuery, useQueryClient, useMutation } from 'react-query'

const inter = Inter({ subsets: ['latin'] })
import {
  useEffect, useState, useRef, useMemo
} from 'react'
import Link from 'next/link'

export default function Home(req: any, res: any) {
  const { data: session, status } = useSession()
  const [sortedTrendSures, setSortedTrendSures] = useState([]);
  const [sortOrderName, setSortOrderName] = useState<'asc' | 'desc'>('asc');
  const [sortType, setSsortType] = useState<'years' | 'years5' | 'name' | 'month' | 'cost'>('name');

  const handleSortByName = () => {
  //  setSsortType('name') 
  //  setSortOrderName(sortOrderName === 'asc' ? 'desc' : 'asc');
  };

  const sortTableCost = () => {
    setSsortType('cost') 
    setSortOrderName(sortOrderName === 'asc' ? 'desc' : 'asc');
  };

  const sortTable5Years = () => {
    setSsortType('years5') 
    setSortOrderName(sortOrderName === 'asc' ? 'desc' : 'asc');
  };
  const sortTableYears = () => {
    setSsortType('years') 
    setSortOrderName(sortOrderName === 'asc' ? 'desc' : 'asc');
  };
  const sortTableMonth = () => {
    setSsortType('month') 
    setSortOrderName(sortOrderName === 'asc' ? 'desc' : 'asc');
  };

  const router = useRouter();



  const { data: rawData, isLoading, error, refetch } = useQuery(
    ['instruments'],
    // ['instruments',typeId],
    () => {
      console.log('request 1');
      return instrumentStore.getTrendDashboard(
        { typeId: 0, level: 0 }
      )
    },
    {
      staleTime: 1 * 60 * 1000,
      cacheTime: 5 * 60 * 1000,
      enabled: router.isReady,
    }
  );


  const trendSures = useMemo(() => {

    if (rawData) {

      const sortedData = [...rawData].sort((a: any, b: any) => {
        switch (sortType) {
          case 'name': {
            if (a.ticker > b.ticker) {
              return sortOrderName === 'asc' ? 1 : -1;
            } else if (a.ticker < b.ticker) {
              return sortOrderName === 'asc' ? -1 : 1;
            } else {
              return 0;
            }
          }
          case 'cost': {
            if (a.price > b.price) {
              return sortOrderName === 'asc' ? 1 : -1;
            } else if (a.price < b.price) {
              return sortOrderName === 'asc' ? -1 : 1;
            } else {
              return 0;
            }
          }
          case 'years5': {
            const resulta = ((a.price - a.prices.years5.price) / a.prices.years5.price) * 100
            const resultb = ((b.price - b.prices.years5.price) / b.prices.years5.price) * 100
            if (resulta > resultb) {
              return sortOrderName === 'asc' ? 1 : -1;
            } else if (resulta < resultb) {
              return sortOrderName === 'asc' ? -1 : 1;
            }
          }
          case 'years': {
            const resulta = ((a.price - a.prices.years.price) / a.prices.years.price) * 100
            const resultb = ((b.price - b.prices.years.price) / b.prices.years.price) * 100
            if (resulta > resultb) {
              return sortOrderName === 'asc' ? 1 : -1;
            } else if (resulta < resultb) {
              return sortOrderName === 'asc' ? -1 : 1;
            }
          }
          case 'month': {
            const resulta = ((a.price - a.prices.month.price) / a.prices.month.price) * 100
            const resultb = ((b.price - b.prices.month.price) / b.prices.month.price) * 100
            if (resulta > resultb) {
              return sortOrderName === 'asc' ? 1 : -1;
            } else if (resulta < resultb) {
              return sortOrderName === 'asc' ? -1 : 1;
            }
          }
        }
      }); 

      return sortedData.slice(0, 20);
    }    //  arr.slice(0, 2);
    return rawData ? rawData : null;
  }, [rawData, sortOrderName]);


  if (typeof trendSures === 'undefined' || trendSures === undefined) {
    return <div>load</div>;
  }
 

  const DashboardTrendTitle = () => {

    return <div className={stylesTrend.trendTableTr}>
      <div className={stylesTrend.trendTableTrTd}>
        <div className={stylesTrend.trendInstrumentIndex}>
          #
        </div>
      </div>

      <div className={stylesTrend.trendTableTrTd}>
        <div className={stylesTrend.trendlogo}>
        </div>
      </div>
      <div className={stylesTrend.trendTableTrTd}>
        <div className={stylesTrend.trendInstrumentName + " " + stylesTrend.trendTableHead} onClick={handleSortByName}><span>Наименование</span></div>
      </div>
      <div className={stylesTrend.trendTableTrTd}>
        <div className={stylesTrend.trendInstrumentPrice + " " + stylesTrend.trendTableHead} onClick={sortTableCost}><span style={{color: (sortType==='cost')?"#0D6EFD":""}}>Цена</span></div>
      </div>
      <div className={stylesTrend.trendTableTrTd}>
        <div className={stylesTrend.trendInstrumentPercent + " " + stylesTrend.trendTableHeadPercent} onClick={sortTable5Years}><span  style={{color: (sortType==='years5')?"#0D6EFD":""}}>% 5 лет</span></div>
      </div>
      <div className={stylesTrend.trendTableTrTd}>
        <div className={stylesTrend.trendInstrumentPercent + " " + stylesTrend.trendTableHeadPercent} onClick={sortTableYears}><span style={{color: (sortType==='years')?"#0D6EFD":""}}>% год</span></div>
      </div>
      <div className={stylesTrend.trendTableTrTd}>
        <div className={stylesTrend.trendInstrumentPercent + " " + stylesTrend.trendTableHeadPercent} onClick={sortTableMonth}><span style={{color: (sortType==='month')?"#0D6EFD":""}}>% месяц</span> </div>
      </div>
    </div>
  } 

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* <script src="./datepicker/datepicker.min.js"></script> */}
        {/* <script src="./datepicker/datepicker.min.css"></script> */}
      </Head>
      <ContentBox hideBorder={true} pageTitle={"BoxInvesting - анализ инструментов, акций для инвестирования"}>
        <div className={stylesTrend.homeTable}>
          <div className={stylesTrend.trendTable}>
            <DashboardTrendTitle />
            {trendSures && trendSures.map((item: object, index: number) => (
              <DashboardTrend index={index} item={item} />
            ))}
          </div>
        </div>
      </ContentBox>
    </>
  )
}


