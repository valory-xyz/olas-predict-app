import { useQuery } from '@tanstack/react-query';
import { getMarketTrades } from 'graphql/queries';
import { formatUnits } from 'viem';

export const useMarketTrades = (marketId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['getMarketTrades', marketId],
    queryFn: async () =>
      getMarketTrades({
        first: 100,
        fpmm: marketId,
      }),
    select: (data) => {
      return data.fpmmTrades.reduce<Record<string, { agents: string[]; totalBets: number }>>(
        (res, trade) => {
          const answerIndex = trade.outcomeIndex;
          const betAmount =
            parseFloat(trade.collateralAmountUSD) - parseFloat(formatUnits(trade.feeAmount, 18));
          res[answerIndex].agents.push(trade.creator.id);
          res[answerIndex].totalBets += betAmount;

          return res;
        },
        { '0': { agents: [], totalBets: 0 }, '1': { agents: [], totalBets: 0 } },
      );
    },
  });

  return { data, isLoading };
};
