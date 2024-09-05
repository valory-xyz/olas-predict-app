import { Flex, Typography } from 'antd';
import { FixedProductMarketMaker } from 'graphql/types';
import { AnswerType } from 'types';

import { LeftLine, ProgressBarContainer, RightLine } from './styles';

const { Text } = Typography;

const CAPTIONS_BY_TYPE = {
  ongoing: 'According to AI agents the likelihoods are:',
  predicted_right: 'Most agents got it right!',
  predicted_wrong: 'Most agents got it wrong.',
};

type PredictionBarProps = {
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

const getPercentage = (value: string) => Math.round(parseFloat(value) * 100 * 100) / 100;

const ProgressBar = ({
  leftPercentage,
  type,
  outcomes,
  hasOutcomePercentages,
}: ProgressBarProps) => {
  const rightPercentage = (100 - leftPercentage).toFixed(2);

  return (
    <ProgressBarContainer>
      <RightLine>
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

export const PredictionBar = ({
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
    </Flex>
  );
};
