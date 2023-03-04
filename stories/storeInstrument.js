//import { observable,autorun, makeObservable, computed, action }  from "mobx"
// https://www.tradingview.com/symbols/BTCUSD/history-timeline/#the-british-are-coming-2022-09-30

import { makeAutoObservable } from "mobx";
import { dataBitcoin } from "./bitcoinData";
import { useQuery, useQueries } from "react-query";
//import _ from "lodash";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json, text/plain, */*",
};
class storeInstrument {
  constructor() {
    makeAutoObservable(this);
  }

  getDashboard(ticker) {
    return fetch(`http://localhost:8083/api/instruments/list`, { headers })
      .then((res) => res.json())
      .then((data) => {
        let prices = {};
        let instruments = [];
        
        for (const price of data.prices) {
          if (!prices[price.name]) {
            prices[price.name] = [];
          }
          prices[price.name].push(price);
        }
        console.log(data.instrument,prices);
        for (let  instrument of data.instrument) {
          instrument['prices'] = prices[instrument.ticker]
          if(prices[instrument.ticker] && prices[instrument.ticker][0] && prices[instrument.ticker][0].price){ 
            instrument['price_year'] = prices[instrument.ticker][0].price;
          }else{
            console.error('не найден инструмент',instrument.ticker)
          }

         instruments.push(instrument);
        }
//        console.log(instruments);
        return instruments;
      });
  }

  getChart(ticker) {
    console.log(" ticker", ticker);

    return fetch(`http://localhost:8083/api/data/${ticker}`, { headers })
      .then((res) => res.json())
      .catch((error) => console.log(ticker));
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
      return item.ticker === ticker;
    });
    return event[0] ? event[0] : {};
  }
}

export { storeInstrument };

export const instrumentStore = new storeInstrument();
