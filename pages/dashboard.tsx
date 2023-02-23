 
import { Inter } from '@next/font/google'
import styles from './dashboard.module.css'


import ContentBox from "../components/ContentBox";
import Link from 'next/link'
 

const inter = Inter({ subsets: ['latin'] })


import {  useQuery} from 'react-query'

import { useRouter } from 'next/router'
import { getInstruments } from './../hooks/index'


export default () => {
   

  const router = useRouter(); 
 //api/instruments/list
// https://habr.com/ru/post/495324/

// https://iss.moex.com/iss/history/engines/stock/markets/shares/boardgroups/57/securities.jsonp?iss.meta=off&iss.json=extended&lang=ru&security_collection=3&date=2022-02-08&start=200&limit=100&sort_column=VALUE&sort_order=des

 // короткие имена акций
// https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities.json?iss.meta=off&iss.only=securities&securities.columns=SECID,SECNAME

//Узнавать текущую цену для конкретной ценной бумаги
//http://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities.json?iss.meta=off&iss.only=securities&securities.columns=SECID,PREVADMITTEDQUOTE
 
  const ObjectRow   = (props: any)  => {
    if(+props.item.price === 0){
      console.log(props.item.instrument_name,props.item.price);
      return;
    }
    const logo = props.item.logo;
    const name = props.item.instrument_name;
    //   console.log(props.item.images.logo);

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
          <img alt="" src={"/img/logo/"+`${logo}`} />
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
            <Link href={"/instrument/edit/"+props.item.instrument_id}>Редактировать</Link> <Link href="#">Следить за тикером</Link>
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
      return fetch(`http://localhost:8083/api/instruments/list`, { headers }).then((res) => res.json())
    },
    staleTime: 1 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    enabled: router.isReady,
  });

  if (typeof data === 'undefined' || data === undefined) {
    return <div>load</div>;
  }  

  console.log(data);

  return (
        <ContentBox hideBorder={true}>
              <div>
               {data && data.map((item:object, i:number) => (
                        <ObjectRow key={i} item={item} />
              ))} 
            </div>
        </ContentBox>
  )
}
