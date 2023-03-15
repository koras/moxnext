//import ky from 'ky-universal'
import { useQuery,useQueries } from 'react-query'

interface News {
  // eventDate,title,source,text,fulltext,typeId, action, ticker, url
  eventDate: string; 
  text: string; 
  slug: string; 
  action: string;  
  ticker: string; 

  title: string;
  typeId: number;
  date: string;
  source: string;
  shorttext: string;
  fulltext: string;
  hash: string; 
};

const createEvent = async (data: News) => {
  // Default options are marked with *
  
 
  const response:any = await fetch(process.env.NEXT_PUBLIC_SERVER_URL +`/event/save`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //  mode: 'cors', // no-cors, *cors, same-origin
 //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
 //   credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  //  redirect: 'follow', // manual, *follow, error
   // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  }) 
  
 
  if (response.ok) { // если HTTP-статус в диапазоне 200-299
    // получаем тело ответа (см. про этот метод ниже)
    let json = await response.json();
    console.log(json);
    return json;

  } else {
    alert("Ошибка HTTP: " + response.status);

    
  } 
 

 // console.log('response',response);
 // return "100fda21745f3d75da61b97f7a54d6cd";
 // return response.data;
};


const fetchToPostsInfo = async (limit = 10) => {
    const parsed =  await fetch('https://jsonplaceholder1.typicode.com/posts')
  .then(data => {
    return data.json();
  })
  .catch(err => {
    console.log(err);
  });

  return parsed;
  return parsed.filter((x:any) => x.id <= limit)
}
const usePosts = (limit:number) => {
    console.log('asd')
  return useQuery({
    queryKey: ['posts', limit],
    queryFn: ()=> fetchToPostsInfo(limit),
  })
}




export { 
  usePosts,
   createEvent
   }
