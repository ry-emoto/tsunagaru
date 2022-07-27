import { NextSeo } from 'next-seo';
import { GetServerSideProps } from 'next';
import fetcher from '../../lib/fetcher';
import CommonMenu from '../../components/common/CommonMenu';
import useGetPost from '../../hooks/useGetPost';
import TimeLineDetail from '../../components/timeLineDetail/TimeLineDetail';
import { useRouter } from 'next/router';
import { Post } from '../../../types/post';

type Props = {
  fallbackData: any;
};

const index = (props: Props) => {
  const postId = useRouter().query.id;
  const { posts, postsLoading, postsError } = useGetPost(
    '/api/post',
    props.fallbackData
  );
  const post = posts?.find((data: Post) => data.id === Number(postId));

  return (
    <>
      <NextSeo
        title='投稿詳細|Tsunagaru'
        description='Tsunagaru投稿詳細ページ'
      />
      <CommonMenu>
        <TimeLineDetail data={post} load={postsLoading} err={postsError} />
      </CommonMenu>
    </>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps = async () => {
  const API_URL = process.env.NEXT_PUBLIC_VERCEL_URL;

  if (typeof API_URL === 'undefined') {
    return {
      props: {
        fallbackData: null,
      },
    };
  }

  const data = await fetcher(`${API_URL}/api/post`);
  const post = JSON.parse(JSON.stringify(data));

  return {
    props: {
      fallbackData: post,
    },
  };
};
