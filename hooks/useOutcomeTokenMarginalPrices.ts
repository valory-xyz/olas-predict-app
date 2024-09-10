import { useQuery } from '@tanstack/react-query';
import { getMarginalPrice, getMarketTrades } from 'graphql/queries';
import { FixedProductMarketMaker, FpmmTrade_OrderBy, OrderDirection } from 'graphql/types';

import { publicClient } from 'constants/viemClient';

/**
 * Ongoing markets have this data in fixedProductMarketMakers, but closed ones don't.
 * Request it from the last trade
 */
export const useOutcomeTokenMarginalPrices = (market: FixedProductMarketMaker) => {
  const { id, outcomeTokenMarginalPrices } = market;
  const { data: trade, isLoading: isLastTradeLoading } = useQuery({
    queryKey: ['getLastMarketTrade', id],
    enabled: outcomeTokenMarginalPrices === null,
    queryFn: async () =>
      getMarketTrades({
        first: 1,
        fpmm: id,
        orderBy: FpmmTrade_OrderBy.CreationTimestamp,
        orderDirection: OrderDirection.Desc,
      }),
  });

  const { data: lastTradeMarginalPrices, isLoading: isLastTradeMarginalPricesLoading } = useQuery({
    queryKey: ['getLastTradeMarginalPrices', id],
    enabled: !!trade,
    queryFn: async (): Promise<string[] | undefined> => {
      if (!trade) return;

      const lastTradeTransactionHash = trade.fpmmTrades[0]?.transactionHash;
      if (!lastTradeTransactionHash) return;

      const receipt = await publicClient.getTransactionReceipt({ hash: lastTradeTransactionHash });
      if (!receipt) return;

      const marginalPricesResponse = await getMarginalPrice({
        id,
        block: Number(receipt.blockNumber),
      });
      return marginalPricesResponse.fixedProductMarketMaker.outcomeTokenMarginalPrices;
    },
  });

  return {
    data: outcomeTokenMarginalPrices || lastTradeMarginalPrices,
    isLoading: isLastTradeLoading || isLastTradeMarginalPricesLoading,
  };
};
