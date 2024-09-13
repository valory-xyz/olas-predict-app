import { FixedProductMarketMaker } from 'graphql/types';
import { AnswerType } from 'types';

export const getPredictedAnswerIndex = (
  outcomeTokenMarginalPrices: FixedProductMarketMaker['outcomeTokenMarginalPrices'],
) => {
  if (!outcomeTokenMarginalPrices) return null;

  // Find the index of the maximum value in outcomeTokenMarginalPrices
  return outcomeTokenMarginalPrices
    .map((price) => parseFloat(price))
    .reduce((maxIdx, currentPrice, idx, arr) => (currentPrice > arr[maxIdx] ? idx : maxIdx), 0);
};

export const getAnswerType = (
  predictedAnswerIndex: number | null,
  currentAnswerIndex: number | null,
): AnswerType => {
  if (currentAnswerIndex === null) return 'ongoing';
  if (predictedAnswerIndex === currentAnswerIndex) return 'predicted_right';
  return 'predicted_wrong';
};

export const getAnswer = (
  predictedAnswerIndex: number | null,
  currentAnswerIndex: number | null,
  outcomes: FixedProductMarketMaker['outcomes'],
): string => {
  if (!outcomes) return 'NA';
  if (currentAnswerIndex !== null) return outcomes[currentAnswerIndex];
  if (predictedAnswerIndex !== null) return outcomes[predictedAnswerIndex];
  return 'NA';
};

export const convertToPercentage = (value: string): number => +(parseFloat(value) * 100).toFixed(2);
