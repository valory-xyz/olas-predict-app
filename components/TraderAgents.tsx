import { useQuery } from '@tanstack/react-query';
import { Button, Flex, Table, Typography } from 'antd';
import { getGlobal, getTraderAgents } from 'graphql/queries';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

import { Card } from 'components/shared/styles';
import { getAgentName } from 'utils/agents';

const { Title, Text, Paragraph } = Typography;

const ITEMS_PER_PAGE = 10;

export const TraderAgents = () => {
  const [page, setPage] = useState(1);

  const { data: globalData, isLoading: isGlobalLoading } = useQuery({
    queryKey: ['getGlobal'],
    queryFn: getGlobal,
  });

  const { data: agentsData, isLoading: isAgentsLoading } = useQuery({
    queryKey: ['getTraderAgents', page],
    queryFn: async () =>
      getTraderAgents({
        first: ITEMS_PER_PAGE,
        skip: (page - 1) * ITEMS_PER_PAGE,
      }),
  });

  const data = useMemo(() => {
    if (!agentsData) return [];
    return agentsData.traderAgents;
  }, [agentsData]);

  return (
    <Card type="ongoing">
      <Flex vertical gap={12}>
        <Flex justify="space-between">
          <Title level={4} className="m-0">
            Trader agents
          </Title>

          <Link href="/agents/trader-agents-breakdown">
            <Button>View breakdown</Button>
          </Link>
        </Flex>

        <Paragraph type="secondary" className="m-0">
          These agents watch for new questions being created on Omen by Creator agents. When they
          see one, they spring into action, and pay Mechs to go off and help them research the
          question, and come up with a probability and confidence score which they can use to make
          bets in the prediction market.
        </Paragraph>
      </Flex>
      <Table
        columns={[
          {
            title: 'Rank',
            key: 'rank',
            className: 'text-end',
            width: 50,
            render: (_, record, index) => (page - 1) * ITEMS_PER_PAGE + index + 1,
          },
          {
            title: 'Name',
            dataIndex: 'id',
            key: 'name',
            render: (id) => (
              <Link href={`/agents/${id}`}>
                <Flex gap={12}>
                  <Jazzicon diameter={24} seed={jsNumberForAddress(id)} />
                  <b>{getAgentName(id, 'trader')}</b>
                </Flex>
              </Link>
            ),
          },
          {
            title: 'Bets made',
            dataIndex: 'totalBets',
            key: 'bets',
            className: 'text-end',
            width: 105,
            render: (totalBets) => <Text type="secondary">{totalBets.toLocaleString()}</Text>,
          },
          // {
          //   title: 'Avg accuracy',
          //   dataIndex: 'accuracy',
          //   key: 'accuracy',
          //   className: 'text-end',
          //   width: 125,
          //   render: () =>
          //     isLoading ? (
          //       <Skeleton.Input size="small" active />
          //     ) : (
          //       <Text type="secondary">10%</Text>
          //     ),
          // },
          // {
          //   title: 'Total earnings',
          //   dataIndex: 'earnings',
          //   key: 'earnings',
          //   className: 'text-end',
          //   width: 130,
          //   render: () =>
          //     isLoading ? (
          //       <Skeleton.Input size="small" active />
          //     ) : (
          //       <Text type="secondary" strong>
          //         $1,385.00
          //       </Text>
          //     ),
          // },
        ]}
        loading={isGlobalLoading || isAgentsLoading}
        dataSource={data}
        pagination={{
          total: globalData?.global.totalActiveTraderAgents,
          showSizeChanger: false,
          onChange: setPage,
        }}
      />
    </Card>
  );
};
