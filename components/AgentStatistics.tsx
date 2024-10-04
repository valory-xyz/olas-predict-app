import { useQuery } from '@tanstack/react-query';
import { Col, Flex, Row, Skeleton, Typography } from 'antd';
import { getConditionMarket, getMarketUserTrades, getUserPositions } from 'graphql/queries';
import {
  Condition,
  FixedProductMarketMaker,
  FpmmTrade,
  TraderAgent,
  UserPosition,
} from 'graphql/types';
import styled from 'styled-components';
import { fromHex } from 'viem';

import { Card } from 'components/shared/styles';
import { INVALID_ANSWER_HEX, NA } from 'constants/index';
import { getTimeAgo } from 'utils/time';

const { Title, Text } = Typography;

const StatisticValue = styled.span`
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
`;

type AgentStatisticsProps = {
  agent: TraderAgent;
};

interface UserBets extends UserPosition {
  fpmmTrades: FpmmTrade[];
  fpmm: FixedProductMarketMaker;
  condition: Condition;
}

const Statistic = ({
  title,
  value,
  isLoading,
}: {
  title: string;
  value: string;
  isLoading?: boolean;
}) => (
  <Col span={12}>
    <Flex vertical gap={8}>
      <Text type="secondary">{title}</Text>
      {isLoading ? <Skeleton.Input active /> : <StatisticValue>{value}</StatisticValue>}
    </Flex>
  </Col>
);

const sortByNewestBet = (a: UserBets, b: UserBets) => {
  return (
    b.fpmmTrades[b.fpmmTrades.length - 1]?.creationTimestamp -
    a.fpmmTrades[a.fpmmTrades.length - 1]?.creationTimestamp
  );
};

const getNumberOfClosedBets = (userBets: UserBets[]) =>
  userBets?.reduce((acc, userPosition) => {
    const currentAnswer = userPosition.fpmm.currentAnswer;
    const closeTime = userPosition.fpmm.openingTimestamp * 1000;

    if ((currentAnswer !== null && currentAnswer !== INVALID_ANSWER_HEX) || closeTime < Date.now())
      return acc + 1;

    return acc;
  }, 0);

const getNumberOfWonBets = (userBets: UserBets[]) =>
  userBets?.reduce((acc, userPosition) => {
    const currentAnswer = userPosition.fpmm.currentAnswer;
    const outcomeIndex = userPosition.position.indexSets[0] - 1;

    if (currentAnswer !== null && fromHex(currentAnswer, 'number') === outcomeIndex) return acc + 1;

    return acc;
  }, 0);

export const AgentStatistics = ({ agent }: AgentStatisticsProps) => {
  const { data: successRate, isLoading } = useQuery({
    queryKey: ['getAgentSuccessRate', agent.id],
    queryFn: async () => {
      const userPositionsData = await getUserPositions({ id: agent.id.toLowerCase() });
      const userPositions = userPositionsData?.userPositions ?? [];

      const userPositionsComplete = await Promise.allSettled(
        userPositions.map(async (userPosition) => {
          try {
            // const position = new Position(userPosition.position);
            const outcomeIndex = userPosition.position.indexSets[0] - 1;
            const condition = userPosition.position.conditions?.[0];
            const conditionId = userPosition.position.conditionIdsStr;

            const omenConditionData = await getConditionMarket({
              id: conditionId,
            });
            const omenCondition = omenConditionData?.conditions[0];
            const market = omenCondition?.fixedProductMarketMakers[0];

            if (!market) return undefined;

            const tradesData = await getMarketUserTrades({
              creator: agent.id.toLowerCase(),
              fpmm: market.id,
              outcomeIndex_in: [outcomeIndex],
            });

            return {
              ...userPosition,
              fpmm: market,
              condition: condition,
              fpmmTrades: tradesData?.fpmmTrades || [],
            };
          } catch (error) {
            console.error(error);
          }
        }),
      ).then((results) =>
        results
          .filter(
            (result): result is PromiseFulfilledResult<UserBets> =>
              result.status === 'fulfilled' &&
              result.value !== undefined &&
              result.value.fpmmTrades.length > 0,
          )
          .map((result) => result.value)
          .sort(sortByNewestBet),
      );

      const numberOfClosedBets = getNumberOfClosedBets(userPositionsComplete);
      const numberOfWonBets = getNumberOfWonBets(userPositionsComplete);

      const successRate =
        numberOfClosedBets !== undefined &&
        numberOfClosedBets !== 0 &&
        numberOfWonBets !== undefined
          ? ((numberOfWonBets / numberOfClosedBets) * 100).toFixed(0)
          : '-';

      return successRate;
    },
  });

  return (
    <Card type="ongoing">
      <Title level={4} className="m-0">
        Agent statistics
      </Title>
      <Row>
        <Statistic title="Bets made" value={agent.totalBets.toLocaleString()} />
        <Statistic
          title="Prediction accuracy"
          value={successRate ? `${successRate}%` : NA}
          isLoading={isLoading}
        />
      </Row>
      <Row>
        {/* <Statistic title="Total earnings" value="TBD" /> */}
        <Statistic title="Created" value={getTimeAgo(Number(agent.firstParticipation) * 1000)} />
      </Row>
    </Card>
  );
};
