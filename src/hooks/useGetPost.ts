import useSWR from 'swr';
import fetcher from '../lib/fetcher';

const useGetPost = (url: string, init: any) => {
  const { data, error } = useSWR(url, fetcher, init);
  return {
    posts: data,
    postsLoading: !error && !data,
    postsError: error,
  };
};

export default useGetPost;
