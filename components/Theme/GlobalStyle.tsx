import { createGlobalStyle } from 'styled-components';

import { COLOR } from 'constants/theme';

export const GlobalStyle = createGlobalStyle`
  *,
  :after,
  :before {
    box-sizing: border-box;
  }
  body,
  html {
    width: 100%;
    height: 100%;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: ${COLOR.TEXT_PRIMARY};
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0
  }

  .m-0 {
    margin: 0 !important;
  }
  .mt-4 {
    margin-top: 4px;
  }
  .mr-4 {
    margin-right: 4px !important;
  }
  .mb-4 {
    margin-bottom: 4px !important;
  }
  .ml-4 {
    margin-left: 4px !important;
  }

  .flex {
    display: flex;
  }
  .block {
    display: block;
  }

  .text-center {
    text-align: center;
  }

  .items-center {
    align-items: center;
  }
`;
