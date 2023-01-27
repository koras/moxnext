import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../../../styles/Home.module.css'
import { useParams  } from "react-router-dom";
import React, {  useRef,useState } from "react";
import { observer } from "mobx-react-lite";
//import moment from 'moment';
import { instrument } from "./../../../stories/storeInstrument";
import { news } from "./../../../stories/storeNews";  

import { fetchPosts,usePosts  } from '../../../hooks'

import ContentBox from "./../../../components/ContentBox";


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
 
// const fetchPosts = async () => {
 
//   const res = await fetch("https://jsonplaceholder.typicode.com/users");
//   console.log( res );
//   return res.json();
// };
//export const  CreateTicker = observer( (  request ) => {
export const  CreateTicker = ( ) => {
//export default function CreateTicker() {



 
const{ isLoading, isError, data}  = usePosts(10);
if (isError) {
  return <span>Ошибка: </span>;
}
if (isLoading) return <p>Загрузка...</p>;
if (isError) return <p>Ошибка: </p>;
 
console.log(data);

 
return (
  <ContentBox >
    <div>
        {data.map((todo:any) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
    </div>
  </ContentBox>
);
}


export default CreateTicker;
 