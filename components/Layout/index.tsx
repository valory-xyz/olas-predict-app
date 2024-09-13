import { Layout as AntdLayout } from 'antd';
import { ReactNode } from 'react';
import styled from 'styled-components';

import { MENU_MAX_WIDTH } from 'constants/index';
import { MEDIA_QUERY } from 'constants/theme';
import { useScreen } from 'hooks/useScreen';

import { Footer } from './Footer';
import { Menu, MobileMenu } from './Menu';

const { Content, Sider } = AntdLayout;

export const CustomLayout = styled(AntdLayout)`
  min-height: 100vh;
  padding: 0 24px;
  overflow: auto;
  background-color: #2f1d57;
  background-image: url('/images/background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  .ant-layout {
    position: relative;
    background: transparent;
  }

  .ant-layout-sider {
    background: transparent;
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }

  .ant-layout.ant-layout-has-sider .ant-layout-content {
    display: flex;
    flex-direction: column;
    left: -${MENU_MAX_WIDTH}px;
    margin-left: ${MENU_MAX_WIDTH}px;
    width: 100%;
    padding: 40px 0px;
    min-height: 100vh;
    position: absolute;
  }

  ${MEDIA_QUERY.mobile} {
    padding: 0 16px;
  }
`;

const ContentInner = styled.div`
  display: flex;
  flex-direction: column;
  flex: auto;
  margin: 0 auto;
  max-width: 720px;
  width: 100%;
`;

type LayoutProps = {
  children?: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const { isDesktop } = useScreen();

  return (
    <CustomLayout>
      <AntdLayout hasSider={isDesktop}>
        {isDesktop && (
          <Sider width={MENU_MAX_WIDTH}>
            <Menu />
          </Sider>
        )}
        <Content>
          <ContentInner>
            {!isDesktop && <MobileMenu />}
            {children}
          </ContentInner>
          <Footer />
        </Content>
      </AntdLayout>
    </CustomLayout>
  );
};
