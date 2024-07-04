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
  backendAPI: string;
}

const fetchWithLogging = async (url: string, options: RequestInit = {}) => {
  console.log(`Request: ${url} ${JSON.stringify(options)}`);
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(`Response: ${url} ${JSON.stringify(data)}`);
  return data;
};

const TelegramUser: React.FC<TelegramUserProps> = ({ setUser, backendAPI }) => {
  useEffect(() => {
    const initTelegram = async () => {
      try {
        if (window) {
          window.ready();
          const userData = window.initDataUnsafe?.user;
          if (userData) {
            

            const data = await fetchWithLogging(`${backendAPI}/user/${userData.id}`, {});
            if (data.error === 'User not found') {
              const createdUser = await fetchWithLogging(`${backendAPI}/user`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  telegramId: userData.id,
                  firstName: userData.first_name,
                  lastName: userData.last_name || '',
                  earnings: 0,
                  tasks: [],
                }),
              });
              setUser(createdUser);
            } else {
              setUser(data);
            }
          }
        }
      } catch (error) {
        console.error('Failed to initialize Telegram:', error);
      }
    };

    initTelegram();
  }, [setUser, backendAPI]);

  return null;
};

export default TelegramUser;
