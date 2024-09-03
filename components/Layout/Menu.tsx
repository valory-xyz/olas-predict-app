import { Flex } from 'antd';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

const Card = styled(Flex)`
  padding: 24px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(3px);
  will-change: backdrop-filter;
`;

export const Menu = () => {
  return (
    <Card vertical gap={16}>
      <Image src={'/images/predict.svg'} width={40} height={40} alt="Predict icon" />
      <Link href="/questions">Questions</Link>
      <a
        target="_blank"
        className="flex items-center"
        href="https://github.com/valory-xyz/autonolas-operate-frontend?tab=readme-ov-file#add-your-own-agent"
      >
        Run your own agent <ArrowRight className="ml-4" size={20} />
      </a>
    </Card>
  );
};
