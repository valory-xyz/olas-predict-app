import { Layout as AntdLayout } from 'antd';
import { ReactNode } from 'react';
import styled from 'styled-components';

import { MENU_MAX_WIDTH } from 'constants/index';
import { COLOR, MEDIA_QUERY } from 'constants/theme';
import { useScreen } from 'hooks/useScreen';

import { Footer } from './Footer';
import { Menu, MobileMenu } from './Menu';

const { Content, Sider } = AntdLayout;

export const CustomLayout = styled(AntdLayout)`
  min-height: 100vh;
  padding: 0 24px;
  overflow: auto;
  background-color: ${COLOR.BACKGROUND};
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

  .ant-layout-content {
    display: flex;
    flex-direction: column;
  }

  .ant-layout.ant-layout-has-sider .ant-layout-content {
    left: -${MENU_MAX_WIDTH}px;
    margin-left: ${MENU_MAX_WIDTH}px;
    width: 100%;
    /* padding: 40px 0px; */ // uncomment when the beta banner is removed
    padding: 56px 0px 40px;
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

const BetaBanner = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 10px;
  text-align: center;
  position: absolute;
  top: 0;
  left: -24px;
  right: -24px;
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
            <BetaBanner>Beta</BetaBanner>
            {!isDesktop && <MobileMenu />}
            {children}
          </ContentInner>
          <Footer />
        </Content>
      </AntdLayout>
    </CustomLayout>
  );
};
