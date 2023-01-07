 
import { Inter } from '@next/font/google'
import styles from './dashboard.module.css'


import ContentBox from "../components/ContentBox";
import Link from 'next/link'
 

const inter = Inter({ subsets: ['latin'] })


import { getInstruments } from './../hooks/index'


export default function Dashboard() {
   

 


  const ObjectRow   = (props: any)  => {
    const logo = props.item.images.logo;
    const name = props.item.name;
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




  //const{ isLoading, isError, data, error }  = getInstruments(10);

  const { data }  = getInstruments(10);
    let  instruments = data;
    console.log(data);
  // if (isError) {
  //   return <span>Ошибка: {error.message}</span>;
  // }
  // if (isLoading) return <p>Загрузка...</p>;

  // if (error) return <p>Ошибка: {error.message}</p>;


  return (
        <ContentBox hideBorder={true}>
              <div>
              {instruments && instruments.map((item:object, i:number) => (
                       <ObjectRow key={i} item={item} />
              ))}
            </div>
        </ContentBox>
  )
}
