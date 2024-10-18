import { useQuery } from '@tanstack/react-query';
import { Flex, Table, Typography } from 'antd';
import { getCreatorAgents } from 'graphql/queries';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

import { Card } from 'components/shared/styles';
import { GNOSIS_SCAN_URL } from 'constants/index';
import { generateName } from 'utils/agents';
import { getTimeAgo } from 'utils/time';

const { Title, Text, Paragraph } = Typography;

export const CreatorAgents = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['getCreatorAgents'],
    queryFn: getCreatorAgents,
  });

  return (
    <Card type="ongoing">
      <Flex vertical gap={12}>
        <Title level={4} className="m-0">
          Creator agents
        </Title>
        <Paragraph type="secondary" className="m-0">
          These agents listen for potential prediction opportunies, process those requests and
          deploy predictions on the Omen protocol. They also seed the market with liquidity.
        </Paragraph>
      </Flex>
      <Table
        columns={[
          {
            title: 'Rank',
            key: 'rank',
            className: 'text-end',
            width: 50,
            render: (_, record, index) => index + 1,
          },
          {
            title: 'Name',
            dataIndex: 'id',
            key: 'name',
            render: (id) => (
              <a
                href={`${GNOSIS_SCAN_URL}/address/${id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Flex gap={12}>
                  <Jazzicon diameter={24} seed={jsNumberForAddress(id)} />
                  <b>{generateName(id)}</b>
                </Flex>
              </a>
            ),
          },
          {
            title: 'Age',
            dataIndex: 'blockTimestamp',
            key: 'blockTimestamp',
            className: 'text-center',
            width: 120,
            render: (blockTimestamp) => (
              <Text type="secondary">{getTimeAgo(blockTimestamp * 1000, false)}</Text>
            ),
          },
          {
            title: 'Questions created',
            dataIndex: 'totalQuestions',
            key: 'totalQuestions',
            className: 'text-end',
            width: 160,
            render: (totalQuestions) => (
              <Text type="secondary">{totalQuestions.toLocaleString()}</Text>
            ),
          },
        ]}
        loading={isLoading}
        dataSource={data?.creatorAgents}
        pagination={false}
      />
    </Card>
  );
};
