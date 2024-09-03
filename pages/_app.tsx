import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Layout } from 'components/Layout';
import { AutonolasThemeProvider } from 'components/Theme';
import { GlobalStyle } from 'components/Theme/GlobalStyle';
import { APP_NAME } from 'constants/index';

const PredictApp = ({ Component, pageProps }: AppProps) => (
  <>
    <GlobalStyle />
    <Head>
      <title>{APP_NAME}</title>
      <meta name="title" content={APP_NAME} />
    </Head>
    <AutonolasThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AutonolasThemeProvider>
  </>
);

export default PredictApp;
