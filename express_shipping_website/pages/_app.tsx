import type { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Layout from '../components/Layout';
import theme from '../components/theme';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
