import { Button, Typography } from 'antd';
import { AlertTriangle, Frown, LucideProps, Unplug } from 'lucide-react';
import { useRouter } from 'next/router';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import styled from 'styled-components';

import { Card } from 'components/shared/styles';
import { QUESTIONS_PAGE_URL } from 'constants/index';
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
  button: {
    text: string;
    onClick: () => void;
  };
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

export const ErrorState = ({ title, description, button, icon }: ErrorStateProps) => {
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
        <Button size="large" onClick={button.onClick}>
          {button.text}
        </Button>
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
      button={{ text: 'Refresh page', onClick: () => router.reload() }}
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
      button={{ text: 'Refresh page', onClick: () => router.reload() }}
      icon={Unplug}
    />
  );
};

export const QuestionNotFoundError = () => {
  const router = useRouter();
  return (
    <ErrorState
      title="404 | Question not found"
      description="The question you’re looking for doesn’t exist or was deleted."
      button={{ text: 'Go home', onClick: () => router.push(QUESTIONS_PAGE_URL) }}
      icon={Frown}
    />
  );
};
