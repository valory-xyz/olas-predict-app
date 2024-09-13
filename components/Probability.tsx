import { useQuery } from '@tanstack/react-query';
import { Flex, Spin, Typography } from 'antd';
import { getBlocksByTimestamps, getMarginalPrices } from 'graphql/queries';
import { FixedProductMarketMaker } from 'graphql/types';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

import { Card } from 'components/shared/styles';
import { COLOR } from 'constants/theme';
import { useMarketTrades } from 'hooks/useMarketTrades';
import { getPercentage } from 'utils/questions';

const LineChart = dynamic(() => import('@ant-design/plots').then((mod) => mod.Line), {
  ssr: false,
});

const { Title, Text } = Typography;

const CHART_HEIGHT = 230;

const CHART_CONFIG = {
  xField: 'timestamp',
  yField: 'value',
  theme: 'classicDark',
  scale: { y: { domainMax: 100, domainMin: 0 } },
  axis: { y: { position: 'right', labelFormatter: (value: string) => `${value}%` } },
  height: CHART_HEIGHT,
  style: {
    stroke: COLOR.TEXT_PRIMARY,
    lineWidth: 3,
  },
};

const LegendColor = styled.div`
  width: 32px;
  height: 6px;
  background-color: ${COLOR.TEXT_PRIMARY};
`;

const NoDataContainer = styled.div`
  display: flex;
  height: ${CHART_HEIGHT}px;
  align-items: center;
  justify-content: center;
`;

type ProbabilityProps = {
  marketId: FixedProductMarketMaker['id'];
  outcomes: FixedProductMarketMaker['outcomes'];
};

export const Probability = ({ marketId, outcomes }: ProbabilityProps) => {
  const { data: tradesData, isLoading: isTradesLoading } = useMarketTrades(marketId);

  const { data: outcomesHistory, isLoading: isHistoryLoading } = useQuery({
    enabled: !!tradesData,
    queryKey: ['getMarketOutcomesHistory', marketId],
    queryFn: async () => {
      if (!tradesData) return;

      // Get all block numbers of trades based on their creation timestamps.
      const timestamps = tradesData.fpmmTrades.map((trade) => trade.creationTimestamp);
      if (timestamps.length === 0) return;
      const blockByTimestamps = await getBlocksByTimestamps({ timestamps });
      if (!blockByTimestamps) return;

      // Ensure block numbers are unique
      const blockNumbers = Array.from(
        new Set(Object.values(blockByTimestamps).map((value) => Number(value[0].number))),
      );

      // Fetch marginal prices at the specified block numbers
      // so that we can build the history of predictions
      const marginalPrices = await getMarginalPrices({
        id: marketId,
        blockNumbers,
      });

      return Object.values(marginalPrices).map((value, index) => ({
        time: timestamps[index],
        0: value.outcomeTokenMarginalPrices[0],
        1: value.outcomeTokenMarginalPrices[1],
      }));
    },
  });

  const data = outcomesHistory
    ? outcomesHistory.map((item) => ({
        timestamp: new Date(item.time * 1000),
        value: getPercentage(item[0]),
      }))
    : [];

  const isLoading = isTradesLoading || isHistoryLoading;

  return (
    <Card type="ongoing">
      <Title level={4} className="m-0">
        Probability trend
      </Title>
      <Flex gap={16} align="center">
        <LegendColor />
        <Text>{outcomes ? outcomes[0] : 'NA'}</Text>
      </Flex>

      {isLoading && (
        <NoDataContainer>
          <Spin size="large" />
        </NoDataContainer>
      )}

      {!isLoading && data.length === 0 && (
        <NoDataContainer>
          <Text>No data available</Text>
        </NoDataContainer>
      )}

      {!isLoading && data.length > 0 && (
        <LineChart
          data={data}
          {...CHART_CONFIG}
          interaction={{
            tooltip: {
              // @ts-expect-error:next-line
              render: (_, { title, items }: { title: string; items: { value: string }[] }) => {
                const value = items[0].value;
                return (
                  <div key={title}>
                    <b>{`${outcomes ? outcomes[0] : 'NA'} ${value}%`}</b>
                    <br />
                    {title}
                  </div>
                );
              },
            },
          }}
        />
      )}
    </Card>
  );
};
