import { Flex, Typography } from 'antd';
import { FixedProductMarketMaker } from 'graphql/types';
import Image from 'next/image';

import { CREATORS } from 'constants/index';

const { Text } = Typography;

type CreatorProps = {
  address: FixedProductMarketMaker['creator'];
};

export const Creator = ({ address }: CreatorProps) => {
  const creatorData = CREATORS[address.toLowerCase()];

  if (!creatorData) return null;

  return (
    <Flex vertical gap={12}>
      <Text type="secondary">Created by</Text>
      <Flex gap={6} align="center">
        <Image src={creatorData.image} width={24} height={24} alt={creatorData.name} />
        {creatorData.name}
      </Flex>
    </Flex>
  );
};
