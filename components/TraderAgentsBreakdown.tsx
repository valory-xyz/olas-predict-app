import { Flex, Typography } from 'antd';

import { Card } from 'components/shared/styles';

const { Title, Paragraph } = Typography;

export const TraderAgentsBreakdown = () => {
  return (
    <Card type="ongoing">
      <Flex vertical gap={12}>
        <Title level={4} className="m-0">
          Trader agents breakdown
        </Title>
        <Paragraph type="secondary" className="m-0">
          Hello world!
        </Paragraph>
      </Flex>
    </Card>
  );
};
