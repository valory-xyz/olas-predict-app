import { useQuery } from '@tanstack/react-query';
import { Col, Flex, Row, Skeleton, Typography } from 'antd';
import { getMarkets } from 'graphql/queries';
import {
  FixedProductMarketMaker,
  FixedProductMarketMaker_OrderBy,
  OrderDirection,
} from 'graphql/types';
import Link from 'next/link';
import styled from 'styled-components';
import { fromHex } from 'viem';

import { LoadingError } from 'components/ErrorState';
import { Answer } from 'components/shared/Answer';
import { Card, CardHeader, QuestionTitle } from 'components/shared/styles';
import { useOutcomeTokenMarginalPrices } from 'hooks/useOutcomeTokenMarginalPrices';
import { getAnswer, getAnswerType, getPredictedAnswerIndex } from 'utils/questions';

const { Title, Paragraph } = Typography;

const StyledLink = styled(Link)`
  width: 100%;
  &:hover {
    color: inherit;
  }
`;

const Loader = () => (
  <Row>
    <Col span={12}>
      <Skeleton />
    </Col>
    <Col span={12}>
      <Skeleton />
    </Col>
  </Row>
);

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
    return <Skeleton />;
  }

  return (
    <StyledLink href={`/questions/${market.id}`} style={{ width: '50%' }}>
      <Card type={answerType}>
        <CardHeader gap={24}>
          <Flex vertical gap={16}>
            <QuestionTitle style={{ fontSize: 16, lineHeight: '1.2' }}>
              {market.title}
            </QuestionTitle>
            <Answer type={answerType} answer={answer} questionId={market.question?.id} />
          </Flex>
        </CardHeader>
      </Card>
    </StyledLink>
  );
};

const articleParagraph =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec eros vitae est efficitur a nec est. Sed pretium faucibus eros, et libero dapibusvel. Quisque dui tortor, porta finibus ligula id, condimentum semper libero. Donec ipsum at augue aliquam accumsan vitae at metus. Fusceat lacus egetporta.';
// const nowTimestamp = Math.floor(Date.now() / 1000);
const articleUrl = 'https://olas.network/';
const marketId1 = '0xe8c725b66d02dd97242c00c872ae43885693c701';
const marketId2 = '0x2a1e5f3e8678d202569f2e696f3f6c99a03afa37';

const ArticlesPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['getMarketsForArticle', articleUrl],
    queryFn: async () =>
      getMarkets({
        first: 10,
        skip: 0,
        id_in: [marketId1, marketId2],
        orderBy: FixedProductMarketMaker_OrderBy.UsdVolume,
        orderDirection: OrderDirection.Desc,
        // scaledLiquidityParameter_gt: 0,
        // openingTimestamp_gt: nowTimestamp,
        // usdVolume_gt: 10,
      }),
  });

  const markets = data?.fixedProductMarketMakers;

  return (
    <Card type="ongoing">
      {isError ? (
        <LoadingError />
      ) : (
        <>
          <Flex vertical gap={12} align="center">
            <Title>TOPIC</Title>
            <a target="_blank" className="flex items-center" href={articleUrl}>
              <b>{articleUrl}</b>
            </a>
            <Paragraph>{articleParagraph}</Paragraph>

            <Flex wrap className="md:grid-cols-3 full-width">
              {isLoading && <Loader />}
              <Row gutter={[16, 0]} style={{ width: '100%' }}>
                {markets?.map((market) => (
                  <Col key={market.id} span={12}>
                    <ArticleCard market={market} />
                  </Col>
                ))}
              </Row>
            </Flex>
          </Flex>
        </>
      )}
    </Card>
  );
};

export default ArticlesPage;
