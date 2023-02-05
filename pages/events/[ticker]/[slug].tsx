import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../../../styles/Home.module.css'
import { useParams  } from "react-router-dom";
import React, {   useState } from "react";
import { observer } from "mobx-react-lite";
//import moment from 'moment';
import { instrument } from "../../../stories/storeInstrument";
import { news } from "../../../stories/storeNews";  

import { fetchPosts,getEvent,getPost } from '../../../hooks'

import ContentBox from "../../../components/ContentBox";
 

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'


import {
  useEffect
} from 'react'
import {
  useRouter
} from 'next/router'
 


const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json, text/plain, */*',
}
 

 const usePost = async(ticker:any, slug:any) => {
  let urlRequest = `http://localhost:8083/api/event/get/${ticker}/${slug}`;
  return useQuery({
    queryKey: ['news',ticker ,slug ],
    queryFn: async ()=>  { 
      //   if(!router.isReady) return
         return  fetch(urlRequest, { headers }) .then((res) => res.json())
       },

      enabled: ticker !== undefined && slug !== undefined,
    })
}


  export default  ( ) => {


  const [event, setEvent] = useState('');
  const [load, setLoad] = useState(true);
  const router = useRouter(); 
  const {  ticker, slug } = router.query;

   let urlRequest = `http://localhost:8083/api/event/get/${ticker}/${slug}`;
   const {data,isLoading } = useQuery({
      queryKey: ['news',ticker ,slug ],
      queryFn: async ()=>  { 
     //   if(!router.isReady) return
        return  fetch(urlRequest, { headers }) .then((res) => res.json())
      },
      enabled: ticker !== undefined  && slug !== undefined ,
    });
  
    console.log('isLoading',isLoading);
    if ( typeof data === 'undefined' || data === undefined){
     return <div>load</div>;
   } 
    setLoad(false)
 
 
   console.log('data');
   console.log(typeof data);
   console.log(data);


 // if(!router.isReady) return <>Ready</>
 // setLoad(false)
 return (
  <ContentBox title={data.data.title} pageTitle={data.data.title} >
  <div>
 
  </div>
</ContentBox>);


}
 
 