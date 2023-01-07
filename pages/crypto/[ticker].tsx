import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './style.module.css'

import Tabs from "./../../components/tabs/index";

import ContentBox from "./../../components/ContentBox";

import {
  useEffect
} from 'react'
import {
  useRouter
} from 'next/router'

const inter = Inter({ subsets: ['latin'] })
   
export default function Inspects() {

  const router = useRouter()
  const { ticker } = router.query
 // useEffect(() => {}, [router.query.counter])


 const handleTimeChange = (params:any)=>{
  console.log('handleTimeChange',params);
}
 const objects = [
  //   {name:'5 лет',id:1,hint:'',hintInfo:'За последние 5 лет',changes:'+212',time:157784630},
     {name:'Всё время',id:1,hint:'',hintInfo:'За всю историю',changes:'+212',time:0},
     {name:'Год',id:2,hint:'',hintInfo:'за последний год',changes:'+15',time:31556926},
     {name:'месяц',id:3,hint:'',hintInfo:'за последний месяц',changes:'+35',time:2629743},
     {name:'Неделя',id:4,hint:'',hintInfo:'за неделю',changes:'-15',time:86400}, 
     {name:'День',id:5,hint:'',hintInfo:'в течении суток',changes:'+25',time:86400}, 
   ]
   const infoBox =  {title:'Изменение цены',hintInfo:'в течении суток',changes:'+212'};

  return (
    
        <ContentBox   title="График изменения цен Биткоина">
             <div className={styles.graphicTab}>

             <Tabs onTimeChange={handleTimeChange} objects={objects} infoBox={infoBox}/> 
        tabs



        </div>

        <div className={styles.pageText}>
        News
        </div>
        </ContentBox>
    
  )
}
