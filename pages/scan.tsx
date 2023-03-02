 
import { Inter } from '@next/font/google'
import styles from './dashboard.module.css'


import ContentBox from "../components/ContentBox";
import Link from 'next/link'
 

const inter = Inter({ subsets: ['latin'] })


import {  useQuery} from 'react-query'

import { useRouter } from 'next/router'
import { getInstruments } from '../hooks/index'


export default () => {
   

  const router = useRouter(); 

  const ObjectRow   = (props: any)  => {
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
    const getChangeColor = (item: any) => {
      const price = +item.change;
        return (price >= 0)? styles.dashboardCostPlus:styles.dashboardCostMinus;
    };

    //  const logo = require(props.item.images.logo).default;
    return (
      <div className={styles.dashboardItem}> 
        <div className={styles.dashboardItemImage}>
          <img alt="" src={`${logo}`} />
        </div>
        <div className={styles.dashboardItemDescription}>
          <div className={styles.dashboardItemDescriptionHead}>
            <div className={styles.dashboardItemDescriptionHead__name}>
          <Link href={"/"+props.item.type+"/"+props.item.ticker}>{name}</Link></div>

            <div className={styles.dashboardItemDescriptionHead__price}>
              {props.item.price}
              {props.item.currency}
            </div> 
          </div>

          <div className={styles.dashboardItemDescriptionText}>
            {props.item.description}
          </div>

          <div className={styles.dashboardItemDescriptionControll}>
          <Link href="#">Следить за тикером</Link>
          </div>
        </div>


        <Link  href={"/"+props.item.type+"/"+props.item.ticker}>
         
        <div className={styles.dashboardItemChange}>
          <div className={styles.dashboardItemChang__chartInfo}>
            <div className={styles.dashboardItemChang__chartInfo__title}>
              Изменение цены
            </div> 

            <div className={styles.dashboardItemChang__chartInfo__price}>
              <div
                className={
                  styles.dashboardChartInfo__cost + " " + getChangeColor(props.item)
                }
              >
                {getPriceChange(props.item)}%
              </div>
              <div className={styles.dashboardChartInfo__costTime}>за год</div>
            </div>
          </div>
          <div className={styles.dashboardItemChang__chart}>
            {/* <LineMiniTicker /> */}
          </div>
        </div>
        </Link>
      </div>
    );
  };


  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json, text/plain, */*',
  }

  const { data, isLoading } = useQuery({
    queryKey: ['instruments_list'],
    queryFn: async () => {
      //   if(!router.isReady) return
      const  start= 600;

      const moexUrl =`https://iss.moex.com/iss/apps/infogrid/equities/rates.json?_=1675803368101&lang=ru&iss.meta=off&sort_order=asc&sort_column=SECID&start=${start}&limit=100&sec_type=stock_common_share,stock_preferred_share,stock_russian_depositary_receipt,stock_foreign_share,stock_foreign_share_dr&bg=stock_tplus,stock_d_tplus`;
      return fetch(moexUrl, { headers }).then((res) => res.json())
    },
    staleTime: 1 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    enabled: router.isReady,
  });

  if (typeof data === 'undefined' || data === undefined) {
    return <div>load</div>;
  }  

  console.log(data.rates);

  return (
        <ContentBox hideBorder={true}>
              <div>
               {/* {data && data.map((item:object, i:number) => (
                        <ObjectRow key={i} item={item} />
              ))}  */}
            </div>
        </ContentBox>
  )
}
