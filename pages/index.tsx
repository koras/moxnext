import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import stylesTrend from '../styles/Trend.module.css'
const crypto = require('crypto');
import { instrumentStore } from './../stories/storeInstrument'

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

export default function Home(req: any, res: any) {
  const { data: session, status } = useSession()

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
      //  staleTime: 1 * 60 * 1000,
      //  cacheTime: 5 * 60 * 1000,
      enabled: router.isReady,
    }
  );

  //const { level, type: typeId } = router.query;

  // InstrumentID        string `json:"instrument_id"`
  // InstrumentName      string `json:"instrument_name"`
  // InstrumentFullName  string `json:"instrument_full_name"`
  // INSTRUMENT_CATEGORY string `json:"INSTRUMENT_CATEGORY"`
  // LIST_SECTION        string `json:"LIST_SECTION"`

  // CURRENCY_MOEX string  `json:"CURRENCY_MOEX"`
  // Description   string  `json:"description"`
  // Type          string  `json:"type"`
  // Ticker        string  `json:"ticker"`
  // Price         float64 `json:"price"`
  // Mark          string  `json:"mark"`
  // Isin          string  `json:"isin"`
  // Site          string  `json:"site"`
  // Currency      string  `json:"currency"`
  // Logo          string  `json:"logo"`
  // const trentdSures = [
  //   { ticker: "AFLT", type: "shares", logo: "5.png", instrument_name: "Газпром", price: 100, mark: "₽", prices: { 'years5': { price: 10, date: "2015-04-07" }, 'years': { price: 50, date: "2020-02-13" }, 'month': { price: 1000, date: "2020-04-22" }, } },
  //   { ticker: "OGKB", type: "shares", logo: "2.png", instrument_name: "ОГК-2", price: 28, mark: "₽", prices: { 'years5': { price: 326.6, date: "2015-04-07" }, 'years': { price: 19.5, date: "2020-02-13" }, 'month': { price: 175.12, date: "2020-04-22" }, } },
  //   { ticker: "AFLT", type: "shares", logo: "1.png", instrument_name: "Газпром", price: 28, mark: "₽", prices: { 'years5': { price: 326.6, date: "2015-04-07" }, 'years': { price: 19.5, date: "2020-02-13" }, 'month': { price: 175.12, date: "2020-04-22" }, } },
  //   { ticker: "OGKB", type: "shares", logo: "3.png", instrument_name: "ОГК-2", price: 28, mark: "₽", prices: { 'years5': { price: 326.6, date: "2015-04-07" }, 'years': { price: 19.5, date: "2020-02-13" }, 'month': { price: 175.12, date: "2020-04-22" }, } },
  //   { ticker: "AFLT", type: "shares", logo: "10.png", instrument_name: "Газпром", price: 28, mark: "₽", prices: { 'years5': { price: 326.6, date: "2015-04-07" }, 'years': { price: 19.5, date: "2020-02-13" }, 'month': { price: 175.12, date: "2020-04-22" }, } },
  //   { ticker: "OGKB", type: "shares", logo: "5.png", instrument_name: "ОГК-2", price: 28, mark: "₽", prices: { 'years5': { price: 326.6, date: "2015-04-07" }, 'years': { price: 19.5, date: "2020-02-13" }, 'month': { price: 175.12, date: "2020-04-22" }, } },
  //   { ticker: "AFLT", type: "shares", logo: "1.png", instrument_name: "Газпром", price: 28, mark: "₽", prices: { 'years5': { price: 326.6, date: "2015-04-07" }, 'years': { price: 19.5, date: "2020-02-13" }, 'month': { price: 175.12, date: "2020-04-22" }, } },
  //   { ticker: "OGKB", type: "shares", logo: "6.png", instrument_name: "ОГК-2", price: 28, mark: "₽", prices: { 'years5': { price: 326.6, date: "2015-04-07" }, 'years': { price: 19.5, date: "2020-02-13" }, 'month': { price: 175.12, date: "2020-04-22" }, } },
  // ]
  console.log('status', status);




  const trentdSures = useMemo(() => {
    return rawData ? rawData : null;
  }, [rawData]);


  if (typeof trentdSures === 'undefined' || trentdSures === undefined) {
    return <div>load</div>;
  }




  const getCost = (propsCost: number) => {
    return propsCost;
  }
  const getCostRange = (currentPrice: number, oldPrice: number) => {
    if (oldPrice <= 0) {
      return 0; // на дурака. На ноль делить нельзя
    }
    const result = ((currentPrice - oldPrice) / oldPrice) * 100

    return result.toFixed(2);
  }

  const getColorPercent = (percent:any) => {
      if(percent){
        return  "bads"
      }
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
        <div className={stylesTrend.trendInstrumentName}>
          Наименование
        </div>
      </div>

      <div className={stylesTrend.trendTableTrTd}>
        <div className={stylesTrend.trendInstrumentPrice}>
          Цена
        </div>
      </div>

      <div className={stylesTrend.trendTableTrTd}>
        <div className={stylesTrend.trendInstrumentPercent}>
        % 5 лет
        </div></div>
      <div className={stylesTrend.trendTableTrTd}>
        <div className={stylesTrend.trendInstrumentPercent}>
        % год
        </div></div>
      <div className={stylesTrend.trendTableTrTd}>
        <div className={stylesTrend.trendInstrumentPercent}>
          % месяц
        </div>
        </div>
    </div>
  }

  const GetPercentJSX =(item:any,range:any,percent:any)=> {
    const trendTableTrClass = percent < 0 ? stylesTrend.triangleDown : stylesTrend.triangleUp;
      return  <div className={stylesTrend.trendInstrumentPercent}>
            <div className={stylesTrend.instrumentPercent + " " +stylesTrend.trianglePercent} >
              <div className={trendTableTrClass} ></div></div>
            <div  className={stylesTrend.instrumentPercent}   style={{  color: percent > 0 ? '#37CF95' : '#ED5860'}} >  {percent}% </div> 
            <div  className={stylesTrend.instrumentPercent + " " +stylesTrend.trendInstrumentPercentPrice}  >{range.price}{item.mark} </div>
      </div>
  }
  

  const DashboardTrend = (props: any) => {
    const { item } = props;
    const years5Percent = getCostRange(item.price, item.prices.years5.price);
    const yearsPercent = getCostRange(item.price, item.prices.years.price);
    const monthPercent = getCostRange(item.price, item.prices.month.price);
    const price = getCost(item.price);

    return <div className={stylesTrend.trendTableTr}>
        <div className={stylesTrend.trendTableTrTd}>
        <div className={stylesTrend.trendInstrumentIndex}>
          {props.index+1}
        </div>
      </div>
    
      <div className={stylesTrend.trendTableTrTd}>
        <div className={stylesTrend.trendlogo}>
          <img alt="" src={process.env.NEXT_PUBLIC_IMG_LOGO + `${props.item.logo}`} />
        </div>
      </div>
      
      <div className={stylesTrend.trendTableTrTd}>
        <div className={stylesTrend.trendInstrumentName}>
          {props.item.instrument_name}
        </div>
      </div>

      <div className={stylesTrend.trendTableTrTd}>
        <div className={stylesTrend.trendInstrumentPrice}>
          {getCost(props.item.price)} {props.item.mark}
        </div>
      </div>
      <div className={stylesTrend.trendTableTrTd}>
          {GetPercentJSX(item, props.item.prices.years5, years5Percent)}
        </div>
      <div className={stylesTrend.trendTableTrTd}>
          {GetPercentJSX(item, props.item.prices.years, yearsPercent)}
        </div>
        <div className={stylesTrend.trendTableTrTd}>
            {GetPercentJSX(item, props.item.prices.month, monthPercent)}
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
          <DashboardTrendTitle  />
            {trentdSures && trentdSures.map((item: object, index: number) => (
              <DashboardTrend index={index} item={item} />
            ))}
          </div>

        </div>
      </ContentBox>
    </>
  )
}


