
import { Inter } from '@next/font/google'
import styles from './dashboard.module.css'


import ContentBox from "../components/ContentBox";
import Link from 'next/link'


const inter = Inter({ subsets: ['latin'] })


import { useQuery, useQueryClient, useMutation } from 'react-query'

import {
  useEffect, useState, useRef, useMemo
} from 'react'
import { useRouter } from 'next/router'
import { getInstruments } from './../hooks/index'
import { instrumentStore } from './../stories/storeInstrument'
import EchartsMini from './../components/charts/EchartsMini'

import { getPercent } from './../components/general/functions'
import DashboardControll from './../components/dashboard/controll'
import DashboardRows from './../components/dashboard/dashboardRows'



function MyComponent() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { level, type: typeId } = router.query;


  const onChangeTypeList = (params: any) => {


    router.push({
      pathname: '/dashboard',
      query: {
        type: params.typeId,
        level: params.level,
      }
    });
  }





  const { data: rawData, isLoading, error, refetch } = useQuery(
    ['instruments', typeId, level],
    // ['instruments',typeId],
    () => {
      console.log('request 1');
      return instrumentStore.getDashboard({ typeId: typeId, level: level })
    },
    {
      //  staleTime: 1 * 60 * 1000,
      //  cacheTime: 5 * 60 * 1000,
      enabled: router.isReady,
    }
  );

  const data = useMemo(() => {
    return rawData ? rawData : null;
  }, [rawData]);


  if (typeof data === 'undefined' || data === undefined) {
    return <div>load</div>;
  }


  return (
    <ContentBox hideBorder={true}>
      <div>
        <DashboardControll level={level} typeId={typeId} onChangeType={onChangeTypeList} />
      </div>

      <div>
        {data && data.map((item: object, i: number) => (
          <DashboardRows key={i} item={item} />
        ))}
      </div>
    </ContentBox>
  )
}


export default (MyComponent);
