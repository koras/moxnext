import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './style.module.css'
import stylesHome from './../../components/styleContent.module.css'

import Tabs from "./../../components/tabs/index";

import Button from "@mui/material/Button";

import ContentBox from "./../../components/ContentBox";
import { LineTicker } from "./../../components/charts/LineEvents";
import ListEvents from "./../../components/news/Lists";

import {
  useState,
  useEffect
} from 'react'
import {
  useRouter
} from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Index() {

  const router:any = useRouter();
 

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
  const [isload, setLoad] = useState(false);
  const [instrument, setInstrument] = useState({});
  const [getData, setData] = useState<Array<IEvent>>(Array<IEvent>);
  const [newsEvent, setNews] = useState<Array<IEvent>>(Array<IEvent>);



  useEffect(() => {
    const getEventsTicker = async (tickers: any) => {

   //  await getNews(tickers,100);

      const headers = {
        'Accept': 'application/json; charset=utf-8',
        'Content-Type': 'application/json, text/plain, */*',
      }
      let urlRequest = `http://localhost:8083/api/events/${tickers}`;
        console.log( urlRequest);
    const  datas = fetch(urlRequest, {   headers})
        .then((response: any) => {
          console.log('fetch', response);
          return response.json()
          return response
        })
        .then((data: any) => {

          setNews(data.data);
          setInstrument(data.instrument);
          console.log(data.data);
       //   setData(data.data);
      //    setInstrument(data.instrument);
          setLoad(true);
        }).catch(function (error) {
          console.log("Ошибка обработана, продолжить работу ");
          console.log( error);
        });

        console.log(datas);
  //    console.log('result');
    };


    if (router.isReady && !isload) {
        getEventsTicker(ticker);
    }
  });



 
  const getUrlEdit = (ticker:string) => {  
    router.push("/event/create/" + ticker + "/") 
  };

  const handleTimeChange = (params: any) => {
    console.log('handleTimeChange', params);
  }
  const objects = [
    //   {name:'5 лет',id:1,hint:'',hintInfo:'За последние 5 лет',changes:'+212',time:157784630},
    { name: 'Всё время', id: 1, hint: '', hintInfo: 'За всю историю', changes: '+212', time: 0 },
    { name: 'Год', id: 2, hint: '', hintInfo: 'за последний год', changes: '+15', time: 31556926 },
    { name: 'месяц', id: 3, hint: '', hintInfo: 'за последний месяц', changes: '+35', time: 2629743 },
    { name: 'Неделя', id: 4, hint: '', hintInfo: 'за неделю', changes: '-15', time: 86400 },
    { name: 'День', id: 5, hint: '', hintInfo: 'в течении суток', changes: '+25', time: 86400 },
  ]
  const infoBox = { title: 'Изменение цены', hintInfo: 'в течении суток', changes: '+212' };

  return (
    <ContentBox title="" hideBorder={true}>
      <div className={styles.graphicHead}>
        <div className={styles.title}>Биткоин:График событий</div>
        <div className={styles.button}>
          <Button size="small" onClick={() => getUrlEdit(ticker)} variant="outlined">Добавить событие</Button>
        </div>
      </div>
      <div className={stylesHome.boxContent}>
        <div className={styles.graphicTab}>
          <Tabs onTimeChange={handleTimeChange} objects={objects} infoBox={infoBox} />
          <LineTicker ticker={ticker} />
        </div>

        <div className={styles.pageText}> 
          <ListEvents instrument={instrument} news={newsEvent}/> 
        </div>
      </div>
    </ContentBox>

  )
}
