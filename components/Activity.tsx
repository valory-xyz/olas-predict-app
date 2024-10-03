import { Flex, Spin, Timeline, Typography } from 'antd';
import { FixedProductMarketMaker, FpmmTrade, TradeType } from 'graphql/types';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Card, NoDataContainer } from 'components/shared/styles';
import { GNOSIS_SCAN_URL, NA } from 'constants/index';
import { useMarketTrades } from 'hooks/useMarketTrades';
import { getAgentName } from 'utils/agents';
import { getTimeAgo } from 'utils/time';

const { Title, Text } = Typography;

const PAGE_SIZE = 10;

type ActivityProps = {
  marketId: FixedProductMarketMaker['id'];
};

type ActivityItem = {
  id: string;
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
      name: getAgentName(item.creator.id, 'trader'),
      value: outcomeValue ? `$${betAmount} ${outcomeValue}` : NA,
      timeAgo: getTimeAgo(item.creationTimestamp * 1000),
      time: new Date(item.creationTimestamp * 1000).toLocaleString(),
      type: item.type,
      txHash: item.transactionHash,
    };
  });
};

export const Activity = ({ marketId }: ActivityProps) => {
  const { data, isLoading } = useMarketTrades(marketId);
  const [trades, setTrades] = useState<ActivityItem[]>([]);

  useEffect(() => {
    if (data) {
      const lastTrades = data.fpmmTrades.slice(0, PAGE_SIZE);
      setTrades(getActivityItems(lastTrades));
    }
  }, [data]);

  const loadMoreData = () => {
    if (data) {
      // Simulate data loading with timeout
      setTimeout(() => {
        const nextTrades = data.fpmmTrades.slice(
          trades.length,
          Math.min(trades.length + PAGE_SIZE, data.fpmmTrades.length),
        );
        setTrades((prev) => [...prev, ...getActivityItems(nextTrades)]);
      }, 1000);
    }
  };

  return (
    <Card type="ongoing">
      <Title level={4} className="m-0">
        Latest activity
      </Title>

      {isLoading && (
        <NoDataContainer>
          <Spin size="large" />
        </NoDataContainer>
      )}

      {!isLoading && trades.length === 0 && (
        <NoDataContainer>
          <Text>No data available</Text>
        </NoDataContainer>
      )}

      <InfiniteScroll
        dataLength={trades.length}
        next={loadMoreData}
        height={380}
        hasMore={data ? trades.length < data.fpmmTrades.length : false}
        loader={<div />}
      >
        <Timeline
          pending={data && trades.length < data.fpmmTrades.length ? 'Loading...' : null}
          items={trades.map((item) => ({
            children: (
              <Flex vertical gap={8} key={item.id}>
                <Text>
                  <b>Agent {item.name}</b> {item.type === TradeType.Buy ? 'purchased' : 'sold'}{' '}
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
          }))}
        />
      </InfiniteScroll>
    </Card>
  );
};
