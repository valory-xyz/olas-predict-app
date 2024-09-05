import { Skeleton } from 'antd';
import Image from 'next/image';
import styled from 'styled-components';
import { AnswerType } from 'types';

import { QUESTION_IMAGE_SIZE } from 'constants/index';

export const Card = styled.div<{ type: AnswerType }>`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  padding: 32px;
  border-radius: 16px;
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
    background-image: ${({ type }) =>
      type === 'predicted_right'
        ? "url('images/questions/right.png')"
        : type === 'predicted_wrong'
          ? "url('images/questions/wrong.png')"
          : "url('images/questions/ongoing.png')"};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: ${({ type }) => (type === 'ongoing' ? 0.5 : 0.8)};
    z-index: 1;
  }

  & > * {
    position: relative;
    z-index: 2;
  }
`;

export const ThumbnailLoader = styled(Skeleton.Image)`
  &.ant-skeleton.ant-skeleton-element .ant-skeleton-image {
    width: ${QUESTION_IMAGE_SIZE}px;
    height: ${QUESTION_IMAGE_SIZE}px;
  }
`;

export const ThumbnailImage = styled(Image)`
  border-radius: 6px;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 400;
  line-height: 36px;
  letter-spacing: -0.03em;
  text-align: left;
`;

export const PredictedAnswer = styled.div<{ type: AnswerType }>`
  display: flex;
  align-items: center;
  gap: 8px;
  width: max-content;
  padding: 6px 16px 6px 16px;
  border-radius: 2px 0px 0px 0px;
  background: ${({ type }) =>
    type === 'predicted_right'
      ? 'rgba(0, 153, 65, 0.4)'
      : type === 'predicted_wrong'
        ? 'rgba(153, 0, 59, 0.4)'
        : 'rgba(255, 255, 255, 0.1)'};
`;

export const ProofLink = styled.a`
  display: flex;
  gap: 4px;
  align-items: center;
  color: rgba(255, 255, 255, 0.75);
`;

export const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  height: 24px;
  width: 100%;
  position: relative;
`;

export const ProgressBarLoader = styled(Skeleton.Input)`
  &.ant-skeleton.ant-skeleton-element .ant-skeleton-input {
    height: 24px;
    width: 100%;
  }
`;

export const RightLine = styled.div`
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
  }
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
