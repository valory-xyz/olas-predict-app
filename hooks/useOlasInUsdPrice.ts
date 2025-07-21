import { useQuery } from '@tanstack/react-query';

import { COINGECKO_OLAS_IN_USD_PRICE_URL, OLAS_ADDRESS } from 'constants/index';

type CoingeckoResponse = {
  [OLAS_ADDRESS]: { usd: number };
};

/**
 *
 * @returns Price in USD for 1 OLAS in wei representation
 */
export const useOlasInUsdPrice = () => {
  const { data, isLoading, isError } = useQuery<bigint | null>({
    queryKey: ['olasInUsd'],
    queryFn: async () => {
      const response = await fetch(COINGECKO_OLAS_IN_USD_PRICE_URL);
      if (!response.ok) throw new Error('Failed to fetch OLAS price');

      return response.json();
    },
    select: (result) => {
      const tokenData = (result as unknown as CoingeckoResponse)[OLAS_ADDRESS];

      if (tokenData && typeof tokenData.usd === 'number') {
        return BigInt(Math.floor(Number(tokenData.usd) * 1e18));
      }

      return null;
    },
  });

  return {
    data,
    isLoading,
    isError,
  };
};
