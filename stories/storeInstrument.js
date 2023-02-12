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

  instruments = [
    {
      instrumentId: 1,
      name: "Биткоин",
      type: "crypto",
      ticker: "btc",
      description:
        "«Газпром» — крупнейший в России производитель и экспортёр сжиженного природного газа (СПГ). ",
      price: 130,
      images: {
        logo: "https://img.freepik.com/premium-vector/vector-illustration-large-bitcoin-coin_541404-125.jpg?w=360",
      },
      change: "-10",
      currency: "$",
    },
  ];

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
  
    console.log( data);
   // dataBitcoin = data;

    
    // console.log('isLoading', isLoading);
    // if (typeof data === 'undefined' || data === undefined) {
    //   return <div>load</div>;
    // } else {
    //   // changeLoad();
    // }
  




    return {
      fill: true,
      labels: [1,2,3,4,5,6,7,8,9   ],
      datasets: [
        {
          fill: true,
     
          data:data,
       
          parsing: {
            xAxisKey: "Date",
            yAxisKey: "Price",
          },
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)", 
          ],
          pointRadius: [1,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            1,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            1,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            1,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          //  borderWidth: [2, 2,   3, 2, 4, 4],
          borderWidth: 1,
          //  borderWidth: 1,
          tension: 0.1,
        },
      ],
    };
  }
}

export { storeInstrument };

export const instrument = new storeInstrument();
