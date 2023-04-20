import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import moment from 'moment';
import parse from 'html-react-parser';
import ContentBox from '../../../components/ContentBox'; 
import { eventsName } from '../../../constants/general';

import EchartsEvent from '../../../components/charts/EchartsEvent'; 
import InfoBoxInstrument from '../../../components/Infobox/Infobox'; 
 
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
  return moment(date, 'DD/MM/YYYY').format('DD/MM/YYYY');
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

  console.log('data.data.price');

  console.log(data.instrument);

  return (
    <ContentBox hideBorder={true}> 
    <InfoBoxInstrument instrument={data.instrument} />

      <div className={stylesNews.slugContent}> 
        <div className={stylesNews.title}><h1>{data.data.title}</h1></div>
        <div className={stylesNews.currentInfo + " " + styles.infoType}>
          <div className={stylesNews.eventCircle} style={getEventClassName(data.data.typeId)}></div>
          <div className={stylesNews.dateLineEvent}>{formatDate(data.data.date)}</div>
          <div className={stylesNews.defaultTypeClassEvent}>{getEventName(data.data.typeId)}</div>
        </div>
        <div className={stylesNews.shorttext}>
         <p>  {data.data.shorttext}
         </p>
          </div>
        <div className={styles.fulltext}>
              <div className={styles.grafficNews}>
                <EchartsEvent 
                instrument={data.instrument}
                dataInfo={data.price}
                  period={604800} 
                />
                
              </div>
              {parse(data.data.fulltext)}
        </div>
      </div>
    </ContentBox>
  );
}