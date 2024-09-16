import { Flex, Skeleton } from 'antd';
import Image from 'next/image';
import styled from 'styled-components';
import { AnswerType } from 'types';

import { CHART_HEIGHT, QUESTION_IMAGE_MOBILE_SIZE, QUESTION_IMAGE_SIZE } from 'constants/index';
import { COLOR, MEDIA_QUERY } from 'constants/theme';

const ANSWER_BACKGROUNDS_BY_TYPE = {
  predicted_right: 'rgba(0, 153, 65, 0.4)',
  predicted_wrong: 'rgba(153, 0, 59, 0.4)',
  ongoing: 'rgba(255, 255, 255, 0.1)',
};

const CARD_BACKGROUNDS_BY_TYPE = {
  predicted_right: "url('/images/questions/right.png')",
  predicted_wrong: "url('/images/questions/wrong.png')",
  ongoing: "url('/images/questions/ongoing.png')",
};

export const Card = styled.div<{ type: AnswerType }>`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  padding: 32px;
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: ${({ type }) => CARD_BACKGROUNDS_BY_TYPE[type]};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: ${({ type }) => (type === 'ongoing' ? 0.5 : 0.9)};
    z-index: 1;
  }

  & > * {
    position: relative;
    z-index: 2;
  }

  ${MEDIA_QUERY.mobile} {
    padding: 16px;
  }
`;

export const CardHeader = styled(Flex)`
  ${MEDIA_QUERY.mobile} {
    flex-direction: column;
  }
`;

export const QuestionTitle = styled.h2`
  font-size: 24px;
  font-weight: 400;
  line-height: 36px;
  letter-spacing: -0.03em;
  text-align: left;

  ${MEDIA_QUERY.mobile} {
    font-size: 18px;
    line-height: 27px;
  }
`;

export const PredictedAnswer = styled.div<{ type: AnswerType }>`
  display: flex;
  align-items: center;
  gap: 8px;
  width: max-content;
  padding: 6px 16px 6px 16px;
  border-radius: 2px 0px 0px 0px;
  background: ${({ type }) => ANSWER_BACKGROUNDS_BY_TYPE[type]};

  ${MEDIA_QUERY.mobile} {
    width: 100%;
    justify-content: center;
    .ant-typography {
      font-size: 16px;
    }
  }
`;

export const ProofLink = styled.a`
  display: flex;
  gap: 4px;
  align-items: center;
  color: ${COLOR.SECONDARY};
  z-index: 10;
`;

export const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  height: 24px;
  width: 100%;
  position: relative;
`;

export const LeftLine = styled.div<{ width: number; type: AnswerType }>`
  background: ${({ type }) =>
    type === 'ongoing'
      ? 'linear-gradient(180deg, #884DFF 0%, #6A38FF 100%)'
      : 'linear-gradient(180deg, #ffffff 0%, #bfbfbf 100%)'};
  height: 24px;
  padding: 0px 156px 0px 0px;
  border-radius: 2px;
  position: absolute;
  left: 0;
  width: ${({ width }) => width}%;
  display: flex;
  align-items: center;
  gap: 4px;
  z-index: 1;

  > span {
    font-weight: 500;
    position: absolute;
    top: 2px;
    left: 8px;
    color: white;
    mix-blend-mode: ${({ type }) => (type === 'ongoing' ? 'normal' : 'difference')};
  }
`;

export const RightLine = styled.div<{ type: AnswerType }>`
  background: rgba(0, 0, 0, 0.3);
  flex-grow: 1;
  height: 24px;
  border-radius: 2px;
  position: relative;

  > span {
    font-weight: 500;
    position: absolute;
    top: 2px;
    right: 8px;
    z-index: 1;
    mix-blend-mode: ${({ type }) => (type === 'ongoing' ? 'normal' : 'difference')};
  }
`;

export const ThumbnailLoader = styled(Skeleton.Image)`
  &.ant-skeleton.ant-skeleton-element .ant-skeleton-image {
    width: ${QUESTION_IMAGE_SIZE}px;
    height: ${QUESTION_IMAGE_SIZE}px;

    ${MEDIA_QUERY.mobile} {
      width: 100%;
      height: ${QUESTION_IMAGE_MOBILE_SIZE}px;
    }
  }
`;

export const ThumbnailImage = styled(Image)`
  height: ${QUESTION_IMAGE_SIZE}px;
  width: ${QUESTION_IMAGE_SIZE}px;
  border-radius: 6px;

  ${MEDIA_QUERY.mobile} {
    width: 100%;
    height: ${QUESTION_IMAGE_MOBILE_SIZE}px;
    object-fit: cover;
  }
`;

export const NoDataContainer = styled.div`
  display: flex;
  height: ${CHART_HEIGHT}px;
  align-items: center;
  justify-content: center;
`;
