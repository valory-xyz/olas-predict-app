import { Flex, Typography } from 'antd';
import dynamic from 'next/dynamic';

import { Card } from 'components/shared/styles';

const Chart = dynamic(() => import('./Chart'), {
  ssr: false,
});

const { Title } = Typography;

export const TraderAgentsBreakdown = () => {
  return (
    <Card type="ongoing" style={{ marginTop: 32 }}>
      <Flex vertical gap={12} justify="center" align="center">
        <Title level={4} className="m-0">
          Trader agents breakdown
        </Title>
        <Chart />
      </Flex>
    </Card>
  );
};
