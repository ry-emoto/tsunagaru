import { NextSeo } from 'next-seo';
import { GetServerSideProps } from 'next';
import CommonMenu from '../components/common/CommonMenu';
import prisma from '../lib/prisma';
import Home from '../components/home/Home';
import { getSession } from 'next-auth/react';

type Props = {
  user: any;
  users: any;
};

const index = (props: Props) => {
  // 処理
  // ---------------
  // オブジェクトの昇順ソート
  const sortUsers = props.users.sort(function (a: any, b: any) {
    return a._count.post + a._count.comment + a._count.like >
      b._count.post + b._count.comment + b._count.like
      ? -1
      : 1;
  });
  // ---------------

  return (
    <>
      <NextSeo title='ホーム|Tsunagaru' description='Tsunagaruホームページ' />
      <CommonMenu>
        <Home user={props.user} users={sortUsers} />
      </CommonMenu>
    </>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { user: null, users: null } };
  }

  // ログインユーザーの取得
  const userData = await prisma.user.findUnique({
    where: { id: session?.user.id },
    include: {
      _count: {
        select: { post: true, like: true, bookmark: true, comment: true },
      },
    },
  });
  const user = JSON.parse(JSON.stringify(userData));

  // 全ユーザーデータの取得
  const usersData = await prisma.user.findMany({
    include: {
      _count: {
        select: { post: true, like: true, bookmark: true, comment: true },
      },
    },
  });
  const users = JSON.parse(JSON.stringify(usersData));

  return {
    props: { user, users },
  };
};
