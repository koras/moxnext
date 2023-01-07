//import ky from 'ky-universal'
import { useQuery,useQueries } from 'react-query'

const fetchPosts = async (limit = 10) => {
    const parsed =  await fetch('https://jsonplaceholder.typicode.com/posts')
  .then(data => {
    return data.json();
  })
  .catch(err => {
    console.log(err);
  });

  return parsed;
  return parsed.filter((x) => x.id <= limit)
}
const usePosts = (limit) => {
    console.log('asd')
  return useQuery({
    queryKey: ['posts', limit],
    queryFn: ()=> fetchPosts(limit),
  })
}

export { usePosts, fetchPosts }
