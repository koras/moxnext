import Link from 'next/link'
 
//import "./styleNews.css";
import { useRouter } from 'next/navigation';

import style from './styleNews.module.css';

import { observer } from "mobx-react-lite";
 
import Button from "@mui/material/Button";


import { getNews } from './../../hooks/index'


//import { useNavigate } from "react-router-dom";
// event: "Новости",
// type: "news",
// ticker: 'btc',
// title_url: 'kurs-ruble',
// instrumentId: 1111,
// date: "12.12.2022",

const getUrl = (props:any) => {
  return "/events/" + props.ticker + "/" + props.url;
};
const classNameEvent = (props:any) => {
  return "news-item-head__divid news-item-head__event_" + props.type;
};

const checkChart = (props:any) => {
  return props.id;
};

export default function ListEvents(params:any)  {
 //const navigate = useNavigate();
 const router = useRouter();
  const getUrlEdit = (props:any) => { 
    router.push("/event/edit/" + props.ticker + "/" + props.url) 
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
            {props.item.date}
          </div>
          <div className={classNameEvent(props?.item)}></div>
          <div className={style.event}>{props?.item?.event}</div>
          <div className={style.title}>
            <Link href={getUrl(props.item)}>{props.item.title}</Link>
          </div>
        </div>
        <div className="news-item-head__text">{props.item.text}</div>

        <div className={style.controll}>
          <Button   size="small" onClick={() => getUrlEdit(props.item)} variant="outlined">Изменить</Button>
        </div>
      </div>
    );
  }; 


  const  { isLoading, error, data } = getNews(params.ticker+'112',10);

  console.log('storeNews',isLoading,error);
  if (isLoading) return <div > 'Loading...'</div>;
 
   return <div >
    {data.map((item:any, i:any) => (
         <ObjectRow key={i} item={item} />
      ))}
   </div>;
 

};
