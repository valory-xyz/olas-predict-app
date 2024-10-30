import { Button } from 'antd';
import { Share2 } from 'lucide-react';
import { useState } from 'react';
import styled from 'styled-components';

interface ShareButtonProps {
  marketId?: string;
}

const StyledButton = styled(Button)`
  height: 100%;
  padding: 12px;
  color: DarkGrey;
  border-color: DarkGrey;
`;

const Notification = styled.div`
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  opacity: 0.9;
  transition: opacity 0.5s ease;
  z-index: 50;
`;

const ShareButton = ({ marketId }: ShareButtonProps) => {
  const [notificationVisible, setNotificationVisible] = useState(false);

  const handleShare = async (event: React.MouseEvent) => {
    event.preventDefault();
    const url = marketId
      ? `https://predict.olas.network/questions/${marketId}`
      : window.location.href;

    try {
      await navigator.clipboard.writeText(url);
      setNotificationVisible(true);

      setTimeout(() => {
        setNotificationVisible(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy: ', error);
    }
  };

  return (
    <>
      <StyledButton onClick={handleShare}>
        <Share2 />
      </StyledButton>
      {notificationVisible && <Notification>Link copied to clipboard</Notification>}
    </>
  );
};

export default ShareButton;
