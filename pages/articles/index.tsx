import { useQuery } from '@tanstack/react-query';
import { Col, Flex, Row, Skeleton, Typography } from 'antd';
import { getMarkets } from 'graphql/queries';
import {
  FixedProductMarketMaker,
  FixedProductMarketMaker_OrderBy,
  OrderDirection,
} from 'graphql/types';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useState } from 'react';
import { fromHex } from 'viem';

import { LoadingError } from 'components/ErrorState';
import { Answer } from 'components/shared/Answer';
import { ProgressBar } from 'components/shared/PredictionBar';
import { Card, CardHeader, QuestionTitle } from 'components/shared/styles';
import { useOutcomeTokenMarginalPrices } from 'hooks/useOutcomeTokenMarginalPrices';
import {
  convertToPercentage,
  getAnswer,
  getAnswerType,
  getPredictedAnswerIndex,
} from 'utils/questions';

import mockData from './mock_data.json';

const { Title, Paragraph } = Typography;

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

  const leftPercentage = outcomeTokenMarginalPrices?.[0]
    ? convertToPercentage(outcomeTokenMarginalPrices[0])
    : 50;

  return (
    <Card
      type={answerType}
      style={{
        height: '100%',
      }}
    >
      <CardHeader gap={24} style={{ height: '100%' }}>
        <Flex vertical gap={16}>
          <QuestionTitle style={{ fontSize: 16, lineHeight: '1.4' }}>{market.title}</QuestionTitle>
          <Flex vertical gap={10} style={{ marginTop: 'auto' }}>
            <Answer type={answerType} answer={answer} questionId={market.question?.id} />
            <ProgressBar
              leftPercentage={leftPercentage}
              type={answerType}
              outcomes={market.outcomes}
              hasOutcomePercentages={typeof leftPercentage === 'number'}
            />
          </Flex>
        </Flex>
      </CardHeader>
    </Card>
  );
};

const articleTitle =
  'Hurricane Milton: nearly 3 million without power in Florida as category 3 storm makes landfall';
const articleParagraph = (
  <>
    Hurricane Milton made landfall in Florida, bringing with it catastrophic conditions that have
    left a significant mark on the state. The powerful storm caused widespread damage, characterized
    by extensive power outages, severe storm surges, and considerable property destruction. As the
    recovery efforts unfold, the prediction markets provide valuable insights into the unfolding
    situation and the anticipated challenges ahead. <br />
    Upon Hurricane Milton&apos;s impact, prediction markets set the probability of storm surges
    exceeding 5 feet at 0.9, corroborating the catastrophic surge reported in the article. The storm
    surges have not only inundated homes and businesses but have also disrupted transportation
    networks, complicating rescue and recovery operations. <br />
    The hurricane was classified as a Category 3 event at landfall, with prediction markets
    reflecting a high 0.85 probability, underscoring the severe weather conditions. This indicates a
    strong consensus that the hurricane&apos;s intensity contributed significantly to the damage
    experienced in affected regions. As a result, efforts are being concentrated on repairing
    infrastructure and providing immediate relief to those hit hardest by the storm. <br />
    Regarding power outages, prediction markets estimated a 0.7 probability that 80% of affected
    residents in Sarasota will have their power restored within two weeks. Power companies and
    emergency services are working around the clock to achieve this target, with crews mobilized
    from across the country to assist in the restoration efforts. This probability suggests a
    cautiously optimistic outlook, but it also emphasizes the challenges faced by utility companies
    in dealing with widespread outages and damaged infrastructure. <br />
    In terms of property damage, the prediction markets had anticipated a high volume of insurance
    claims, with a probability of 0.8 for claims surpassing 100,000 by October 17, 2024. This
    expectation aligns with the reports of substantial structural damage in affected areas, as
    residents begin to assess their losses and file claims. The insurance industry is bracing for a
    wave of claims that may impact the market significantly, with ongoing assessments guiding future
    probability adjustments. <br />
    In conclusion, the prediction markets provide a robust framework for understanding the immediate
    and ongoing impacts of Hurricane Milton. The probabilities associated with storm surges, power
    restoration, and insurance claims have not only highlighted the storm&apos;s severity but also
    the formidable recovery efforts required. As Florida moves forward, these markets will continue
    to to play a crucial role in shaping expectations and guiding responses in the face of this
    natural disaster.
  </>
);
const articleUrl =
  'https://www.theguardian.com/us-news/2024/oct/09/hurricane-milton-makes-landfall-florida';
const marketId1 = '0x4a81560d84a1f0fad5b9183ea9920d21b7a6ff78';

const ArticlesPage = () => {
  const [showAll, setShowAll] = useState(true);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['getMarketsForArticle', articleUrl],
    queryFn: async () =>
      getMarkets({
        first: 10,
        skip: 0,
        id_in: [marketId1],
        orderBy: FixedProductMarketMaker_OrderBy.UsdVolume,
        orderDirection: OrderDirection.Desc,
      }),
  });

  const markets = data?.fixedProductMarketMakers
    ? [...data.fixedProductMarketMakers, ...(mockData as unknown as FixedProductMarketMaker[])]
    : [];

  return (
    <Card type="ongoing">
      {isError ? (
        <LoadingError />
      ) : (
        <>
          <Flex vertical gap={12} align="center">
            <Title style={{ fontSize: 32 }}>
              {articleTitle}
              <a target="_blank" href={articleUrl}>
                ↗
              </a>
            </Title>
            <Paragraph
              className="m-0"
              ellipsis={
                showAll
                  ? {
                      rows: 5,
                      expandable: true,
                      symbol: '',
                    }
                  : false
              }
            >
              {articleParagraph}
            </Paragraph>
            <a onClick={() => setShowAll(!showAll)}>
              <Flex align="center" gap={4}>
                Show {showAll ? 'more' : 'less'}
                {showAll ? <ArrowDown /> : <ArrowUp />}
              </Flex>
            </a>

            <Flex wrap className="md:grid-cols-3 full-width">
              {isLoading && <Loader />}
              <Row gutter={[16, 16]} style={{ width: '100%' }}>
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
