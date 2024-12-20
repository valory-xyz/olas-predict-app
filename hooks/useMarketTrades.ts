import { useQuery } from '@tanstack/react-query';
import { getMarketTrades } from 'graphql/queries';
import { FpmmTrade_OrderBy, OrderDirection } from 'graphql/types';

export const useMarketTrades = (marketId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['getMarketTrades', marketId],
    queryFn: async () =>
      await getMarketTrades({
        first: 1000,
        fpmm: marketId,
        orderBy: FpmmTrade_OrderBy.CreationTimestamp,
        orderDirection: OrderDirection.Desc,
      }),
  });

  return { data, isLoading };
};
