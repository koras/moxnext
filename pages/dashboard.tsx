
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
    console.log('params.typeId',params.typeId);
 //   searchTermRef.current = params.typeId;
//    setParams(params);
    console.log('searchTermRef',searchTermRef.current,router.isReady &&  !!searchTermRef.current,router.isReady ,   !!searchTermRef.current,);
  }


  const  { data: rawData,  isLoading, error,refetch }= useQuery(
    ['instruments',typeId,level ],
   // ['instruments',typeId],
    () => {
      console.log('request 1');
      return instrumentStore.getDashboard({typeId:typeId,level:level},'tp1')
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

 

  //  useEffect(() => {
  //   queryClient.prefetchQuery(['instruments_list', getParams?.typeId, getParams?.level], () => {
  //     console.log('getParams', getParams)
  //     return instrumentStore.getDashboard(getParams)
  //   }
  //   );

  //  }, [getParams, getParams?.typeId, getParams?.level]);


  const changeParams = (props:any) => {
    console.log('request 2'); 
   console.log('getParams = 1 :', props)


   //setParams(props);
    queryClient.prefetchQuery(['instruments_list',props?.typeId, props?.level], () => {
        console.log('getParams = 2 :', props)
       const result =  instrumentStore.getDashboard(props,'tp2');
       console.log('result==');
       console.log(result);
        return result;
      }
    );

   // refetch();
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
