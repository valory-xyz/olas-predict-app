import { useQuery } from '@tanstack/react-query';
import { Flex, Typography } from 'antd';
import { getMarkets } from 'graphql/queries';
import { FixedProductMarketMaker } from 'graphql/types';
import Link from 'next/link';
import styled from 'styled-components';
import { fromHex } from 'viem';

import { LoaderCard } from 'components/AgentDetailsCard/LoaderCard';
import { LoadingError } from 'components/ErrorState';
import { Answer } from 'components/shared/Answer';
import { Card, CardHeader, QuestionTitle } from 'components/shared/styles';
import { useOutcomeTokenMarginalPrices } from 'hooks/useOutcomeTokenMarginalPrices';
import { getAnswer, getAnswerType, getPredictedAnswerIndex } from 'utils/questions';
import { Console } from 'console';

const { Title, Paragraph } = Typography;

const StyledLink = styled(Link)`
  width: 100%;
  &:hover {
    color: inherit;
  }
`;

type ArticlesCardProp = {
  market: FixedProductMarketMaker;
};

const ArticleCard = ({ market }: ArticlesCardProp) => {
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
          <Flex vertical gap={16}>
            <QuestionTitle>{market.title}</QuestionTitle>
            <Answer type={answerType} answer={answer} questionId={market.question?.id} />
          </Flex>
        </CardHeader>
      </Card>
    </StyledLink>
  );
};

const articleurl = 'https://olas.network/';
const marketId = '0xa8a32f9709f2992118f841c857cb435e43e11cfd';

const ArticlesPage = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getMarkets', marketId],
    queryFn: async () => getMarkets({ id: marketId }),
  });

  const markets = data?.fixedProductMarketMakers;

  console.log(markets);
  console.log(error);

  return (
    <Card type="ongoing">
      {isError ? (
        <LoadingError />
      ) : (
        <>
          <Flex vertical gap={12} align="center">
            <Title>TOPIC</Title>
            <a target="_blank" className="flex items-center" href={articleurl}>
              <b>{articleurl}</b>
            </a>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec eros vitae est
              tristique efficitur a nec est. Sed pretium faucibus eros, et fermentum libero dapibus
              vel. Quisque dui tortor, porta finibus ligula id, condimentum semper libero. Donec
              eget ipsum at augue aliquam accumsan vitae at metus. Fusce consectetur at lacus eget
              porta.
            </Paragraph>

            <Flex wrap className="md:grid-cols-3">
              {isLoading && (
                <>
                  <LoaderCard />
                </>
              )}
              {markets?.map((market) => <ArticleCard market={market} key={market.id} />)}
            </Flex>
          </Flex>
        </>
      )}
    </Card>
  );
};

export default ArticlesPage;
