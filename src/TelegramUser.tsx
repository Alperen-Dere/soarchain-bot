import React, { useEffect } from 'react';
import window from '@twa-dev/sdk';

interface User {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  earnings: number;
}

interface TelegramUserProps {
  setUser: (user: User) => void;
}

const TelegramUser: React.FC<TelegramUserProps> = ({ setUser }) => {
  useEffect(() => {
    const initTelegram = async () => {
      try {
        console.log('Initializing Telegram...');
        if (window) {
          console.log('Telegram window ready');
          window.ready();
          const userData = window.initDataUnsafe?.user;
          console.log('User data:', userData);
          if (userData) {
            setUser({ ...userData, earnings: 0 }); // Add default earnings value
          }
        }
      } catch (error) {
        console.error('Failed to initialize Telegram:', error);
      }
    };

    initTelegram();
  }, [setUser]);

  return null;
};

export default TelegramUser;
