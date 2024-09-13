import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Layout } from 'components/Layout';
import { AutonolasThemeProvider } from 'components/Theme';
import { GlobalStyle } from 'components/Theme/GlobalStyle';
import { APP_NAME } from 'constants/index';

const queryClient = new QueryClient();

const PredictApp = ({ Component, pageProps }: AppProps) => (
  <>
    <GlobalStyle />
    <Head>
      <title>{APP_NAME}</title>
      <meta name="title" content={APP_NAME} />
    </Head>
    <AutonolasThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      </QueryClientProvider>
    </AutonolasThemeProvider>
  </>
);

export default PredictApp;
