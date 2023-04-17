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

  async getDashboard(params) {
      console.log(params);
    let request  = {
      typeId: "all",
      level: 0,
    }
    if(params.typeId){
      request.typeId  = params.typeId;
    }
    if(params.level){
      request.level  = params.level;
    }


     const result = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/instruments/list?`+ new URLSearchParams(request) , { headers })
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
      //  console.log(data.instrument,prices);
        for (let  instrument of data.instrument) {
          instrument['prices'] = prices[instrument.ticker]
          if(prices[instrument.ticker] && prices[instrument.ticker][0] && prices[instrument.ticker][0].price){ 
            instrument['price_year'] = prices[instrument.ticker][0].price;
          }else{
            console.error('не найден инструмент',instrument.ticker)
          }

         instruments.push(instrument);
        }
      //   console.log(instruments);
        return instruments;
      });
      console.log('result',result);
      return result;
  }



  
  async getTrendDashboard(params) {
    console.log(params);
  let request  = {
    typeId: "all",
    level: 0,
  }
  if(params.typeId){
    request.typeId  = params.typeId;
  }
  if(params.level){
    request.level  = params.level;
  }


   const result = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/trend/list` , { headers })
    .then((res) => res.json())
    .then((data) => {
      let prices = {};
      let instruments = [];

      let pricesMonth = {};
      let pricesYear = {};
      let pricesYear5 = {};

      for (const index in data.month) {
        
        const month = data.month[index];
        console.log(pricesMonth,month);
        pricesMonth[month.ticker] = month;

        const year= data.year[index];
        pricesYear[year.ticker] = year;

        const year5 = data.year5[index];
        pricesYear5[year5.ticker] = year5;
      }


      for (const  ticker in pricesMonth) {

        instruments.push(
          { ticker: ticker,   
          type: pricesMonth[ticker].type, 
          logo: pricesMonth[ticker].logo,  
          instrument_name: pricesMonth[ticker].instrument_name,  
          price: pricesMonth[ticker].price,  
          mark: pricesMonth[ticker].mark,  
          prices: { 
            'years5': { price: pricesYear5[ticker].years_price, date: pricesYear5[ticker].max_date, }, 
            'years': { price: pricesYear[ticker].years_price, date: pricesYear[ticker].max_date,  }, 
            'month': { price: pricesMonth[ticker].years_price, date: pricesMonth[ticker].max_date,  }, } },
          //  
        )
        
      }

    // //  console.log(data.instrument,prices);
    //   for (let  instrument of data.instrument) {
    //     instrument['prices'] = prices[instrument.ticker]
    //     if(prices[instrument.ticker] && prices[instrument.ticker][0] && prices[instrument.ticker][0].price){ 
    //       instrument['price_year'] = prices[instrument.ticker][0].price;
    //     }else{
    //       console.error('не найден инструмент',instrument.ticker)
    //     }

    //    instruments.push(instrument);
    //   }
    //   console.log(instruments);
      return instruments;
    });
    console.log('result',result);
    return result;
}




  getChart(ticker) {
    console.log(" ticker", ticker);

    return fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/data/${ticker}`, { headers })
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
