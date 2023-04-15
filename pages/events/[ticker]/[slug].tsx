import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import moment from 'moment';
import parse from 'html-react-parser';
import ContentBox from '../../../components/ContentBox'; 
import { eventsName } from '../../../constants/general';
import styles from './Slug.module.css';
import stylesNews from '../../../components/news/styleNews.module.css';

interface EventType {
  value: any;
  label: string;
  color: string;
}

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json, text/plain, */*',
};
 

const getEventClassName = (typeId: any) => {
  const color: EventType | undefined = eventsName.find((item) => item.value === typeId);
  console.log(color?.color);
  return { backgroundColor: color?.color };
};

const formatDate = (date: any) => {
  return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
};

const getEventName = (typeId: any) => {
  const type: EventType | undefined = eventsName.find((item) => item.value === typeId);
  return type?.label;
};

export default function Slug() {
  const router = useRouter();
  const { ticker, slug } = router.query;

  const { data, isLoading } = useQuery({
    queryKey: ['event', ticker, slug],
    queryFn: async () => {
      return fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/event/get/${ticker}/${slug}`, { headers }).then((res) =>
        res.json()
      );
    },
    staleTime: 1 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    enabled: ticker !== undefined && slug !== undefined,
  });

  console.log('isLoading', isLoading);
  if (typeof data === 'undefined' || data === undefined) {
    return <div>load</div>;
  }

  console.log(data);

  return (
    <ContentBox hideBorder={true}>

      <div className={styles.title}>{data.data.title}</div>
      <div className={stylesNews.currentInfo + " " + styles.infoType}>
        <div className={stylesNews.eventCircle} style={getEventClassName(data.data.typeId)}></div>
        <div className={stylesNews.dateLineEvent}>{formatDate(data.data.date)}</div>
        <div className={stylesNews.defaultTypeClassEvent}>{getEventName(data.data.typeId)}</div>
      </div>

      <div className={styles.shorttext}>{data.data.shorttext}</div>
      <div className={styles.fulltext}>
            <div className={styles.grafficNews}></div>
            {parse(data.data.fulltext)}
        </div>
    </ContentBox>
  );
}