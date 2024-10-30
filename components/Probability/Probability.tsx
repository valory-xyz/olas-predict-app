import { useQuery } from '@tanstack/react-query';
import { Flex, Spin, Typography } from 'antd';
import { getBlocksByTimestamps, getMarginalPrices } from 'graphql/queries';
import { FixedProductMarketMaker } from 'graphql/types';
import styled from 'styled-components';

import { Card, NoDataContainer } from 'components/shared/styles';
import { NA } from 'constants/index';
import { COLOR } from 'constants/theme';
import { useMarketTrades } from 'hooks/useMarketTrades';
import { convertToPercentage } from 'utils/questions';

import { Chart } from './Chart';

const { Title, Text } = Typography;

const Legend = styled.div`
  width: 32px;
  height: 6px;
  background-color: ${COLOR.TEXT_PRIMARY};
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
      if (!tradesData) return null;

      // Get all block numbers of trades based on their creation timestamps.
      const timestamps = [...tradesData.fpmmTrades]
        .reverse()
        .map((trade) => trade.creationTimestamp);
      if (timestamps.length === 0) return null;

      const blockByTimestamps = await getBlocksByTimestamps({ timestamps });
      if (!blockByTimestamps) return null;

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
        value: convertToPercentage(item[0]),
      }))
    : [];

  // const data = rawData.map((item) => ({ ...item, timestamp: new Date(item.timestamp) }));

  const outcome = outcomes ? outcomes[0] : NA;
  const isLoading = isTradesLoading || isHistoryLoading;

  // useRenderCount('Probability trend', 'yellow');
  return (
    <Card type="ongoing">
      <Title level={4} className="m-0">
        Probability trend
      </Title>
      <Flex gap={16} align="center">
        <Legend />
        <Text>{outcome}</Text>
      </Flex>

      {isLoading ? (
        <NoDataContainer>
          <Spin size="large" />
        </NoDataContainer>
      ) : (
        <>
          {data.length === 0 ? (
            <NoDataContainer>
              <Text>No data available</Text>
            </NoDataContainer>
          ) : (
            <Chart data={data} outcome={outcome} />
          )}
        </>
      )}
    </Card>
  );
};

/**
 * 

 */
