import { Flex } from 'antd';

import { TraderAgentsBreakdown } from 'components/TraderAgentsBreakdown/TraderAgentsBreakdown';
import { useScreen } from 'hooks/useScreen';

const TraderAgentsBreakdownPage = () => {
  const { isMobile } = useScreen();

  return (
    <Flex vertical gap={isMobile ? 16 : 40} align="center" className="flex-auto">
      <TraderAgentsBreakdown />
    </Flex>
  );
};

export default TraderAgentsBreakdownPage;
