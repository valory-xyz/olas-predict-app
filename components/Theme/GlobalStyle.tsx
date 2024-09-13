import { createGlobalStyle } from 'styled-components';

import { COLOR, MEDIA_QUERY } from 'constants/theme';

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

    ${MEDIA_QUERY.mobile} {
      font-size: 14px;
    }
  }

  .ant-segmented,
  .ant-segmented .ant-segmented-thumb,
  .ant-segmented .ant-segmented-item {
    border-radius: 38px;
  }

  .ant-tag {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
  }

  span.ant-typography {
    ${MEDIA_QUERY.mobile} {
      font-size: 14px;
    }
  }
  
  .g2-tooltip {
    background-color: ${COLOR.TEXT_PRIMARY} !important;
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

  .text-start {
    text-align: start
  }
  .text-center {
    text-align: center;
  }
  .text-end {
    text-align: end;
  }
  .items-center {
    align-items: center;
  }

  .flex-auto {
    flex: auto;
  }
  .full-width {
    width: 100% !important;
  }
`;
