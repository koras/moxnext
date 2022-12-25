//import { observable,autorun, makeObservable, computed, action }  from "mobx"
// https://www.tradingview.com/symbols/BTCUSD/history-timeline/#the-british-are-coming-2022-09-30

import { makeAutoObservable } from "mobx";
import { dataBitcoin } from "./bitcoinData";
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
    {
      instrumentId:   5,
      name: "Газпром",
      type: "crypto",
      images: {
        logo: "https://logodix.com/logo/2103877.png",
      },
      description:
        "«Газпром» — крупнейший в России производитель и экспортёр сжиженного природного газа (СПГ). ",
      ticker: "gazp",
      price: 160,
      change: "-20",
      currency: "$",
    },
    {
      instrumentId:   4,
      name: "Газпром",
      type: "crypto",
      images: {
        logo: "https://img.freepik.com/premium-vector/vector-illustration-large-bitcoin-coin_541404-125.jpg?w=360",
      },
      description:
        "«Газпром» — крупнейший в России производитель и экспортёр сжиженного природного газа (СПГ). ",
      ticker: "gazp",
      price: 160,
      change: "20",
      currency: "$",
    },
    {
      instrumentId:   22,
      name: "Газпром",
      type: "crypto",
      images: {
        logo: "https://logodix.com/logo/2103877.png",
      },
      description:
        "«Газпром» — крупнейший в России производитель и экспортёр сжиженного природного газа (СПГ). ",
      ticker: "gazp",
      price: 160,
      change: "-20",
      currency: "$",
    },
    {
      instrumentId:   446,
      name: "Газпром",
      type: "crypto",
      images: {
        logo: "https://img.freepik.com/premium-vector/vector-illustration-large-bitcoin-coin_541404-125.jpg?w=360",
      },
      description:
        "«Газпром» — крупнейший в России производитель и экспортёр сжиженного природного газа (СПГ). ",
      ticker: "gazp",
      price: 160,
      change: "20",
      currency: "$",
    },
    {
      instrumentId:   123,
      name: "Газпром",
      type: "crypto",
      images: {
        logo: "https://img.freepik.com/premium-vector/vector-illustration-large-bitcoin-coin_541404-125.jpg?w=360",
      },
      description:
        "«Газпром» — крупнейший в России производитель и экспортёр сжиженного природного газа (СПГ). ",
      ticker: "gazp",
      price: 160,
      change: "20",
      currency: "$",
    },
    {
      instrumentId:  34576,
      name: "Газпром",
      type: "crypto",
      images: {
        logo: "https://img.freepik.com/premium-vector/vector-illustration-large-bitcoin-coin_541404-125.jpg?w=360",
      },
      description:
        "«Газпром» — крупнейший в России производитель и экспортёр сжиженного природного газа (СПГ). ",
      ticker: "gazp",
      price: 160,
      change: "-20",
      currency: "$",
    },
    {
      instrumentId:  12363,
      name: "Газпром",
      type: "crypto",
      images: {
        logo: "https://img.freepik.com/premium-vector/vector-illustration-large-bitcoin-coin_541404-125.jpg?w=360",
      },
      description:
        "«Газпром» — крупнейший в России производитель и экспортёр сжиженного природного газа (СПГ). ",
      ticker: "gazp",
      price: 160,
      change: "-20",
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
    return {
      fill: true,
      labels: [ 
        "2022-12-18",
        "",
        "",
        "",
        "",
      ],
      datasets: [
        {
          fill: true,
     
          data:dataBitcoin,
       
          parsing: {
            xAxisKey: "Label",
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
