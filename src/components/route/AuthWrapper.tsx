import React from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import ProtectedRoute from './ProtectedRoute';

// ログイン済みユーザにのみ表示するページ

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const router = useRouter();

  // 認証情報取得中には、コンポーネントを表示させない
  if (session.status === 'loading') return null;

  return (
    <>
      {['/login'].includes(router.pathname) ? (
        // もしも、現在のページが、ログインを要求するページだった場合
        // ログイン状況に応じて、ページを表示するか or ログイン画面へリダイレクトさせるかを判定する
        children
      ) : (
        // 現在のページが、ログインを要求しないページだった場合
        // 認証情報を調べる必要はないので、そのままページを表示させる
        <ProtectedRoute>{children}</ProtectedRoute>
      )}
    </>
  );
};

export default AuthWrapper;
