import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './style.module.css'
 

import ContentBox from "./../../../components/ContentBox";
 

import {
  useEffect
} from 'react'
import {
  useRouter
} from 'next/router'

const inter = Inter({ subsets: ['latin'] })
   
export default function Index() {
 
  return (
    
        <ContentBox   title="График изменения цен Биткоина">
            test
        </ContentBox>
    
  )
}
