
import '../styles/globals.css' 
import 'reactjs-popup/dist/index.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
// import "react-datepicker/dist/react-datepicker.css"; 
import { SessionProvider } from "next-auth/react"
import { loadEnvConfig } from '@next/env'
import { resolve } from "path";
 

/// import 'react-datepicker/dist/react-datepicker.css'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'
import "react-datetime/css/react-datetime.css";


 
import React from "react";
import { ReactQueryDevtools } from "react-query/devtools";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient()

 

export default function App({ Component, pageProps: { session, ...pageProps }  }: any) {
  
 // const projectDir = process.cwd()

 // console.log('projectDir',projectDir);
 // require('dotenv').config({ path: './../.env.development' })
 // loadEnvConfig(resolve(__dirname, ".."));
 
  return  <SessionProvider session={session}>
          <QueryClientProvider client={queryClient}> 
              <Component {...pageProps} />
              <ReactQueryDevtools initialIsOpen={true} />
            </QueryClientProvider>
        </SessionProvider>
 
   
}
