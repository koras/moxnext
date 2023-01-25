//import ky from 'ky-universal'
import { useQuery,useQueries } from 'react-query'

interface News {
  // eventDate,title,source,text,fulltext,typeId, action, ticker, url
  eventDate: string;
  title: string;
  source: string;
  text: string;
  fulltext: string;
  typeId: string; 
  action: string; 
  ticker: string;
  url: string;
};

const createNews = async (data: News) => {
  // Default options are marked with *
  const response:any = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //  mode: 'cors', // no-cors, *cors, same-origin
 //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
 //   credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  //  redirect: 'follow', // manual, *follow, error
   // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  
  return "100fda21745f3d75da61b97f7a54d6cd";
  return response.data;
};


const fetchToPostsInfo = async (limit = 10) => {
    const parsed =  await fetch('https://jsonplaceholder.typicode.com/posts')
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
   createNews }
