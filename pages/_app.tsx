import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { WagmiProvider } from 'wagmi';

import ErrorBoundary from 'components/ErrorBoundary';
import { Layout } from 'components/Layout';
import { AutonolasThemeProvider } from 'components/Theme';
import { GlobalStyle } from 'components/Theme/GlobalStyle';
import { APP_NAME } from 'constants/index';
import { wagmiConfig } from 'constants/wagmiConfig';

const queryClient = new QueryClient();

const PredictApp = ({ Component, pageProps }: AppProps) => (
  <>
    <GlobalStyle />
    <Head>
      <title>{APP_NAME}</title>
      <meta name="title" content={APP_NAME} />
    </Head>
    <AutonolasThemeProvider>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
          </Layout>
          <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
        </QueryClientProvider>
      </WagmiProvider>
    </AutonolasThemeProvider>
  </>
);

export default PredictApp;
