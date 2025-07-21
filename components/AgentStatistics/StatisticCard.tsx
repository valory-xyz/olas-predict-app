import { Col, Flex, Skeleton, Typography } from 'antd';
import styled from 'styled-components';

const { Text } = Typography;

const StatisticValue = styled.span`
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
`;

export const StatisticCard = ({
  title,
  value,
  isLoading,
}: {
  title: string | React.ReactNode;
  value: string;
  isLoading?: boolean;
}) => (
  <Col span={12}>
    <Flex vertical gap={8}>
      <Text type="secondary">{title}</Text>
      {isLoading ? <Skeleton.Input active /> : <StatisticValue>{value}</StatisticValue>}
    </Flex>
  </Col>
);
