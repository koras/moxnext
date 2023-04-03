import { Inter } from '@next/font/google';
import Link from 'next/link';
import moment from 'moment';
import { useQuery } from 'react-query';
import { CSSProperties } from 'react';
import ContentBox from '../components/ContentBox';
import { eventsName } from '../constants/general';
import { news } from './../stories/storeNews';
import style from '../components/news/styleNews.module.css';

const inter = Inter({ subsets: ['latin'] });

interface InspectsProps {
  styleEvent?: CSSProperties;
}

export default function Inspects() {
  const getName = (event: any) => {
    // return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
  };

  const { data: rawData, isLoading, error, refetch } = useQuery(['inspects'], () => {
    console.log('request 1');
    return news.getInspect();
  });

  const classNameEvent = (props: any): CSSProperties => {
    const events = eventsName.filter((item) => item.value === props.typeId);

    return {
      backgroundColor: events[0].color,
      borderColor: events[0].color,
    };
  };
  const nameEvent = (props: any): string => {
    const events = eventsName.filter((item) => item.value === props.typeId);
    return events[0].label;
  };

   

  const data = rawData ?? null;

  const changeDate = (date: any) => {
    return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
  };

  const getUrl = (props: any) => {
     return `/inspect/${props.hash}`;
  };

  const NewsRows = (props: any) => {
    const styleEvent: CSSProperties = classNameEvent(props.item);
    const nameEvents: string = nameEvent(props.item);

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
          <div className={style.event}> {props.item.instrument_name} : {nameEvents}</div>
        </div>
        <div> 
          <div className={style.inspectsTitle}>

            <Link href={getUrl(props.item)}>{props.item.title.slice(0, 80)}</Link>

          </div>
        </div>
        <div className="news-item-head__text">
          <div className={style.inspectsTextshort}>{props.item.shorttext}</div>
        </div>
        <div className={style.controll}>
          {/* <Button size="small" onClick={() => getUrlEdit(props.item.hash)} variant="outlined">Изменить</Button> */}
        </div>
      </div>
    );
  };

  return (
    <ContentBox hideBorder={true} title="Инспектирование событий">
      <div>{data && data.map((item: object, i: number) => <NewsRows key={i} item={item} />)}</div>
    </ContentBox>
  );
}