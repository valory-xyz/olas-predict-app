import { Flex, Skeleton } from 'antd';

import { Card, ThumbnailLoader } from 'components/shared/styles';
import { useScreen } from 'hooks/useScreen';

export const LoaderCard = () => {
  const { isMobile } = useScreen();
  return (
    <Card type="ongoing">
      <Flex gap={24} justify="space-between">
        <Flex vertical gap={16} className="flex-auto">
          <Skeleton.Input active />
          {isMobile && <ThumbnailLoader active />}
          <Skeleton.Input active size="small" className="full-width" />
          <Skeleton.Input active size="small" className="full-width" />
          <Skeleton.Input active size="large" />
        </Flex>
        {!isMobile && <ThumbnailLoader active />}
      </Flex>
      <Skeleton.Input active />
      <Flex vertical gap={14}>
        <Skeleton.Input size="small" active />
        <Skeleton.Input active />
      </Flex>
      <Flex vertical gap={14}>
        <Skeleton.Input active size="small" className="full-width" />
        <Skeleton.Button active size="small" className="full-width" />
        <Skeleton.Input active size="small" className="full-width" />
      </Flex>
      <Skeleton.Button active size="large" className="full-width" />
    </Card>
  );
};
