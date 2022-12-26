import '../styles/globals.css'
import './../components/styleContent.css';
import './../components/menu/styleMenu.css'; 
import './../components/header/styleHeader.css'; 
import './../components/LKHeader/style.css'; 
import './../components/search/styleSearch.css'; 
 


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
