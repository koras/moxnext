
import { Inter } from '@next/font/google'
import styles from './dashboard.module.css'


import ContentBox from "../components/ContentBox";
import Link from 'next/link'


const inter = Inter({ subsets: ['latin'] })


import { useQuery } from 'react-query'

import { useRouter } from 'next/router'
import { getInstruments } from './../hooks/index'
import { instrumentStore } from './../stories/storeInstrument'
import EchartsMini from './../components/charts/EchartsMini'

import { getPercent } from './../components/general/functions'
import DashboardControll from './../components/dashboard/controll'
 


export default () => {


  const router = useRouter();

  const ObjectRow = (props: any) => {
    if (+props.item.price === 0) {
      // console.log(props.item.instrument_name,props.item.price);
      return;
    }
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
    const getChangeColor = (p1: any, p2: any) => {
      //const price = p2 > p1;
      return (p2 > p1) ? styles.dashboardCostPlus : styles.dashboardCostMinus;

    };

    //  const logo = require(props.item.images.logo).default;
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
                        
            <Link href={"/instrument/edit/"+props.item.instrument_id}>Редактировать</Link> 

            <Link href="#">Следить за тикером</Link>
          </div>
        </div>


        <Link href={"/" + props.item.type + "/" + props.item.ticker}>

          <div className={styles.dashboardItemChange}>
            <div className={styles.dashboardItemChang__chartInfo}>
              <div className={styles.dashboardItemChang__chartInfo__title}>
                {/* Изменение цены */}
              </div>

              <div className={styles.dashboardItemChang__chartInfo__price}>
                <div
                  className={
                    styles.dashboardChartInfo__cost + " " + getChangeColor(props.item.price_year, props.item.price)
                  }
                >
                  {getPercent(props.item.price_year, props.item.price)}%
                </div>
                <div className={styles.dashboardChartInfo__costTime}>за год</div>
              </div>
            </div>
            <div className={styles.dashboardItemChang__chart}>
              <EchartsMini prices={props.item.prices} />
            </div>
          </div>
        </Link>
      </div>
    );
  };




  const { data, isLoading } = useQuery({
    queryKey: ['instruments_list'],
    queryFn: async () => {
      //   if(!router.isReady) return
      return instrumentStore.getDashboard()
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
          <DashboardControll />
      </div>

      <div>
        {data && data.map((item: object, i: number) => (
          <ObjectRow key={i} item={item} />
        ))}
      </div>
    </ContentBox>
  )
}
