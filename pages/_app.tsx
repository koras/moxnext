
import '../styles/globals.css' 
import 'reactjs-popup/dist/index.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
// import "react-datepicker/dist/react-datepicker.css"; 

/// import 'react-datepicker/dist/react-datepicker.css'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'
import "react-datetime/css/react-datetime.css";



import type { AppProps } from 'next/app'
import React from "react";
import { ReactQueryDevtools } from "react-query/devtools";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {

 // const [queryClient] = React.useState(() => new QueryClient());

  return  <QueryClientProvider client={queryClient}> 
       <Component {...pageProps} />
       <ReactQueryDevtools initialIsOpen={true} />
     </QueryClientProvider>

}
