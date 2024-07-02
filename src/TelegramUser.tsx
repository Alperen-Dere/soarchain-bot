import React, { useEffect, useState } from 'react';
import window  from '@twa-dev/sdk';

interface User {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
}

const TelegramUser: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initTelegram = async () => {
      try {
        if (window) {
          window.ready();
          const userData = window.initDataUnsafe?.user;
          if (userData) {
            setUser(userData);
          }
        }
      } catch (error) {
        console.error('Failed to initialize Telegram:', error);
      }
    };

    initTelegram();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.first_name}!</h1>
      <p>User ID: {user.id}</p>
      {user.username && <p>Username: {user.username}</p>}
      <p>User: {JSON.stringify(user, null, 2)}</p>
    </div>
  );
};

export default TelegramUser;
