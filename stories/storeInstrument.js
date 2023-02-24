//import { observable,autorun, makeObservable, computed, action }  from "mobx"
// https://www.tradingview.com/symbols/BTCUSD/history-timeline/#the-british-are-coming-2022-09-30

import { makeAutoObservable } from "mobx";
import { dataBitcoin } from "./bitcoinData";
import { useQuery,useQueries } from 'react-query'
//import _ from "lodash";
 
class storeInstrument {
  constructor() {
    makeAutoObservable(this);
  }

 

  getAll() {
    return this.instruments;
  }

  getNew(ticker, url) {
    const event = this.instruments.filter((item) => {
      return item.url === url && item.ticker === ticker;
    });
    return event[0];
  }
  getSingle(ticker) {
    const event = this.instruments.filter((item) => {
      return  item.ticker === ticker;
    });
    return event[0]?event[0]:{};
  }

  getChart(ticker) {
      console.log(' ticker', ticker);

      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json, text/plain, */*',
      }
    const { data, isLoading } = useQuery({
      queryKey: ['chart', ticker],
      queryFn: async () => {
        //{"Label":"2009-10-09","Price":"0.0012"}
        return fetch(`http://localhost:8083/api/data/${ticker}`, { headers })
        .then((res) => res.json())
        .catch(error =>console.log( ticker))
      },
      staleTime: 1 * 60 * 1000,
      cacheTime: 5 * 60 * 1000,
      enabled: ticker !== undefined 
    });
 
   // dataBitcoin = data;

    
     console.log('isLoading', isLoading);
    if (typeof data === 'undefined' || data === undefined) {
      return [];
    } else {
      // changeLoad();
    }
    return  data;
  }
}

export { storeInstrument };

export const instrumentStore = new storeInstrument();
