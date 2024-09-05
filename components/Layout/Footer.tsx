import styled from 'styled-components';

import { PoweredByOlas } from 'components/Branding/PoweredByOlas';

const Root = styled.div`
  text-align: center;
  padding-top: 40px;
`;

export const Footer = () => (
  <Root>
    <PoweredByOlas />
  </Root>
);
