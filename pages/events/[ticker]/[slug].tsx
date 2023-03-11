
import styles from './Slug.module.css'
import React from "react";
import parse from 'html-react-parser';
import ContentBox from "../../../components/ContentBox";


import {
  useQuery,
} from 'react-query'


import {
  useRouter
} from 'next/router'


 
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json, text/plain, */*',
}

export default () => {
  const router = useRouter();
  const {ticker, slug } = router.query;

 
 
  const { data, isLoading } = useQuery({
    queryKey: ['event', ticker, slug],
    queryFn: async () => {
      //   if(!router.isReady) return
      return fetch(`http://localhost:8083/api/event/get/${ticker}/${slug}`, { headers }).then((res) => res.json())
    },
    staleTime: 1 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    enabled: ticker !== undefined && slug !== undefined,
  });

  console.log('isLoading', isLoading);
  if (typeof data === 'undefined' || data === undefined) {
    return <div>load</div>;
  } else {
    // changeLoad();
  }

  console.log(data);

  const getTypeId = (typeId: any) => {
    return "сплит акций";
  }
  const getStyleType = (typeId: any) => {
    margin: "0px 0px 10px 0px"
  }

  return (
    <ContentBox title={data.data.title} pageTitle={data.data.title} hideBorder={true} >

      <div className={styles.panelInfo}>
        <div className={styles.styleTypeEvent + " " + getStyleType(data.data.typeId)}></div>
        <div className={styles.panelInfoTypeEvent}> {getTypeId(data.data.typeId)}</div>
        <div className={styles.panelInfoDate}> {data.data.date}</div>

      </div>

      <div className={styles.shorttext}>
        {data.data.shorttext}
      </div>

      <div className={styles.fulltext}>
        {parse(data.data.fulltext)}
      </div>
    </ContentBox>);
}

