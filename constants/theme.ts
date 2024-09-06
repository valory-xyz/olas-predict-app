import { ThemeConfig, theme } from 'antd';

export const COLOR = {
  PRIMARY: '#884dff',
  SECONDARY: 'rgba(255, 255, 255, 0.75)',

  TEXT_PRIMARY: '#fff',
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
    Spin: {
      colorPrimary: COLOR.TEXT_PRIMARY,
    },
    Segmented: {
      itemSelectedBg: 'rgba(255, 255, 255, 0.20)',
      trackBg: 'rgba(0, 0, 0, 0.20)',
      itemColor: COLOR.TEXT_PRIMARY,
      borderRadius: 38,
    },
  },
  algorithm: theme.darkAlgorithm,
};
