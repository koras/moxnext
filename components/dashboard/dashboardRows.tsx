
import { Inter } from '@next/font/google'
import styles from './dashboard.module.css'


import ContentBox from "./../ContentBox";
import Link from 'next/link'


const inter = Inter({ subsets: ['latin'] })


import { useQuery, useQueryClient, useMutation } from 'react-query'

import {
  useEffect, useState,useRef, useMemo
} from 'react'
import { useRouter } from 'next/router'
import { getInstruments } from './../../hooks/index'
import { instrumentStore } from './../../stories/storeInstrument'
import EchartsMini from './../charts/EchartsMini'

import { getPercent } from './../general/functions'
import DashboardControll from './../dashboard/controll'



function MyComponent(props:any): JSX.Element    {

    if (+props.item.price === 0) {
        console.log(props.item.instrument_name,props.item.price);
        return <></>;
      }

    const getChangeColor = (p1: any, p2: any) => {
        return (p2 > p1) ? styles.dashboardCostPlus : styles.dashboardCostMinus;
    };

      
    const logo = props.item.logo;
    const name = props.item.instrument_name;

    const getPriceChange = (item: any) => {
      const price = +item.change;
      if (price >= 0) {
        return "+" + price;
      } else {
        return price;
      }
    };

     // const logo = require(props.item.images.logo).default;
    ///  const logo = require(props.item.images.logo);

   // const logo = "";
    return (
      <div className={styles.dashboardItem}>
        <div className={styles.dashboardItemImage}>
          <img alt="" src={"/img/logo/" + `${logo}`} />
        </div>
        <div className={styles.dashboardItemDescription}>
          <div className={styles.dashboardItemDescriptionHead}>
            <div className={styles.dashboardItemDescriptionHead__name}>
              <Link href={"/" + props.item.type + "/" + props.item.ticker}>{name}</Link></div>

            <div className={styles.dashboardItemDescriptionHead__price}>
              {props.item.price} {props.item.mark}
            </div>
          </div>

          <div className={styles.dashboardItemDescriptionText}>
            {props.item.description}
          </div>

          <div className={styles.dashboardItemDescriptionControll}>

            <Link href={"/instrument/edit/" + props.item.instrument_id}>??????????????????????????</Link>
            <Link href="#">?????????????? ???? ??????????????</Link>
          </div>
        </div>
        <Link href={"/" + props.item.type + "/" + props.item.ticker}>
          <div className={styles.dashboardItemChange}>
            <div className={styles.dashboardItemChang__chartInfo}>
              <div className={styles.dashboardItemChang__chartInfo__title}>
                {/* ?????????????????? ???????? */}
              </div>

              <div className={styles.dashboardItemChang__chartInfo__price}>
                <div
                  className={
                    styles.dashboardChartInfo__cost + " " + getChangeColor(props.item.price_year, props.item.price)
                  }
                >
                  {getPercent(props.item.price_year, props.item.price)}%
                </div>
                <div className={styles.dashboardChartInfo__costTime}>???? ??????</div>
              </div>
            </div>
            <div className={styles.dashboardItemChang__chart}>
              <EchartsMini prices={props.item.prices} />
            </div>
          </div>
        </Link>
      </div>
    );
  }




export default (MyComponent);
