import { Statistic } from 'antd';
import { FixedProductMarketMaker } from 'graphql/types';
import { Clock } from 'lucide-react';
import styled from 'styled-components';

import { COLOR, MEDIA_QUERY } from 'constants/theme';
import { formatTimestamp } from 'utils/time';

const { Countdown: AntdCountdown } = Statistic;

type CountdownProps = {
  openingTimestamp: FixedProductMarketMaker['openingTimestamp'];
  answerFinalizedTimestamp: FixedProductMarketMaker['answerFinalizedTimestamp'];
};

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 8px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.2);
  color: ${COLOR.SECONDARY};

  .ant-statistic-content,
  .ant-statistic-content-value {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5;
    color: ${COLOR.SECONDARY};

    ${MEDIA_QUERY.mobile} {
      font-size: 14px;
    }
  }

  ${MEDIA_QUERY.mobile} {
    font-size: 14px;
  }
`;

export const Countdown = ({ openingTimestamp, answerFinalizedTimestamp }: CountdownProps) => {
  const deadline = +openingTimestamp * 1000;
  const now = Date.now();

  const isOngoing = deadline > now;

  if (isOngoing) {
    return (
      <Root>
        <Clock width={20} height={20} className="mr-4" />
        <AntdCountdown
          format={
            deadline && deadline < Date.now() + ONE_DAY_IN_MS ? 'H[h] m[m] s[s]' : 'D[d] H[h]'
          }
          value={deadline}
          onFinish={() => {
            // TODO: discuss how this should be updated considering we
            // can be on "opened" filter and the cart may vanish
          }}
        />{' '}
        to find out the truth
      </Root>
    );
  } else if (answerFinalizedTimestamp) {
    return <Root>Resolved on {formatTimestamp(answerFinalizedTimestamp * 1000)}</Root>;
  } else {
    return null;
  }
};
