
import { Inter } from '@next/font/google'
import styles from './dashboard.module.css'


import ContentBox from "../components/ContentBox";
import Link from 'next/link'


const inter = Inter({ subsets: ['latin'] })


import { useQuery, useQueryClient, useMutation } from 'react-query'

import {
  useEffect, useState
} from 'react'
import { useRouter } from 'next/router'
import { getInstruments } from './../hooks/index'
import { instrumentStore } from './../stories/storeInstrument'
import EchartsMini from './../components/charts/EchartsMini'

import { getPercent } from './../components/general/functions'
import DashboardControll from './../components/dashboard/controll'



export default () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [getParams, setParams] = useState({ typeId: 0, typeLevel: 0 });

  const onChangeTypeList = (params: any) => {

    setParams(params);
  }
  const query = useQuery({
    queryKey: ['instruments_list'],
    queryFn: async () => {
      console.log('request 1');
      return instrumentStore.getDashboard(getParams)
    },
    staleTime: 1 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    enabled: router.isReady,
  });

  // useEffect(() => {
  //   queryClient.prefetchQuery(['instruments_list', getParams?.typeId, getParams?.typeLevel], () => {
  //     console.log('getParams', getParams)
  //     return instrumentStore.getDashboard(getParams)
  //   }
  //   );
  // }, [getParams, getParams?.typeId, getParams?.typeLevel]);


  const changeParams = (props:any) => {
    console.log('request 2');
   // setParams(props);
   console.log('getParams = 1 :', props)
    queryClient.prefetchQuery(['instruments_list',props?.typeId, props?.level], () => {
        console.log('getParams = 2 :', props)
       const result =  instrumentStore.getDashboard(props);
       console.log('result==');
       console.log(result);
        return result;
      }
    );
  }


  if (typeof query.data === 'undefined' || query.data === undefined) {
    return <div>load</div>;
  }


  const ObjectRow = (props: any) => {
    console.log('ObjectRow');
    if (+props.item.price === 0) {
      console.log(props.item.instrument_name,props.item.price);
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

            <Link href={"/instrument/edit/" + props.item.instrument_id}>Редактировать</Link>
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

  return (
    <ContentBox hideBorder={true}>
      <div>
        <DashboardControll onChangeType={changeParams} />
      </div>
         
      <div>
        {query && query.data && query.data.map((item: object, i: number) => (
          <ObjectRow key={i} item={item} />
        ))}
      </div>
    </ContentBox>
  )
}
