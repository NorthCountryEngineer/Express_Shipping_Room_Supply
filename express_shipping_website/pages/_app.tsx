import * as React from 'react';
import type { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from '../components/Layout';
import AppTheme from '../shared-theme/AppTheme';

export default function MyApp({ Component, pageProps }: AppProps) {
  const getLayout =
    (Component as any).getLayout || ((page: React.ReactNode) => <Layout>{page}</Layout>);
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      {getLayout(<Component {...pageProps} />)}
    </AppTheme>
  );
}
