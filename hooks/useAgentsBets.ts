import { TradeType } from 'graphql/types';
import { useMemo } from 'react';
import { formatUnits } from 'viem';

import { useMarketTrades } from './useMarketTrades';

type AgentsBets = Record<string, { agents: string[]; totalBets: number }>;
type AgentsBetsSet = Record<string, { agents: Set<string>; totalBets: number }>;

export const useAgentsBets = (marketId: string) => {
  const { data: tradesData, isLoading } = useMarketTrades(marketId);

  const data = useMemo(() => {
    if (!tradesData) {
      return { '0': { agents: [], totalBets: 0 }, '1': { agents: [], totalBets: 0 } };
    }

    const agentsTrades = tradesData.fpmmTrades.reduce<AgentsBetsSet>(
      (res, trade) => {
        const answerIndex = trade.outcomeIndex;
        // add agent address
        res[answerIndex].agents.add(trade.creator.id.toLowerCase());
        // add trade value
        const betAmountWithoutFee =
          parseFloat(trade.collateralAmountUSD) - parseFloat(formatUnits(trade.feeAmount, 18));
        if (trade.type === TradeType.Buy) {
          res[answerIndex].totalBets += betAmountWithoutFee;
        }
        if (trade.type === TradeType.Sell) {
          res[answerIndex].totalBets -= betAmountWithoutFee;
        }

        return res;
      },
      { '0': { agents: new Set(), totalBets: 0 }, '1': { agents: new Set(), totalBets: 0 } },
    );

    // Convert to AgentsBets
    const formattedAgentsTrades: AgentsBets = Object.keys(agentsTrades).reduce((acc, key) => {
      acc[key] = {
        agents: Array.from(agentsTrades[key].agents),
        totalBets: agentsTrades[key].totalBets,
      };
      return acc;
    }, {} as AgentsBets);

    return formattedAgentsTrades;
  }, [tradesData]);

  return { data, isLoading };
};
