import { Flex, Skeleton, Tag } from 'antd';
import { FixedProductMarketMaker } from 'graphql/types';
import { CircleDollarSign, HandCoins } from 'lucide-react';
import { AnswerType } from 'types';

import { COLOR } from 'constants/theme';
import { useAgentsBets } from 'hooks/useAgentsBets';

type TradesAndLiquidityProps = {
  marketId: FixedProductMarketMaker['id'];
  type: AnswerType;
};

export const TradesAndLiquidity = ({ marketId, type }: TradesAndLiquidityProps) => {
  const { data, isLoading } = useAgentsBets(marketId);

  if (isLoading) return <Skeleton.Input active size="large" />;
  if (!data) return null;

  const { trades, liquidity } = Object.values(data).reduce(
    (res, { agents, totalBets }) => {
      res.trades += agents.length;
      res.liquidity += totalBets;

      return res;
    },
    { trades: 0, liquidity: 0 },
  );

  const iconProps = {
    size: 20,
    color: type === 'ongoing' ? COLOR.PRIMARY : COLOR.TEXT_PRIMARY,
  };

  return (
    <Flex gap={12} wrap>
      <Tag icon={<HandCoins {...iconProps} />}>{`${trades} trade${trades > 1 ? 's' : ''}`}</Tag>
      <Tag icon={<CircleDollarSign {...iconProps} />}>{`$${liquidity.toFixed(2)} liquidity`}</Tag>
    </Flex>
  );
};
