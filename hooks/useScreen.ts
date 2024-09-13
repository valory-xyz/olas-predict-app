import { Grid } from 'antd';

const { useBreakpoint } = Grid;

export const useScreen = () => {
  const screens = useBreakpoint();
  const isMobile = screens.xs && !screens.sm;
  const isDesktop = screens.xl;

  return { isMobile, isDesktop };
};
