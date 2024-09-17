import { useQuery } from '@tanstack/react-query';
import { Flex } from 'antd';
import { getMarket } from 'graphql/queries';
import { useParams } from 'next/navigation';

import { Activity } from 'components/Activity';
import { LoadingError, QuestionNotFoundError } from 'components/ErrorState';
import { Probability } from 'components/Probability';
import { QuestionDetailsCard } from 'components/QuestionDetailsCard';
import { LoaderCard } from 'components/QuestionDetailsCard/LoaderCard';

const QuestionPage = () => {
  const params = useParams();
  const id = params?.id;
  const { data, isLoading, isFetched, isError } = useQuery({
    enabled: !!id,
    queryKey: ['getMarket', id],
    queryFn: async () => getMarket({ id: `${id}`.toLowerCase() }),
    select: (data) => data.fixedProductMarketMaker,
  });

  if (isLoading)
    return (
      <Flex vertical>
        <LoaderCard />
      </Flex>
    );

  if (isError) return <LoadingError />;

  if (isFetched) {
    if (!data) return <QuestionNotFoundError />;

    return (
      <Flex vertical gap={40} align="center" className="flex-auto">
        <QuestionDetailsCard market={data} />
        <Probability marketId={data.id} outcomes={data.outcomes} />
        <Activity marketId={data.id} />
      </Flex>
    );
  }
  return null;
};

export default QuestionPage;
