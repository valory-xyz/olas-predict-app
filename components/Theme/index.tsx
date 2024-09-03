import { ConfigProvider as AntdConfigProvider, ConfigProviderProps } from 'antd';
import { useEffect, useState } from 'react';

import { THEME_CONFIG } from 'constants/theme';

/**
 * Use this provider in place of the `ConfigProvider` from `antd` to
 * ensure that the theme is only applied once the component has mounted.
 * @param props The props to pass to the `ConfigProvider`.
 */
export const AutonolasThemeProvider = ({ theme = THEME_CONFIG, children }: ConfigProviderProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return <AntdConfigProvider theme={theme}>{isMounted ? children : ''}</AntdConfigProvider>;
};
