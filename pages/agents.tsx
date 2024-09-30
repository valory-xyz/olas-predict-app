import { Flex } from 'antd';

import { TraderAgents } from 'components/TraderAgents';
import { useScreen } from 'hooks/useScreen';

const AgentsPage = () => {
  const { isMobile } = useScreen();

  return (
    <Flex vertical gap={isMobile ? 16 : 40} align="center" className="flex-auto">
      <TraderAgents />
    </Flex>
  );
};

export default AgentsPage;
