 
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import ContentBox from "../components/ContentBox";

const inter = Inter({ subsets: ['latin'] })

export default function Dashboard() {
  return (
        <ContentBox hideBorder={false}>
             dashboard  dashboard
        </ContentBox>
  )
}
