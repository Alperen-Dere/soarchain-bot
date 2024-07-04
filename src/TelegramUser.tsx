import React, { useEffect } from 'react';
import window from '@twa-dev/sdk';

interface User {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  earnings: number;
  tasks: Task[];
}

interface Task {
  id: number;
  title: string;
  reward: number;
  completed: boolean;
  details: string;
  link: string;
  verified: boolean;
  icon: string;
}

interface TelegramUserProps {
  setUser: (user: User) => void;
}

const TelegramUser: React.FC<TelegramUserProps> = ({ setUser }) => {
  useEffect(() => {
    const initTelegram = async () => {
      try {
        if (window) {
          window.ready();
          const userData = window.initDataUnsafe?.user;
          if (userData) {
            setUser({
              ...userData,
              earnings: 0,
              tasks: []
            });
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
