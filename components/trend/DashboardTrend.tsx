import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import stylesTrend from './Trend.module.css'
const crypto = require('crypto');
//import { instrumentStore } from './../stories/storeInstrument'

//import ContentBox from "../components/ContentBox";
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

export default function DashboardTrend(props: any) {
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

  const getColorPercent = (percent: any) => {
    if (percent) {
      return "bads"
    }
  }



  const getStylePercent = (percent: any) => {
    return {
      color: percent > 0 ? '#37CF95' : '#ED5860',
      padding: percent > 0 ? '0px 0px 0px 5px' : '0px 0px 0px 0px',
    }
  }


  const GetPercentJSX = (item: any, range: any, percent: any) => {

    if (range.price === 0) {
      return <div className={stylesTrend.trendInstrumentData + " " + stylesTrend.trendInstrumentPercentNull}>---</div>
    }


    const trendTableTrClass = percent < 0 ? stylesTrend.triangleDown : stylesTrend.triangleUp;

    const stylePercent = getStylePercent(percent);
    //{  color: percent > 0 ? '#37CF95' : '#ED5860'}
    return <div className={stylesTrend.trendInstrumentData}>
      <div>
        <div className={stylesTrend.instrumentPercent} >
          <div className={stylesTrend.trianglePercent} >
            <div className={trendTableTrClass} ></div>
          </div>
        </div>
        <div className={stylesTrend.instrumentPercent + " " + stylesTrend.instrumentPercentData} style={stylePercent} >  {percent}% </div>
      </div>
      <div className={stylesTrend.instrumentPercent + " " + stylesTrend.trendInstrumentPercentPrice}>{range.price}{item.mark} </div>
    </div>
  }


 // const DashboardTrend = (props: any) => {
    const { item } = props;
    const years5Percent = getCostRange(item.price, item.prices.years5.price);
    const yearsPercent = getCostRange(item.price, item.prices.years.price);
    const monthPercent = getCostRange(item.price, item.prices.month.price);
    const price = getCost(item.price);

    return   <div className={stylesTrend.trendTableTr+ " "+ stylesTrend.trendTrHover}>
      <div className={stylesTrend.trendTableTrTd}>
        <div className={stylesTrend.trendInstrumentIndex}>
          {props.index + 1}
        </div>
      </div>

      <div className={stylesTrend.trendTableTrTd}>
        <div className={stylesTrend.trendlogo}>
          <img alt="" src={process.env.NEXT_PUBLIC_IMG_LOGO + `${props.item.logo}`} />
        </div>
      </div>

      <div className={stylesTrend.trendTableTrTd + " "+ stylesTrend.trendTableTrTdName}>
    
      <Link href={ props.item.type+"/"+ props.item.ticker}> 
            <div className={stylesTrend.trendInstrumentName}>
              {props.item.instrument_name}
            </div>
        </Link> 
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


