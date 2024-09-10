import { useQuery } from '@tanstack/react-query';
import { Flex } from 'antd';
import { getMarket } from 'graphql/queries';
import { useParams } from 'next/navigation';

import { QuestionDetailsCard } from 'components/QuestionDetailsCard';
import { LoaderCard } from 'components/QuestionDetailsCard/LoaderCard';

const QuestionPage = () => {
  const params = useParams();
  const id = params?.id;
  const { data, isLoading } = useQuery({
    enabled: typeof id === 'string',
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

  if (!data) return null; // TODO: add not found state

  return (
    <Flex vertical gap={40} align="center" className="flex-auto">
      <QuestionDetailsCard market={data} />
    </Flex>
  );
};

export default QuestionPage;
