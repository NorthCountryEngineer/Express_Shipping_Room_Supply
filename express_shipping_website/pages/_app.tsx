import type { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import Layout from '../components/Layout';

const theme = createTheme({
  palette: { mode: 'light' },
});

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
