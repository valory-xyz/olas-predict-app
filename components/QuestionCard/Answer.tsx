import { Flex, Typography } from 'antd';
import { ArrowUpRight, CheckCheck } from 'lucide-react';
import { AnswerType } from 'types';

import { REALITY_QUESTION_URL } from 'constants/index';

import { PredictedAnswer, ProofLink } from './styles';

const { Text } = Typography;

type AnswerProps = {
  answer: string;
  type: AnswerType;
  questionId?: string;
};

export const Answer = ({ answer, type, questionId }: AnswerProps) => {
  if (type === 'ongoing') {
    return (
      <PredictedAnswer type={type}>
        <Text type="secondary">Predicted answer - </Text>
        <b>{answer}</b>
      </PredictedAnswer>
    );
  }

  return (
    <Flex gap={16} align="center">
      <PredictedAnswer type={type}>
        <CheckCheck />
        <Text>
          Final answer - <b>{answer}</b>
        </Text>
      </PredictedAnswer>
      <ProofLink target="_blank" href={`${REALITY_QUESTION_URL}${questionId}`}>
        Proof <ArrowUpRight />
      </ProofLink>
    </Flex>
  );
};
