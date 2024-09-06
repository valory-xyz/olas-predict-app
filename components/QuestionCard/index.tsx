import { Flex } from 'antd';
import { FixedProductMarketMaker } from 'graphql/types';
import { AnswerType } from 'types';
import { fromHex } from 'viem';

import { Answer } from './Answer';
import { Countdown } from './Countdown';
import { LoaderCard } from './LoaderCard';
import { PredictionBar } from './PredictionBar';
import { Thumbnail } from './Thumbnail';
import { useOutcomeTokenMarginalPrices } from './hooks';
import { Card, Title } from './styles';

type QuestionCardProps = {
  market: FixedProductMarketMaker;
};

const getPredictedAnswerIndex = (
  outcomeTokenMarginalPrices: FixedProductMarketMaker['outcomeTokenMarginalPrices'],
) => {
  if (!outcomeTokenMarginalPrices) return null;

  // Find the index of the maximum value in outcomeTokenMarginalPrices
  return outcomeTokenMarginalPrices
    .map((price) => parseFloat(price))
    .reduce((maxIdx, currentPrice, idx, arr) => (currentPrice > arr[maxIdx] ? idx : maxIdx), 0);
};

const getAnswerType = (
  predictedAnswerIndex: number | null,
  currentAnswerIndex: number | null,
): AnswerType => {
  if (currentAnswerIndex === null) return 'ongoing';
  if (predictedAnswerIndex === currentAnswerIndex) return 'predicted_right';
  return 'predicted_wrong';
};

const getAnswer = (
  predictedAnswerIndex: number | null,
  currentAnswerIndex: number | null,
  outcomes: FixedProductMarketMaker['outcomes'],
): string => {
  if (!outcomes) return 'NA';
  if (currentAnswerIndex !== null) return outcomes[currentAnswerIndex];
  if (predictedAnswerIndex !== null) return outcomes[predictedAnswerIndex];
  return 'NA';
};

export const QuestionCard = ({ market }: QuestionCardProps) => {
  const { data: outcomeTokenMarginalPrices, isLoading } = useOutcomeTokenMarginalPrices(market);

  const predictedAnswerIndex = getPredictedAnswerIndex(outcomeTokenMarginalPrices);
  const currentAnswerIndex = market.question?.currentAnswer
    ? fromHex(market.question.currentAnswer, 'number')
    : null;

  const answerType = getAnswerType(predictedAnswerIndex, currentAnswerIndex);
  const answer = getAnswer(predictedAnswerIndex, currentAnswerIndex, market.outcomes);

  if (isLoading) {
    return <LoaderCard />;
  }

  return (
    <Card type={answerType}>
      <Flex gap={24}>
        <Thumbnail marketId={market.id} />
        <Flex vertical gap={16}>
          <Title>{market.title}</Title>
          <Answer type={answerType} answer={answer} questionId={market.question?.id} />
        </Flex>
      </Flex>
      <PredictionBar
        type={answerType}
        outcomes={market.outcomes}
        outcomeTokenMarginalPrices={outcomeTokenMarginalPrices}
      />
      <Countdown openingTimestamp={market.openingTimestamp} />
    </Card>
  );
};
