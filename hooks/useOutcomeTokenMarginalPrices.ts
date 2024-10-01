import { useQuery } from '@tanstack/react-query';
import { getMarketLiquidity } from 'graphql/queries';
import { FixedProductMarketMaker, FpmmLiquidity_OrderBy, OrderDirection } from 'graphql/types';
import { useMemo } from 'react';

function convertLiquidityToMarginalPrices(values: string[]) {
  const bigIntValues = values.map((value) => BigInt(value));
  const total = bigIntValues.reduce((acc, value) => acc + value, BigInt(0));
  const prices = bigIntValues.map((value) => (Number(value) / Number(total)).toFixed(18));
  return prices;
}

/**
 * Ongoing markets have this data in fixedProductMarketMakers, but closed ones don't.
 * Request it from the last trade
 */
export const useOutcomeTokenMarginalPrices = (market: FixedProductMarketMaker) => {
  const { id, outcomeTokenMarginalPrices } = market;
  const { data: lastLiquidity, isLoading: isLastLiquidityLoading } = useQuery({
    queryKey: ['getLastMarketLiquidity', id],
    enabled: !outcomeTokenMarginalPrices,
    queryFn: async () =>
      getMarketLiquidity({
        first: 1,
        fpmm: id,
        orderBy: FpmmLiquidity_OrderBy.CreationTimestamp,
        orderDirection: OrderDirection.Desc,
      }),
  });

  const lastLiquidityPrices = useMemo(() => {
    const lastLiquidityTokenAmounts = lastLiquidity?.fpmmLiquidities[0].outcomeTokenAmounts;
    if (!lastLiquidityTokenAmounts) return undefined;
    return convertLiquidityToMarginalPrices(
      // The probabilities are always reversed
      [...lastLiquidityTokenAmounts].reverse(),
    );
  }, [lastLiquidity]);

  return {
    data: outcomeTokenMarginalPrices || lastLiquidityPrices,
    isLoading: isLastLiquidityLoading,
  };
};
