import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import AuthWrapper from './components/route/AuthWrapper';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <AuthWrapper>
        <Component {...pageProps} />
      </AuthWrapper>
    </SessionProvider>
  );
}

export default MyApp;
