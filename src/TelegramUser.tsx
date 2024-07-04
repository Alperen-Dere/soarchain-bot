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
            const response = await fetch(`https://bot.soarchain.com/user/${userData.id}/`);
            if (response.ok) {
              const user = await response.json();
              setUser(user);
            } else if (response.status === 404) {
              // If user not found, create a new user in the backend
              const newUser = {
                telegramId: userData.id,
                firstName: userData.first_name,
                lastName: userData.last_name || 'Doe',
                earnings: 1000,
                tasks: [],
              };
              const createUserResponse = await fetch('https://bot.soarchain.com/user/2/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
              });
              if (createUserResponse.ok) {
                const createdUser = await createUserResponse.json();
                setUser(createdUser);
              } else {
                console.error('Failed to create new user:', createUserResponse.statusText);
              }
            } else {
              console.error('Failed to fetch user:', response.statusText);
            }
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
