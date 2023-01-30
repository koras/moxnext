//import ky from 'ky-universal'
import { useQuery,useQueries,useMutation } from 'react-query'

import { useState } from 'react';
import moment from 'moment';




// const [eventDate, setEventDate] = useState(moment().format("DD/MM/YYYY"));
// const [title, setTitle] = useState('');
// const [source, setSource] = useState('');
// const [text, setText] = useState('');
// const [fulltext, setFulltext] = useState('');
// // const [typeId, setTypeId] = useState({value: 0, label: '', type: ''});
// const [typeId, setTypeId] = useState(0);



const fetchPosts = async (ticker:any,limit:any = 10) => {

  console.log('fetchPostsfetchPostsfetchPostsfetchPosts')
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json, text/plain, */*',
  }
  let urlRequest = `http://localhost:8083/api/events/${tickers}`;
    console.log( urlRequest);
  return   fetch(urlRequest, { headers })
    .then((response: any) => {
      console.log('fetch', response);
      return response.json()
    })
    .then((data: any) => {
      console.log(data);
   //   setData(data.data);
  //    setInstrument(data.instrument);
     
    }).catch(function (error) {
      console.log("Ошибка обработана, продолжить работу ", error);
    });
}

const fetchGet =  (ticker:string, url:string) => {
  console.log('-------------');
  const result = news.filter((item:any) => {
    return item.ticker === ticker && item.url === url;
  });
  return (result && result[0])?result[0]:event;

  //     await fetch('https://jsonplaceholder.typicode.com/posts')
  // .then(data => {

  //   const result = news.filter((item:any) => {
  //     return item.ticker === ticker && item.url === url;
  //   });
  //   return result[0];

  //   return data.json();
  // })
  // .catch(err => {
  //   console.log(err);
  // });

  // return news; 
}
 

let event = {
  title: "",
  text:"",
  source:"",
  fulltext:"",
  typeId:0,
  date:moment().toDate(),
}

const setEventTitle = (text:string)  => {
  console.log(text);
  //const newText = {title: text};
 event = {...event, title: text};
 console.log( event);
 return  text;
 // setEvent({...event,...newText});
};

const setEventFulltext = (text:string)  => {
 // event = { ...event , event.title: text};
 // console.log(event);
 event = {...event,fulltext:text};
};

 


const getNews = (ticker:string,limit:number = 0)  => {
  console.log('getNewsgetNews');

  return useQuery({ 
    queryKey: ['news',ticker ,limit],
    queryFn:  ()=>  fetchPosts(ticker, limit),
  })
}



const getNewsSingle = (ticker:string, url:string)  => {
  //const data = fetchGet(ticker, url);
  console.log('-------------',ticker, url);
  // return     data ;
//  const data = fetchGet(ticker, url);
  return useQuery({
          queryKey: [ticker, url], 
          queryFn:  ()=> fetchGet(ticker, url),
        }
    );
}



const news = [
  {
    id: 100,
    event: "Сплит акций",
    type: "split",
    typeId: 8,
    hash: '78e731027d8fd50ed642340b7c9a63b3',
    source: "https://ru.investing.com/analysis/article-200298747",
    url: "split-couple-actii",
    title_url: "split-acti",
    instrument: {
      instrumentId:  101,
      name: "Биткоин",
      price: 150,
      type: "crypto",
      change: "+10",
      ticker: "btc",
      currency: "$",
    },
    ticker: "btc",
    date: "01/03/2022",
    title: "Рыба конь 1",
    text: " сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях.",
    fulltext:
      "<p>повышением.</p> <br><br>Индикатор Мосбиржи подскочил почти на 11%Российский фондовый рынок после обвала в первой половине месяца завершает октябрь заметным повышением. Индикатор Мосбиржи подскочил почти на 11%Российский фондовый рынок после обвала в первой половине месяца завершает октябрь заметным повышением. Индикатор Мосбиржи подскочил почти на 11%Российский фондовый рынок после обвала в первой половине месяца завершает октябрь заметным повышением. Индикатор Мосбиржи подскочил почти на 11%Российский фондовый рынок после обвала в первой половине месяца завершает октябрь заметным повышением. Индикатор Мосбиржи подскочил почти на 11%Российский фондовый рынок после обвала в первой половине месяца завершает октябрь заметным повышением. Индикатор Мосбиржи подскочил почти на 11%",
    link: "https://journal.tinkoff.ru/invest-service/",
  },
  {
    id: 101,
    event: "Отчётность",
    type: "reporting",
    typeId: 3,
    url: "dividend-couple",
    hash: '78e731027d8fd50ed642340b7c91111111',
    source: "https://ru.investing.com/analysis/article-200298747",
    title_url: "dividends",
    instrument: {
      instrumentId:  11111,
      name: "Биткоин",
      type: "crypto",
      ticker: "btc",
      price: 140,
      change: "+10",
      currency: "$",
    },
    ticker: "btc",
    date: "01/03/2022",
    title: " Cредний курс покупки/продажи",
    text: "По состоянию на 16:00 мск на основе информации, предоставленной банками и обменными пунктами Москвы, Cредний курс покупки/продажи наличного доллара составил 62,68/68 руб",
    fulltext:
      "<p>Российский фондовый рынок после обвала в первой половине месяца завершает октябрь заметным повышением.</p> <p>Российский фондовый рынок после обвала в первой половине месяца завершает октябрь заметным повышением.</p> Российский фондовый рынок после обвала в первой половине месяца завершает октябрь заметным повышением. <br><br>Индикатор Мосбиржи подскочил почти на 11%Российский фондовый рынок после обвала в первой половине месяца завершает октябрь заметным повышением. Индикатор Мосбиржи подскочил почти на 11%Российский фондовый рынок после обвала в первой половине месяца завершает октябрь заметным повышением. Индикатор Мосбиржи подскочил почти на 11%Российский фондовый рынок после обвала в первой половине месяца завершает октябрь заметным повышением. Индикатор Мосбиржи подскочил почти на 11%Российский фондовый рынок после обвала в первой половине месяца завершает октябрь заметным повышением. Индикатор Мосбиржи подскочил почти на 11%Российский фондовый рынок после обвала в первой половине месяца завершает октябрь заметным повышением. Индикатор Мосбиржи подскочил почти на 11%",
    link: "https://journal.tinkoff.ru/invest-service/",
  },
  {
    id: 102,
    event: "Новости",
    type: "news",
    typeId: 4,
    ticker: "btc",
    hash: '78e731027d8fd50ed642340b7c9444444',
    source: "https://ru.investing.com/analysis/article-200298747",
    url: "full-down-ruble",
    title_url: "full-ruble",
    instrument: {
      instrumentId:  11411,
      name: "Биткоин",
      type: "crypto",
      ticker: "btc",
      price: 130,
      change: "-10",
      currency: "$",
    },
    date: "01/03/2022",
    title: "Обвал рубля",
    text: "Российский фондовый рынок после обвала в первой половине месяца завершает октябрь заметным повышением. Индикатор Мосбиржи подскочил почти на 11%",
    fulltext:
      "<p>Российский фондовый рынок после обвала в первой половине месяца завершает октябрь заметным повышением.</p> <p>Российский фондовый рынок после обвала в первой половине месяца завершает октябрь заметным повышением.</p> Российский фондовый рынок после обвала в первой половине месяца завершает октябрь заметным повышением. <br><br>Индикатор Мосбиржи подскочил почти на 11%Российский фондовый рынок после обвала в первой половине месяца завершает октябрь заметным повышением. Индикатор Мосбиржи подскочил почти на 11%Российский фондовый рынок после обвала в первой половине месяца завершает октябрь заметным повышением. Индикатор Мосбиржи подскочил почти на 11%Российский фондовый рынок после обвала в первой половине месяца завершает октябрь заметным повышением. Индикатор Мосбиржи подскочил почти на 11%Российский фондовый рынок после обвала в первой половине месяца завершает октябрь заметным повышением. Индикатор Мосбиржи подскочил почти на 11%Российский фондовый рынок после обвала в первой половине месяца завершает октябрь заметным повышением. Индикатор Мосбиржи подскочил почти на 11%",

    link: "https://www.binance.com/ru/trade/DOGE_USDT?theme=dark&type=spot",
  },
  {
    id: 103,
    event: "Новости",
    type: "news",
    typeId: 5,
    url: "kurs-ruble-to-12-12-2022",
    hash: '78e731027d8fd50ed642340b7c97777777',
    ticker: "btc",
    title_url: "kurs-ruble",
    instrument: {
      instrumentId: 1111,
      name: "Биткоин",
      type: "crypto",
      ticker: "btc",
      price: 120,
      change: "-10",
      currency: "$",
    },
    date: "01/03/2022",
    title: "Новый курс рубля",
    source: "https://ru.investing.com/analysis/article-200298747",
    fulltext:
      "<p>Российский фондовый рынок после обвала в первой половине месяца завершает октябрь заметным повышением.</p> <p>Российский фондовый рынок после обвала в первой половине месяца завершает октябрь заметным повышением.</p> Российский фондовый рынок после обвала в первой половине месяца завершает октябрь заметным повышением. <br><br>Индикатор Мосбиржи подскочил почти на 11%Российский фондовый рынок после обвала в первой половине месяца завершает октябрь заметным повышением. Индикатор Мосбиржи подскочил почти на 11%Российский фондовый рынок после обвала в первой половине месяца завершает октябрь заметным повышением. Индикатор Мосбиржи подскочил почти на 11%Российский фондовый рынок после обвала в первой половине месяца завершает октябрь заметным повышением. Индикатор Мосбиржи подскочил почти на 11%Российский фондовый рынок после обвала в первой половине месяца завершает октябрь заметным повышением. Индикатор Мосбиржи подскочил почти на 11%Российский фондовый рынок после обвала в первой половине месяца завершает октябрь заметным повышением. Индикатор Мосбиржи подскочил почти на 11%",

    text: "По состоянию на 16:00 мск на основе информации, предоставленной банками и обменными пунктами Москвы, Cредний курс покупки/продажи наличного доллара составил 62,68/68 руб. за",
    link: "https://ru.investing.com/currencies/usd-rub",
  },
];
export {
  setEventTitle,
  getNews, 
  getNewsSingle, 
  setEventFulltext,
  fetchPosts
 }
