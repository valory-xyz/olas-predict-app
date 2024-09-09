import { useQuery } from '@tanstack/react-query';
import { Flex, Skeleton, Typography } from 'antd';
import { getMarketTrades } from 'graphql/queries';
import { FixedProductMarketMaker } from 'graphql/types';
import { AnswerType } from 'types';
import { formatUnits } from 'viem';

import { LeftLine, ProgressBarContainer, RightLine } from './styles';

const { Text } = Typography;

const CAPTIONS_BY_TYPE = {
  ongoing: 'According to AI agents the likelihoods are:',
  predicted_right: 'Most agents got it right!',
  predicted_wrong: 'Most agents got it wrong.',
};

type PredictionBarProps = {
  marketId: FixedProductMarketMaker['id'];
  type: AnswerType;
  outcomeTokenMarginalPrices: FixedProductMarketMaker['outcomeTokenMarginalPrices'];
  outcomes: FixedProductMarketMaker['outcomes'];
};

type ProgressBarProps = {
  leftPercentage: number;
  hasOutcomePercentages: boolean;
  type: AnswerType;
  outcomes: FixedProductMarketMaker['outcomes'];
};

const getPercentage = (value: string): number => +(parseFloat(value) * 100).toFixed(2);

const ProgressBar = ({
  leftPercentage,
  type,
  outcomes,
  hasOutcomePercentages,
}: ProgressBarProps) => {
  const rightPercentage = (100 - leftPercentage).toFixed(2);

  return (
    <ProgressBarContainer>
      <RightLine type={type}>
        <LeftLine width={leftPercentage} type={type}>
          <span>
            {outcomes?.[0] || ''} {hasOutcomePercentages ? leftPercentage : 'NA'}%
          </span>
        </LeftLine>
        <span>
          {outcomes?.[1] || ''} {hasOutcomePercentages ? rightPercentage : 'NA'}%
        </span>
      </RightLine>
    </ProgressBarContainer>
  );
};

const getAgentsBetsText = (agentsNum: number, totalBets: string) =>
  `${agentsNum} AI agent${agentsNum == 1 ? '' : 's'} bet $${totalBets}`;

const AgentsBets = ({ marketId }: { marketId: FixedProductMarketMaker['id'] }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['getMarketTrades', marketId],
    queryFn: async () =>
      getMarketTrades({
        first: 100,
        fpmm: marketId,
      }),
    select: (data) => {
      return data.fpmmTrades.reduce<Record<string, { agents: string[]; totalBets: number }>>(
        (res, trade) => {
          const answerIndex = trade.outcomeIndex;
          const betAmount =
            parseFloat(trade.collateralAmountUSD) - parseFloat(formatUnits(trade.feeAmount, 18));
          res[answerIndex].agents.push(trade.creator.id);
          res[answerIndex].totalBets += betAmount;

          return res;
        },
        { '0': { agents: [], totalBets: 0 }, '1': { agents: [], totalBets: 0 } },
      );
    },
  });

  if (isLoading)
    return (
      <Flex justify="space-between">
        <Skeleton.Input active size="small" />
        <Skeleton.Input active size="small" />
      </Flex>
    );

  if (!data) return null;

  return (
    <Flex justify="space-between">
      {Object.values(data).map(({ agents, totalBets }, index) => (
        <Text type="secondary" key={index}>
          {getAgentsBetsText(agents.length, totalBets.toFixed(2))}
        </Text>
      ))}
    </Flex>
  );
};

export const PredictionBar = ({
  marketId,
  type,
  outcomeTokenMarginalPrices,
  outcomes,
}: PredictionBarProps) => {
  let leftPercentage;
  if (outcomeTokenMarginalPrices?.[0]) {
    leftPercentage = getPercentage(outcomeTokenMarginalPrices[0]);
  }

  return (
    <Flex vertical gap={14}>
      <Text type="secondary">{CAPTIONS_BY_TYPE[type]}</Text>
      <ProgressBar
        leftPercentage={leftPercentage || 50}
        hasOutcomePercentages={typeof leftPercentage === 'number'}
        type={type}
        outcomes={outcomes}
      />
      <AgentsBets marketId={marketId} />
    </Flex>
  );
};
