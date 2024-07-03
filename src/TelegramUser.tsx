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
  setLoading: (loading: boolean) => void;
}

const TelegramUser: React.FC<TelegramUserProps> = ({ setUser, setLoading }) => {
  useEffect(() => {
    const initTelegram = async () => {
      try {
        console.log('Initializing Telegram...');
        setLoading(true);
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
      } finally {
        setLoading(false);
        console.log('Loading complete');
      }
    };

    initTelegram();
  }, [setUser, setLoading]);

  return null;
};

export default TelegramUser;
