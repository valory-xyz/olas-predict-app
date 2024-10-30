import { useQuery } from '@tanstack/react-query';
import { Flex } from 'antd';
import { getTraderAgent } from 'graphql/queries';
import { useRouter } from 'next/router';

import { AgentActivity } from 'components/Activity/AgentActivity';
import { AgentDetailsCard } from 'components/AgentDetailsCard';
import { LoaderCard } from 'components/AgentDetailsCard/LoaderCard';
import { AgentStatistics } from 'components/AgentStatistics';
import { AgentNotFoundError, LoadingError } from 'components/ErrorState';

const AgentPage = () => {
  const router = useRouter();
  const id = router.query.id;
  const { data, isLoading, isFetched, isError } = useQuery({
    enabled: !!id,
    queryKey: ['getAgent', id],
    queryFn: async () => getTraderAgent({ id: `${id}`.toLowerCase() }),
    select: (data) => data.traderAgent,
  });

  if (isLoading)
    return (
      <Flex vertical>
        <LoaderCard />
      </Flex>
    );

  if (isError) return <LoadingError />;

  if (isFetched) {
    if (!data) return <AgentNotFoundError />;

    return (
      <Flex vertical gap={40} align="center" className="flex-auto">
        <AgentDetailsCard agent={data} />
        <AgentStatistics agent={data} />
        <AgentActivity agentId={data.id} />
      </Flex>
    );
  }
  return null;
};

export default AgentPage;
