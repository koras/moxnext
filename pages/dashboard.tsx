
import { Inter } from '@next/font/google'
import styles from './dashboard.module.css'


import ContentBox from "../components/ContentBox";
import Link from 'next/link'


const inter = Inter({ subsets: ['latin'] })


import { useQuery, useQueryClient, useMutation } from 'react-query'

import {
  useEffect, useState,useRef, useMemo
} from 'react'
import { useRouter } from 'next/router'
import { getInstruments } from './../hooks/index'
import { instrumentStore } from './../stories/storeInstrument'
import EchartsMini from './../components/charts/EchartsMini'

import { getPercent } from './../components/general/functions'
import DashboardControll from './../components/dashboard/controll'
import DashboardRows from './../components/dashboard/dashboardRows'



function MyComponent()  {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [getParams, setParams] = useState({ typeId: 'all', level: 0 });

  const [typeId, setTypeId] = useState( 'all');
  const [level, setLevel] = useState( '0');

  const searchTermRef = useRef('all');

  const onChangeTypeList = (params: any) => {
    setTypeId(params.typeId);
    setLevel(params.level)
 //   searchTermRef.current = params.typeId;
//    setParams(params);
  }


  


  const  { data: rawData,  isLoading, error,refetch }= useQuery(
    ['instruments',typeId,level ],
   // ['instruments',typeId],
    () => {
      console.log('request 1');
      return instrumentStore.getDashboard({typeId:typeId,level:level})
    },
    {
  //  staleTime: 1 * 60 * 1000,
  //  cacheTime: 5 * 60 * 1000,
    enabled: router.isReady ,
    }
  );

  
  const data = useMemo(() => {
    return rawData ? rawData : null;
  }, [rawData]);

 


  const changeParams = (props:any) => {
    console.log('request 2'); 
   console.log('getParams = 1 :', props)
    queryClient.prefetchQuery(['instruments_list',props?.typeId, props?.level], () => {
        console.log('getParams = 2 :', props)
       const result =  instrumentStore.getDashboard(props);
 
       console.log(result);
        return result;
      }
    );
 
  }


  if (typeof data === 'undefined' || data === undefined) {
    return <div>load</div>;
  }

 
  return (
    <ContentBox hideBorder={true}>
      <div>
        <DashboardControll onChangeType={onChangeTypeList} />
      </div>
         
      <div>
         {data &&  data.map((item: object, i: number) => (
          <DashboardRows key={i} item={item} />
        ))}
      </div>
    </ContentBox>
  )
}


export default (MyComponent);
