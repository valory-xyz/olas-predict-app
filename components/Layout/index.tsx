import { Layout as AntdLayout } from 'antd';
import { ReactNode } from 'react';
import styled from 'styled-components';

import { Footer } from './Footer';
import { Menu } from './Menu';

const { Content, Sider } = AntdLayout;

const SIDER_WIDTH = 224;

export const CustomLayout = styled(AntdLayout)`
  min-height: 100vh;
  padding: 40px 24px;

  background-image: url('images/background.png');
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
  }

  .ant-layout.ant-layout-has-sider .ant-layout-content {
    left: -${SIDER_WIDTH}px;
    margin-left: ${SIDER_WIDTH}px;
    width: 100%;
    position: absolute;
  }
`;

const ContentInner = styled.div`
  margin: 0 auto;
  max-width: 720px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
        </Content>
      </AntdLayout>
      <Footer />
    </CustomLayout>
  );
};
