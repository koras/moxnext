
import { Inter } from '@next/font/google'
import Link from 'next/link'
//import stylesHome from '../styles/Home.module.css';
import ContentBox from "../components/ContentBox"
import moment from 'moment';

import style from "../components/news/styleNews.module.css"
import { eventsName } from "../constants/general"

import { useQuery, useQueryClient, useMutation } from 'react-query';

import {
  useEffect, useState, useRef, useMemo, CSSProperties
} from 'react'


import { news } from './../stories/storeNews'

const inter = Inter({ subsets: ['latin'] })



interface Props {
  styleEvent?: CSSProperties;
}


export default function Inspects() {


  const getName = (event: any) => {
    //   return moment(date, 'YYYY-MM-DD').format("DD/MM/YYYY") 
  };



  const { data: rawData, isLoading, error, refetch } = useQuery(
    ['inspects'],
    // ['instruments',typeId],
    () => {
      console.log('request 1');
      return news.getInspect()
    },
    {
      //  staleTime: 1 * 60 * 1000,
      //  cacheTime: 5 * 60 * 1000,
      //  enabled: router.isReady ,
    }
  );
  const classNameEvent = (props: any): CSSProperties => {

    const events = eventsName.filter(item => item.value === props.typeId);

    return {
      backgroundColor: events[0].color,
      borderColor: events[0].color,
    } 
  };

  const data = useMemo(() => {
    return rawData ? rawData : null;
  }, [rawData]);

  const changeDate = (date: any) => {
    return moment(date, 'YYYY-MM-DD').format("DD/MM/YYYY")
  };

  const getUrl = (props: any) => {
    return "/events/" + props.instrument_ticker + "/" + props.slug;
  };
  const NewsRows = (props: any) => {
    const styleEvent: CSSProperties = classNameEvent(props.item);

    return (
      <div className={style.newsInspects}>



        <div className={style.inspectsItemHead}>
          
        <div className={style.eventCircle} style={styleEvent}></div>
          <div
            className={style.date}
            onClick={() => {
              // checkChart(props.item.id);
            }}
          >
            {changeDate(props.item.date)}
          </div>
          <div className={style.event}>{props?.item?.event}</div>
        </div>
        <div  >
          <div className={style.inspectsTitle}>
            <Link href={getUrl(props.item)}>{props.item.title.slice(0, 80)}</Link>
          </div>
        </div>

        <div className="news-item-head__text">
          <div className={style.inspectsTextshort}>{props.item.shorttext}</div>
        </div>

        <div className={style.controll}>
          {/* <Button   size="small" onClick={() => getUrlEdit(props.item.hash)} variant="outlined">Изменить</Button> */}
        </div>
      </div>
    );
  };


  return (
    <ContentBox hideBorder={true} title="Инспектирование событий">

      <div>
        {data && data.map((item: object, i: number) => (
          <NewsRows key={i} item={item} />
        ))}
      </div>

    </ContentBox>
  )
}
