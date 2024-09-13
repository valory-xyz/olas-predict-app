import { ThemeConfig, theme } from 'antd';

export const COLOR = {
  PRIMARY: '#884dff',
  SECONDARY: 'rgba(255, 255, 255, 0.75)',
  TEXT_PRIMARY: '#fff',
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
      itemSelectedBg: 'rgba(255, 255, 255, 0.20)',
      trackBg: 'rgba(0, 0, 0, 0.20)',
      itemColor: COLOR.TEXT_PRIMARY,
      borderRadius: 38,
    },
    Tag: {
      defaultBg: 'rgba(223, 229, 238, 0.1)',
      borderRadiusSM: 30,
      fontSizeSM: 16,
    },
  },
  algorithm: theme.darkAlgorithm,
};
