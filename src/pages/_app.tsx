import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import AuthWrapper from '../components/route/AuthWrapper';
import theme from '../styles/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SessionProvider session={pageProps.session}>
        <AuthWrapper>
          <Component {...pageProps} />
        </AuthWrapper>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default MyApp;
