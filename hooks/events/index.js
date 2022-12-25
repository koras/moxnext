//import ky from 'ky-universal'
import { useQuery,QueryClientProvider } from '@tanstack/react-query'

const fetchPosts = async (limit = 10) => {
    
  return await fetch('https://jsonplaceholder.typicode.com/posts')
  .then(data => {
    return data.json();
  })
  .catch(err => {
    console.log(err);
  });


  return parsed.filter((x) => x.id <= limit)
}
const usePosts = (limit) => {
  return QueryClientProvider({
    queryKey: ['posts', limit],
    queryFn: () => fetchPosts(limit),
  })
}

export { usePosts, fetchPosts }
