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

 
const getPost = (ticker:any, slug:any) => {
  console.log( 'getPost',ticker, slug);
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json, text/plain, */*',
  }
  let urlRequest = `http://localhost:8083/api/event/get/${ticker}/${slug}`;
    console.log( urlRequest);
  return   fetch(urlRequest, { headers })
    .then((response: any) => {
      console.log('fetch', response);
      return response.json()
    })
    .then((data: any) => {
      console.log(data);
     
    }).catch(function (error) {
      console.log("Ошибка обработана, продолжить работу ", error);
    });
 
}

const getEvent = (ticker:any,slug:any)  => {
  return useQuery({ 
    queryKey: ['news',ticker ,slug],
    queryFn: ()=>  getPost(ticker, slug),
    }
  )
 

}



const getNewsSingle = (ticker:string, url:string)  => {
  //const data = fetchGet(ticker, url);
//   console.log('-------------',ticker, url);
//   // return     data ;
// //  const data = fetchGet(ticker, url);
//   return useQuery({
//           queryKey: [ticker, url], 
//           queryFn:  ()=> fetchGet(ticker, url),
//         }
//     );
}
 
export {
  setEventTitle,
  getEvent, 
  getNewsSingle, 
  setEventFulltext,
  fetchPosts,
  getPost 
 }
