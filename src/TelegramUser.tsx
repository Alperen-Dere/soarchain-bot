import React, { useEffect } from 'react';
import window from '@twa-dev/sdk';
import { soarchainLogo, telegram, twitter } from './images'; // Ensure these images are imported correctly

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

interface User {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  earnings: number;
  tasks: Task[];
}

interface TelegramUserProps {
  setUser: (user: User) => void;
}

export const fetchTasks = (): Promise<Task[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'Join our TG channel', reward: 5000, completed: false, details: 'Become part of our community to stay updated with all the latest news and developments.', link: 'https://t.me/soarchain_tg', verified: false, icon: telegram },
        { id: 2, title: 'Follow our X account', reward: 5000, completed: false, details: 'Follow our official account, retweet the airdrop announcement, and tag a friend. Help us spread the word and grow our community!', link: 'https://twitter.com/soar_chain', verified: false, icon: twitter },
        { id: 3, title: 'Complete the Registration Form', reward: 10000, completed: false, details: 'Provide your details through our form to ensure you’re eligible for token distribution. Make sure you enter correct information for seamless participation.', link: '#', verified: false, icon: soarchainLogo },       
      ]);
    }, 1000);
  });
};

const TelegramUser: React.FC<TelegramUserProps> = ({ setUser }) => {
  useEffect(() => {
    const initTelegram = async () => {
      try {
        if (window) {
          window.ready();
          const userData = window.initDataUnsafe?.user;
          if (userData) {
            const tasks = await fetchTasks();
            const user: User = {
              id: userData.id,
              first_name: userData.first_name,
              last_name: userData.last_name || '',
              username: userData.username || '',
              earnings: 0, // Initialize earnings to 0 
              tasks: tasks // Set default tasks
            };
            setUser(user);
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
