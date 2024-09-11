import { Layout as AntdLayout } from 'antd';
import { ReactNode } from 'react';
import styled from 'styled-components';

import { Footer } from './Footer';
import { Menu } from './Menu';

const { Content, Sider } = AntdLayout;

const SIDER_WIDTH = 224;

export const CustomLayout = styled(AntdLayout)`
  min-height: 100vh;
  padding: 0 24px;
  overflow: auto;
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
    left: -${SIDER_WIDTH}px;
    margin-left: ${SIDER_WIDTH}px;
    width: 100%;
    padding: 40px 0px;
    min-height: 100vh;
    position: absolute;
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
  return (
    <CustomLayout>
      <AntdLayout hasSider>
        <Sider width={SIDER_WIDTH}>
          <Menu />
        </Sider>
        <Content>
          <ContentInner>{children}</ContentInner>
          <Footer />
        </Content>
      </AntdLayout>
    </CustomLayout>
  );
};
