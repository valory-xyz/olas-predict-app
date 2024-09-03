import { Flex } from 'antd';
import styled from 'styled-components';

const Title = styled.h1`
  font-family: 'Anonymous Pro';
  font-size: 24px;
  font-style: italic;
  font-weight: 700;
  line-height: 150%; /* 36px */
`;

const QuestionsPage = () => {
  return (
    <Flex vertical gap={40} align="center">
      <Title>AI agents predict the future.</Title>
    </Flex>
  );
};

export default QuestionsPage;
