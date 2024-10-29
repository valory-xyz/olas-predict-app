import { Flex } from 'antd';
import { FixedProductMarketMaker } from 'graphql/types';
import Link from 'next/link';
import styled from 'styled-components';
import { fromHex } from 'viem';

import { Answer } from 'components/shared/Answer';
import { Countdown } from 'components/shared/Countdown';
import { PredictionBar } from 'components/shared/PredictionBar';
import { Thumbnail } from 'components/shared/Thumbnail';
import { Card, CardHeader, QuestionTitle } from 'components/shared/styles';
import { useOutcomeTokenMarginalPrices } from 'hooks/useOutcomeTokenMarginalPrices';
import { getAnswer, getAnswerType, getPredictedAnswerIndex } from 'utils/questions';

import { LoaderCard } from './LoaderCard';
import ShareButton from 'components/shared/ShareButton';
import { CardFooter } from 'components/shared/styles';

const StyledLink = styled(Link)`
  width: 100%;
  &:hover {
    color: inherit;
  }
`;

type QuestionCardProps = {
  market: FixedProductMarketMaker;
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
    <StyledLink href={`/questions/${market.id}`}>
      <Card type={answerType}>
        <CardHeader gap={24}>
          <Thumbnail marketId={market.id} />
          <Flex vertical gap={16}>
            <QuestionTitle>{market.title}</QuestionTitle>
            <Answer type={answerType} answer={answer} questionId={market.question?.id} />
          </Flex>
        </CardHeader>
        <PredictionBar
          marketId={market.id}
          type={answerType}
          outcomes={market.outcomes}
          outcomeTokenMarginalPrices={outcomeTokenMarginalPrices}
        />
        <CardFooter>
          <Countdown
            openingTimestamp={market.openingTimestamp}
            answerFinalizedTimestamp={market.answerFinalizedTimestamp}
          />
          <ShareButton marketId={market.id} />
        </CardFooter>
      </Card>
    </StyledLink>
  );
};
