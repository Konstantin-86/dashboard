import { useState, useEffect } from 'react';
import styles from '../../styles/UI/Notification.module.css';

type NotificationType = 'success' | 'error';

interface NotificationProps {
  message: string;
  delay?: number;
  type?: NotificationType;
  backgroundColor?: string;
  onClose?: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  delay = 3000,
  type = 'info',
  backgroundColor,
  onClose,
}) => {
  const [showInfo, setShowInfo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const handleClose = () => {
    setShowInfo(false);
    onClose?.();
  };

  const getBackgroundColor = () => {
    if (backgroundColor) return backgroundColor;
    switch (type) {
      case 'success':
        return 'var(--accent)';
      case 'error':
        return 'var(--error)';
      default:
        return 'var(--accent)';
    }
  };

  return (
    <div
      onClick={handleClose}
      className={showInfo ? styles.infoText : styles.infoTextHide}
      style={{ backgroundColor: getBackgroundColor() }}
    >
      {message}
    </div>
  );
};

export default Notification;
