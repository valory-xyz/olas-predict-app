import styled from 'styled-components';

import { PoweredByOlas } from 'components/Branding/PoweredByOlas';

const Root = styled.div`
  text-align: center;
  margin-top: auto;
  padding: 40px 0;
`;

export const Footer = () => (
  <Root>
    <PoweredByOlas />
  </Root>
);
