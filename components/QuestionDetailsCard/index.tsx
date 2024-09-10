import { Flex, Typography } from 'antd';
import { FixedProductMarketMaker } from 'graphql/types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import styled from 'styled-components';
import { fromHex } from 'viem';

import { Answer } from 'components/shared/Answer';
import { Countdown } from 'components/shared/Countdown';
import { PredictionBar } from 'components/shared/PredictionBar';
import { Thumbnail } from 'components/shared/Thumbnail';
import { Card, QuestionTitle } from 'components/shared/styles';
import { COLOR } from 'constants/theme';
import { useOutcomeTokenMarginalPrices } from 'hooks/useOutcomeTokenMarginalPrices';
import { getAnswer, getAnswerType, getPredictedAnswerIndex } from 'utils/questions';
import { getTimeAgo } from 'utils/time';

import { Creator } from './Creator';
import { LoaderCard } from './LoaderCard';
import { TradesAndLiquidity } from './TradesAndLiquidity';

const { Text } = Typography;

export const BackLink = styled(Link)`
  display: flex;
  gap: 6px;
  align-items: center;
  color: ${COLOR.SECONDARY};
`;

type QuestionDetailsCardProps = {
  market: FixedProductMarketMaker;
};

export const QuestionDetailsCard = ({ market }: QuestionDetailsCardProps) => {
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
        <Flex vertical gap={16}>
          <Flex justify="space-between">
            <BackLink href="/questions">
              <ArrowLeft /> All questions
            </BackLink>
            <Text type="secondary">Created {getTimeAgo(market.creationTimestamp * 1000)}</Text>
          </Flex>
          <QuestionTitle>{market.title}</QuestionTitle>
          <Answer type={answerType} answer={answer} questionId={market.question?.id} />
        </Flex>
        <Thumbnail marketId={market.id} />
      </Flex>
      <TradesAndLiquidity marketId={market.id} type={answerType} />
      <Creator address={market.creator} />
      <PredictionBar
        marketId={market.id}
        type={answerType}
        outcomes={market.outcomes}
        outcomeTokenMarginalPrices={outcomeTokenMarginalPrices}
      />
      <Countdown openingTimestamp={market.openingTimestamp} />
    </Card>
  );
};
