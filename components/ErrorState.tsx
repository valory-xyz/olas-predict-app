import { Button, Flex, Typography } from 'antd';
import { AlertTriangle, Frown, LucideProps, Unplug } from 'lucide-react';
import { useRouter } from 'next/router';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import styled from 'styled-components';

import { Card } from 'components/shared/styles';
import { MEDIA_QUERY } from 'constants/theme';
import { useScreen } from 'hooks/useScreen';

const { Title, Paragraph } = Typography;

const StyledCard = styled(Card)`
  margin: auto 0;

  ${MEDIA_QUERY.mobile} {
    margin: 0;
    flex: auto;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 350px;
  align-items: center;
  align-self: center;
  padding: 24px;

  > svg {
    margin-bottom: 16px;
  }

  ${MEDIA_QUERY.mobile} {
    margin: auto;
    padding: 8px;
  }
`;

type IconType = ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;

type ErrorStateProps = {
  title: string;
  description: string;
  buttons: {
    text: string;
    onClick: () => void;
  }[];
  icon: IconType;
};

const GradientIcon = ({ size, Icon }: { size: number; Icon: IconType }) => (
  <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
    <Icon size={size} stroke="url(#gradient)" />
    <defs>
      <linearGradient
        id="gradient"
        x1="50%"
        y1="0"
        x2="50%"
        y2="35%"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="white" />
        <stop offset="80%" stopColor="#BFBFBF" />
      </linearGradient>
    </defs>
  </svg>
);

export const ErrorState = ({ title, description, buttons, icon }: ErrorStateProps) => {
  const { isMobile } = useScreen();
  return (
    <StyledCard type="ongoing">
      <Content>
        <GradientIcon size={isMobile ? 56 : 80} Icon={icon} />
        <Title level={isMobile ? 5 : 4} className="m-0">
          {title}
        </Title>
        <Paragraph type="secondary" className="text-center">
          {description}
        </Paragraph>
        <Flex gap={16} wrap align="center" justify="center">
          {buttons.map((button, index) => (
            <Button key={index} size="large" onClick={button.onClick}>
              {button.text}
            </Button>
          ))}
        </Flex>
      </Content>
    </StyledCard>
  );
};

export const CommonError = () => {
  const router = useRouter();
  return (
    <ErrorState
      title="Error"
      description="Something went wrong. Please, try refreshing the page."
      buttons={[{ text: 'Refresh page', onClick: () => router.reload() }]}
      icon={AlertTriangle}
    />
  );
};

export const LoadingError = () => {
  const router = useRouter();
  return (
    <ErrorState
      title="Error loading data"
      description="Something went wrong while loading data. Please, try refreshing the page."
      buttons={[{ text: 'Refresh page', onClick: () => router.reload() }]}
      icon={Unplug}
    />
  );
};

export const QuestionNotFoundError = () => {
  const router = useRouter();
  return (
    <ErrorState
      title="404 | Question not found"
      description="The question you're looking for doesn't exist or was deleted."
      buttons={[{ text: 'Go home', onClick: () => router.push('/questions') }]}
      icon={Frown}
    />
  );
};

export const AgentNotFoundError = () => {
  const router = useRouter();
  return (
    <ErrorState
      title="404 | Agent not found"
      description="This address probably doesn't belong to an Olas agent."
      buttons={[
        { text: 'Go home', onClick: () => router.push('/questions') },
        { text: 'See existing agents', onClick: () => router.push('/agents') },
      ]}
      icon={Frown}
    />
  );
};
