import { ThemeConfig, theme } from 'antd';

export const COLOR = {
  PRIMARY: '#884dff',
  SECONDARY: 'rgba(255, 255, 255, 0.75)',
  TEXT_PRIMARY: '#fff',
  BACKGROUND: '#2f1d57',

  BLACK_TRANSPARENT_3: 'rgba(0, 0, 0, 0.03)',
  BLACK_TRANSPARENT_20: 'rgba(0, 0, 0, 0.20)',
  BLACK_TRANSPARENT_33: 'rgba(0, 0, 0, 0.33)',
  BLACK_TRANSPARENT_50: 'rgba(0, 0, 0, 0.50)',

  WHITE_TRANSPARENT_5: 'rgba(255, 255, 255, 0.05)',
  WHITE_TRANSPARENT_10: 'rgba(255, 255, 255, 0.1)',
  WHITE_TRANSPARENT_20: 'rgba(255, 255, 255, 0.2)',
  WHITE_TRANSPARENT_50: 'rgba(255, 255, 255, 0.50)',
};

export const BREAK_POINT = {
  sm: '576px',
  xl: '1240px',
};

export const MEDIA_QUERY = {
  mobile: `@media only screen and (max-width: ${BREAK_POINT.sm})`,
  laptop: `@media only screen and (max-width: ${BREAK_POINT.xl})`,
};

export const THEME_CONFIG: ThemeConfig = {
  token: {
    colorLink: COLOR.TEXT_PRIMARY,
    colorText: COLOR.TEXT_PRIMARY,
    colorPrimary: COLOR.PRIMARY,
    colorTextSecondary: COLOR.SECONDARY,
    colorTextDescription: COLOR.SECONDARY,
    fontSize: 16,
    fontFamily: '"Inter", sans-serif',
  },
  components: {
    Grid: {
      sizeXL: parseInt(BREAK_POINT.xl, 10),
    },
    Spin: {
      colorPrimary: COLOR.TEXT_PRIMARY,
    },
    Segmented: {
      itemSelectedBg: COLOR.WHITE_TRANSPARENT_20,
      trackBg: COLOR.BLACK_TRANSPARENT_20,
      itemColor: COLOR.TEXT_PRIMARY,
      borderRadius: 38,
    },
    Tag: {
      defaultBg: 'rgba(223, 229, 238, 0.1)',
      borderRadiusSM: 30,
      fontSizeSM: 16,
    },
    Timeline: {
      dotBorderWidth: 4,
      dotBg: COLOR.TEXT_PRIMARY,
      lineWidth: 4,
    },
    Button: {
      defaultBg: 'transparent',
      defaultHoverBg: COLOR.BLACK_TRANSPARENT_20,
      defaultBorderColor: COLOR.TEXT_PRIMARY,
    },
    Table: {
      borderColor: COLOR.WHITE_TRANSPARENT_10,
      headerBg: COLOR.WHITE_TRANSPARENT_5,
      headerColor: COLOR.WHITE_TRANSPARENT_50,
      rowHoverBg: COLOR.WHITE_TRANSPARENT_5,
    },
  },
  algorithm: theme.darkAlgorithm,
};
