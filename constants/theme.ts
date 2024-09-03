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
    fontSize: 16,
    fontFamily: '"Inter", sans-serif',
  },
  algorithm: theme.darkAlgorithm,
};
