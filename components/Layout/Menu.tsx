import { Dropdown, Flex } from 'antd';
import { ArrowRight, Menu as MenuIcon, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import { MENU_MAX_WIDTH } from 'constants/index';
import { COLOR, MEDIA_QUERY } from 'constants/theme';
import { useDropdown } from 'hooks/useDropdown';

const Card = styled(Flex)`
  max-width: ${MENU_MAX_WIDTH}px;
  border-radius: 12px;
  background: ${COLOR.BLACK_TRANSPARENT_20};
  backdrop-filter: blur(3px);
  will-change: backdrop-filter;
  padding: 24px;
`;

const MobileCard = styled(Flex)<{ isOpen?: boolean }>`
  max-width: 100%;
  border-radius: ${({ isOpen }) => (isOpen ? '12px 12px 0 0' : '12px')};
  transition: border-radius 0.3s ease;
  background: ${COLOR.BLACK_TRANSPARENT_30};
  backdrop-filter: blur(3px);
  will-change: backdrop-filter;
  padding: 12px 24px;
  margin: 56px 0 40px;
  position: relative;
  z-index: 1050;
`;

const MobileCardContent = styled(MobileCard)`
  margin: -4px 0 0;
  border-radius: 0 0 12px 12px;

  ${MEDIA_QUERY.laptop} {
    font-size: 20px;
  }
`;

const Backdrop = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${COLOR.BLACK_TRANSPARENT_50};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
  backdrop-filter: ${({ isOpen }) => (isOpen ? 'blur(10px)' : 'none')};
  -webkit-backdrop-filter: ${({ isOpen }) => (isOpen ? 'blur(10px)' : 'none')};
  will-change: backdrop-filter;
  transition: opacity 0.3s ease;
  z-index: 1000;
`;

const MenuContent = ({ closeDropdown }: { closeDropdown?: () => void }) => (
  <>
    <Link href={'/questions'} onClick={closeDropdown}>
      Questions
    </Link>
    <Link href={'/agents'} onClick={closeDropdown}>
      Agents
    </Link>
    <Link href={'/articles'} onClick={closeDropdown}>
      Articles
    </Link>
    <a
      target="_blank"
      className="flex items-center"
      href=" https://olas.network/operate"
      onClick={closeDropdown}
    >
      Run your own agent <ArrowRight className="ml-4" size={20} />
    </a>
  </>
);

export const Menu = () => {
  return (
    <Card vertical gap={16}>
      <Image src={'/images/predict.svg'} width={40} height={40} alt="Predict icon" />
      <MenuContent />
    </Card>
  );
};

export const MobileMenu = () => {
  const { isOpen, toggleDropdown, closeDropdown } = useDropdown();

  return (
    <>
      <Dropdown
        open={isOpen}
        onOpenChange={toggleDropdown}
        dropdownRender={() => (
          <MobileCardContent vertical gap={16}>
            <MenuContent closeDropdown={closeDropdown} />
          </MobileCardContent>
        )}
      >
        <MobileCard vertical gap={16} isOpen={isOpen}>
          <Flex align="center" justify="space-between">
            <Image src={'/images/predict.svg'} width={40} height={40} alt="Predict icon" />
            {isOpen ? <X /> : <MenuIcon />}
          </Flex>
        </MobileCard>
      </Dropdown>
      <Backdrop isOpen={isOpen} onClick={closeDropdown} />
    </>
  );
};
