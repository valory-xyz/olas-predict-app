import { useQuery } from '@tanstack/react-query';
import { Flex, Typography } from 'antd';
import { getMarkets } from 'graphql/queries';
import { FixedProductMarketMaker } from 'graphql/types';
import { useState } from 'react';
import { fromHex } from 'viem';

import { LoaderCard } from 'components/AgentDetailsCard/LoaderCard';
import { LoadingError } from 'components/ErrorState';
import { Answer } from 'components/shared/Answer';
import { Card, CardHeader, QuestionTitle } from 'components/shared/styles';
import { useOutcomeTokenMarginalPrices } from 'hooks/useOutcomeTokenMarginalPrices';
import { getAnswer, getAnswerType, getPredictedAnswerIndex } from 'utils/questions';

const { Title, Paragraph } = Typography;

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
    <Card type={answerType}>
      <CardHeader gap={24}>
        <Flex vertical gap={16}>
          <QuestionTitle>{market.title}</QuestionTitle>
          <Answer type={answerType} answer={answer} questionId={market.question?.id} />
        </Flex>
      </CardHeader>
    </Card>
  );
};

const articleurl = 'https://www.theguardian.com/us-news/2024/oct/09/hurricane-milton-makes-landfall-florida';
const marketId = '0xa8a32f9709f2992118f841c857cb435e43e11cfd';
const text = 
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet ligula mollis, blandit 
    tellus id, blandit sapien. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices 
    posuere cubilia curae; In metus felis, condimentum in malesuada eu, mattis at diam. Proin vitae
    velit non sem porttitor egestas. Nullam venenatis felis et bibendum pellentesque. Fusce
    imperdiet varius molestie. Praesent at risus rutrum, aliquet dui nec, auctor tellus. Proin
    malesuada lacus id massa eleifend venenatis. Proin faucibus vehicula leo, sollicitudin fermentum
    arcu ultricies ac. Quisque sollicitudin magna vel facilisis tincidunt. Sed at consequat purus.
    Cras et laoreet nisl. Donec dolor nibh, tincidunt ut ex et, elementum volutpat nibh. Quisque id
    bibendum turpis, quis congue neque. Nam venenatis purus congue eros sodales ornare. Duis
    facilisis mi at risus fermentum, ullamcorper efficitur velit molestie. Sed auctor lorem a dolor
    congue sodales. Nunc elementum mi ut porttitor tincidunt. Integer ut sapien scelerisque orci
    sodales viverra quis eu magna. Ut sit amet tempor nulla, id interdum felis. Praesent consectetur
    mollis risus, vitae varius urna blandit quis. Ut ac sapien at sapien tempus gravida at vitae
    diam. Phasellus eu placerat dolor, sed efficitur tortor. Sed consequat quis diam porttitor
    vulputate. Integer tempor dolor ac faucibus scelerisque. Nulla ac tellus vitae magna cursus
    ultrices ac non odio. Praesent in tempor ante, id convallis massa. Nunc ut enim velit. Donec leo
    nisi, commodo non condimentum at, mollis non neque. Proin felis ligula, egestas id ipsum eu,
    porttitor scelerisque tellus. Nunc nec eleifend ipsum. Aenean nec gravida felis, in feugiat
    magna. Cras felis lorem, vulputate eleifend nisi non, maximus accumsan quam. Donec luctus nisi
    sed tristique imperdiet. Aenean a odio efficitur, imperdiet dolor vitae, tincidunt magna. Cras
    vitae urna hendrerit, facilisis justo at, vehicula lacus. Donec tortor neque, malesuada quis
    facilisis tempus, mollis vitae justo. Ut dui elit, interdum et tristique eu, rutrum in ligula.
    Nulla elit velit, consequat eu porta eu, molestie ac dolor. Curabitur sodales in magna at
    varius. Nulla facilisi. Phasellus fringilla, massa sit amet iaculis convallis, odio lacus
    pretium metus, quis auctor nunc ante sed eros. Ut a eros eros. Sed ornare faucibus tortor at
    laoreet. Integer egestas dictum fermentum. Ut condimentum semper dolor. Donec vitae ipsum
    sapien. Curabitur est magna, accumsan sed imperdiet ut, venenatis non leo. Duis gravida, tellus
    et volutpat commodo, lectus lacus iaculis felis, eget lacinia justo augue eu lorem. Vestibulum
    et nisi quis arcu pretium venenatis. Nullam et lorem eu est mattis pellentesque at ac ligula.
    Suspendisse ornare interdum urna, vel congue magna porta et. Nam consectetur nibh magna. Cras
    accumsan quam et pretium laoreet. Praesent ligula libero, convallis sed dolor ac, rhoncus luctus
    enim. Nulla varius, est et porta congue, orci sapien tincidunt nulla, quis ullamcorper massa
    quam vitae orci. Pellentesque quis blandit arcu. Quisque orci dolor, cursus eget sem eu,
    porttitor rhoncus urna. Suspendisse eleifend finibus erat, vitae suscipit neque fringilla id.
    Proin nec lacus a diam faucibus facilisis. Pellentesque interdum interdum nisi nec bibendum.
    Vestibulum dolor odio, posuere et finibus eget, vehicula suscipit metus. In in placerat nibh. In
    suscipit sit amet felis gravida ultrices. Pellentesque sed mauris nec ipsum tempus malesuada
    eget vitae massa.`
;

const ArticlesPage = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getMarkets', marketId],
    queryFn: async () => getMarkets({ id: marketId }),
  });

  const markets = data?.fixedProductMarketMakers;
  const [showAll, setShowAll] = useState(false);

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
            <Paragraph>{showAll ? text : `${text.substring(0, 250)}`}</Paragraph>
            <a onClick={() => setShowAll(!showAll)}>Show {showAll ? 'less' : 'more'}</a>

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
