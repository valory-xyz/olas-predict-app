import styled from 'styled-components';

import { PoweredByOlas } from 'components/Branding/PoweredByOlas';
import { MEDIA_QUERY } from 'constants/theme';

const Root = styled.div`
  text-align: center;
  padding-top: 40px;

  ${MEDIA_QUERY.laptop} {
    padding-bottom: 40px;
  }
`;

export const Footer = () => (
  <Root>
    <PoweredByOlas />
  </Root>
);
