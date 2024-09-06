import { Flex, Skeleton } from 'antd';

import { Card, ThumbnailLoader } from './styles';

export const LoaderCard = () => {
  return (
    <Card type="ongoing">
      <Flex gap={24}>
        <ThumbnailLoader active />
        <Flex vertical gap={16} className="flex-auto">
          <Skeleton.Input active size="small" className="full-width" />
          <Skeleton.Input active size="small" className="full-width" />
          <Skeleton.Input active size="large" />
        </Flex>
      </Flex>
      <Flex vertical gap={14}>
        <Skeleton.Input size="small" active />
        <Skeleton.Input active className="full-width" />
      </Flex>
      <Skeleton.Button active size="large" className="full-width" />
    </Card>
  );
};
