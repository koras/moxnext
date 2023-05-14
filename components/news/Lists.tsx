import Link from 'next/link'

//import "./styleNews.css";
import { useRouter } from 'next/navigation';
import moment from 'moment';
import style from './styleNews.module.css';

import { observer } from "mobx-react-lite";
import Button from "@mui/material/Button";

import React, { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react"

import { eventsName } from "../../constants/general";


export async function checkChart (data: any){



  //  return props;
};

interface EventType {
  value: any;
  label: string;
  color: string;
}

export async function classNameEvent(typeId: any) {
  const color: EventType | undefined = eventsName.find(item => item.value === typeId)
  return  {backgroundColor: color?.color };
  
};

export default function ListEvents(props: any) {

  const { data: session } = useSession();

  const changeDate = (date: any)=>{
    return moment(date, 'YYYY-MM-DD').format("DD/MM/YYYY")
  };
 
  

  const [news, setNews] = useState<any | null>(null);

  const instrument = props.instrument;

  const getUrl = (props: any) => {
    return "/events/" + instrument.ticker + "/" + props.slug;
  };
 

  const getNameEvent = (typeId: any) => {
    const type: EventType | undefined = eventsName.find(item => item.value === typeId)
    return type?.label;
  };
  const updateNews = () => {
    let dataNews = []; 

    if (props.data.price && props.data.price) {
      var CurrentDate = moment().subtract('seconds', props.period);
      dataNews = props.data.price.filter((item: any) => {
        return moment(item.date, 'YYYY-MM-DD').isAfter(CurrentDate) && item.title != ""
      })
      
      dataNews=  dataNews.sort((a:any, b:any) => {
        return new Date(b.date).toISOString() > new Date(a.date).toISOString() ? 1 : -1;
          }
      )
    } 
    setNews(dataNews)
  }
  useEffect(() => {
    updateNews();
  }, [props.period])

 const classNameEvent = (typeId: any)=> {

    const color: EventType | undefined = eventsName.find(item => item.value === typeId)

    return  {backgroundColor: color?.color };
    
  };

 

  
  const router = useRouter();
  const getUrlEdit = (hash: string) => {
    router.push("/event/change/" + hash)
  };
  const ObjectRow = (props: any) => {
    return (
      <div className={style.newsItem}>
        <div className={style.newsItemHead}>
          <div
            className={style.currentInfo}
            onClick={() => {
              checkChart(props.item.id);
            }}
          >
          <div  className={style.eventCircle}  style={classNameEvent(props.item.typeId)}></div>
            <div className={style.dateLineEvent}>{changeDate(props.item.date)}</div> 
            <div className={style.defaultTypeClassEvent}>{getNameEvent(props.item.typeId)}</div>
          </div>

          <div className={style.title}>
            <Link href={getUrl(props.item)}>{props.item.title}</Link>
          </div>
        </div>
        <div className="news-item-head__text">{props.item.shorttext}</div>
        <div className={style.controll}>
          {(session )?<Button size="small" onClick={() => getUrlEdit(props.item.hash)} variant="outlined">Изменить</Button>:<></>}
        </div>
      </div>
    );
  };
  return <div>
    {news && news.map((item: any, i: any) => (
      <ObjectRow key={i} item={item} />
    ))}
  </div>;

};
