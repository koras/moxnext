import Link from 'next/link'
 
//import "./styleNews.css";
import { useRouter } from 'next/navigation';

import moment from 'moment';
import style from './styleNews.module.css';

//import { useRouter } from 'next/router'
import { observer } from "mobx-react-lite";
 
import Button from "@mui/material/Button";

import React, { useState, useEffect } from "react";


 
const classNameEvent = (props:any) => {
  return "news-item-head__divid news-item-head__event_" + props.type;
};

const checkChart = (data:any) => {
console.log('data',data);
  //  return props;
};

export default function ListEvents(props:any)  {


  const [news, setNews] = useState<any | null>(null);

  const instrument = props.instrument; 
 
  const getUrl = (props:any) => {
    return "/events/" + instrument.ticker + "/" + props.slug;
  };

  const changeDate = (date:any) => {
    return moment(date, 'YYYY-MM-DD').format("DD/MM/YYYY") 
  };

  const updateNews = () => {
    let dataNews = [] ;
    
    if( props.data.price &&  props.data.price){  
     // if( props.period !== 0){ 
        var CurrentDate = moment().subtract('seconds', props.period);
            dataNews = props.data.price.filter((item: any) => {
            return moment(item.date, 'YYYY-MM-DD').isAfter(CurrentDate) &&  item.title !=""
          })
     //   }else{ 
      //      dataNews = props.data.price.filter((item: any) =>    item.title !="")
          
      //  }
      }

      setNews(dataNews)
  }
  useEffect(() => {  
    updateNews();
  }, [props.period])

  

 //const navigate = useNavigate();
 const router = useRouter();
  const getUrlEdit = (hash:string) => { 
    router.push("/event/change/" + hash) 
  }; 
  const ObjectRow = (props:any) => {
    return (
      <div className={style.newsItem}> 
        <div className={style.newsItemHead}>
          <div
            className={style.date}
            onClick={() => {
              checkChart(props.item.id);
            }}
          >
            {changeDate(props.item.date)}
          </div>
          <div className={classNameEvent(props?.item)}></div>
          <div className={style.event}>{props?.item?.event}</div>
          <div className={style.title}>
            <Link href={getUrl(props.item)}>{props.item.title}</Link>
          </div>
        </div>
        <div className="news-item-head__text">{props.item.shorttext}</div>
        <div className={style.controll}>
          <Button   size="small" onClick={() => getUrlEdit(props.item.hash)} variant="outlined">Изменить</Button>
        </div>
      </div>
    );
  }; 
   return <div>
    {news && news.map((item:any, i:any) => (
         <ObjectRow key={i} item={item} />
      ))}
   </div>;
 
};
