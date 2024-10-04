import { Flex, Skeleton } from 'antd';

import { Card } from 'components/shared/styles';
import { useScreen } from 'hooks/useScreen';

export const LoaderCard = () => {
  const { isMobile } = useScreen();
  return (
    <Card type="ongoing">
      <Flex gap={24}>
        <Skeleton.Avatar size={isMobile ? 48 : 128} active />
        <Flex vertical gap={8}>
          <Skeleton.Input active className="mb-8" />
          <Skeleton.Input active size="small" />
          <Skeleton.Input active />
        </Flex>
      </Flex>
    </Card>
  );
};
