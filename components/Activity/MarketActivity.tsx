import { Flex, Typography } from 'antd';
import { FixedProductMarketMaker, FpmmTrade, TradeType } from 'graphql/types';
import Link from 'next/link';

import { GNOSIS_SCAN_URL, NA } from 'constants/index';
import { useMarketTrades } from 'hooks/useMarketTrades';
import { generateName } from 'utils/agents';
import { getTimeAgo } from 'utils/time';

import { Activity } from './Activity';

const { Text } = Typography;

type MarketActivityProps = {
  marketId: FixedProductMarketMaker['id'];
};

type ActivityItem = {
  id: string;
  creator: string;
  name: string;
  value: string;
  timeAgo: string;
  time: string;
  type: TradeType;
  txHash: string;
};

const getActivityItems = (trades: FpmmTrade[]): ActivityItem[] => {
  return trades.map((item) => {
    const betAmount = parseFloat(item.collateralAmountUSD).toFixed(5);

    const outcomeValue =
      item.fpmm.outcomes && item.outcomeIndex ? item.fpmm.outcomes[item.outcomeIndex] : null;

    return {
      id: item.id,
      creator: item.creator.id,
      name: generateName(item.creator.id),
      value: outcomeValue ? `$${betAmount} ${outcomeValue}` : NA,
      timeAgo: getTimeAgo(item.creationTimestamp * 1000),
      time: new Date(item.creationTimestamp * 1000).toLocaleString(),
      type: item.type,
      txHash: item.transactionHash,
    };
  });
};

export const MarketActivity = ({ marketId }: MarketActivityProps) => {
  const { data, isLoading } = useMarketTrades(marketId);

  return (
    <Activity<ActivityItem>
      isLoading={isLoading}
      data={data}
      getActivityItems={getActivityItems}
      timelineItems={(trades) =>
        trades.map((item) => ({
          children: (
            <Flex vertical gap={8} key={item.id}>
              <Text>
                <Link href={`/agents/${item.creator}`}>
                  <b>Agent {item.name}</b>
                </Link>{' '}
                {item.type === TradeType.Buy ? 'purchased' : 'sold'}{' '}
                <a
                  href={`${GNOSIS_SCAN_URL}/tx/${item.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <b>{item.value}</b>
                </a>{' '}
                tokens.
              </Text>
              <Text type="secondary" title={item.time}>
                {item.timeAgo}
              </Text>
            </Flex>
          ),
        }))
      }
    />
  );
};
