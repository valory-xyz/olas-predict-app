import { useQuery } from '@tanstack/react-query';
import { getMarketTrades } from 'graphql/queries';
import { FpmmTrade_OrderBy } from 'graphql/types';

export const useMarketTrades = (marketId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['getMarketTrades', marketId],
    queryFn: async () =>
      getMarketTrades({
        first: 1000,
        fpmm: marketId,
        orderBy: FpmmTrade_OrderBy.CreationTimestamp,
      }),
  });

  return { data, isLoading };
};
