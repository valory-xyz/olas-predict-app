import { Spin, Timeline, TimelineItemProps, Typography } from 'antd';
import { FpmmTrade, Query } from 'graphql/types';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Card, NoDataContainer } from 'components/shared/styles';

const { Title, Text } = Typography;

const PAGE_SIZE = 10;

type ActivityProps<T> = {
  data: Pick<Query, 'fpmmTrades'> | undefined;
  isLoading: boolean;
  getActivityItems: (data: FpmmTrade[]) => T[];
  timelineItems: (trades: T[]) => TimelineItemProps[];
};

export const Activity = <T,>({
  isLoading,
  timelineItems,
  data,
  getActivityItems,
}: ActivityProps<T>) => {
  const [trades, setTrades] = useState<T[]>([]);

  useEffect(() => {
    if (data) {
      const lastTrades = data.fpmmTrades.slice(0, PAGE_SIZE);
      setTrades(getActivityItems(lastTrades));
    }
  }, [data, getActivityItems]);

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

      {!isLoading && timelineItems.length === 0 && (
        <NoDataContainer>
          <Text>No data available</Text>
        </NoDataContainer>
      )}

      {!isLoading && timelineItems.length > 0 && (
        <InfiniteScroll
          dataLength={trades.length}
          next={loadMoreData}
          height={380}
          hasMore={data ? trades.length < data.fpmmTrades.length : false}
          loader={<div />}
        >
          <Timeline
            pending={data && trades.length < data.fpmmTrades.length ? 'Loading...' : null}
            items={timelineItems(trades)}
          />
        </InfiniteScroll>
      )}
    </Card>
  );
};
