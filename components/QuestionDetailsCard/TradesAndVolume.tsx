import { Flex, Skeleton, Tag } from 'antd';
import { FixedProductMarketMaker } from 'graphql/types';
import { CircleDollarSign, HandCoins } from 'lucide-react';
import { AnswerType } from 'types';

import { COLOR } from 'constants/theme';
import { useAgentsBets } from 'hooks/useAgentsBets';

type TradesAndVolumeProps = {
  marketId: FixedProductMarketMaker['id'];
  usdVolume: FixedProductMarketMaker['usdVolume'];
  type: AnswerType;
};

export const TradesAndVolume = ({ marketId, usdVolume, type }: TradesAndVolumeProps) => {
  const { data, isLoading } = useAgentsBets(marketId);

  if (isLoading) return <Skeleton.Input active size="large" />;
  if (!data) return null;

  const trades = Object.values(data).reduce((sum, { agents }) => (sum += agents.length), 0);

  const iconProps = {
    size: 20,
    color: type === 'ongoing' ? COLOR.PRIMARY : COLOR.TEXT_PRIMARY,
  };

  return (
    <Flex gap={12} wrap>
      <Tag icon={<HandCoins {...iconProps} />}>{`${trades} trade${trades > 1 ? 's' : ''}`}</Tag>
      <Tag
        icon={<CircleDollarSign {...iconProps} />}
      >{`$${Number(usdVolume).toFixed(2)} volume`}</Tag>
    </Flex>
  );
};
