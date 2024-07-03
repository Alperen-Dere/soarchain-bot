import React, { useState } from 'react';
import './App.css';
import { soarchainLogo, dollarCoin } from './images';
import Info from './icons/Info';
import Settings from './icons/Settings';
import Coins from './icons/Coins';
import Friends from './icons/Friends';
import HomePage from './HomePage';
import SpecialGiveawayPage from './SpecialGiveawayPage';
import LetsSoarPage from './LetsSoarPage';
import TelegramUser from './TelegramUser';

interface User {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  earnings: number;
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<User | null>(null);

  const handleTaskCompletion = async () => {
    if (user) {
      // Handle task completion logic
    }
  };

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Join the Soarchain Telegram Group', reward: 5000, completed: false, details: 'Become part of our community to stay updated with all the latest news and developments.', link: 'https://t.me/soarchain', verified: false },
    { id: 2, title: 'Follow & Engage on Twitter', reward: 5000, completed: false, details: 'Follow our official account, retweet the airdrop announcement, and tag a friend. Help us spread the word and grow our community!', link: 'https://twitter.com/soarchain', verified: false },
    { id: 3, title: 'Complete the Registration Form', reward: 10000, completed: false, details: 'Provide your details through our form to ensure you’re eligible for token distribution. Make sure you enter correct information for seamless participation.', link: '#', verified: false },
    { id: 4, title: 'Invite Friends', reward: 2000, completed: false, details: 'Invite your friends to join Soarchain and earn rewards when they sign up using your referral link.', link: '', verified: false }
  ]);

  const handleLinkClick = (taskId: number) => {
    setTasks(prevTasks => prevTasks.map(task => {
      if (task.id === taskId) {
        return { ...task, verified: true };
      }
      return task;
    }));
  };

  const handleInviteFriends = () => {};

  return (
    <div className="bg-black flex justify-center">
      <TelegramUser setUser={setUser} />
      <div className="w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl">
        <div className="px-4 z-10 header">
          <div className="flex items-center justify-between pt-4 logo-title">
            <img src={soarchainLogo} alt="Soarchain Logo" />
            <p>Soarchain</p>
          </div>
          <div className="flex items-center justify-between space-x-4 mt-4 earnings-container">
            <div className="flex items-center">
              <div className="text-center">
                <p className="text-xs text-[#85827d] font-medium">Earnings</p>
                <div className="flex items-center justify-center space-x-1">
                  <p className="text-sm">{user ? user.earnings.toLocaleString() : 0} Coins</p>
                  <Info size={20} className="text-[#43433b]" />
                </div>
              </div>
            </div>
            {user && (
              <div className="flex items-center">
                <div className="text-center">
                  <p className="text-xs text-[#85827d] font-medium">User</p>
                  <p className="text-sm">{user.first_name} {user.last_name}</p>
                </div>
              </div>
            )}
            <div className="flex items-center">
              <div className="text-center">
                <p className="text-xs text-[#85827d] font-medium">League</p>
                <p className="text-sm">TBD</p>
              </div>
            </div>
            <Settings className="text-white" />
          </div>
        </div>

        <div className="flex-grow mt-4 bg-[#8e2de2] rounded-t-[48px] relative top-glow z-0">
          <div className="absolute top-[2px] left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px] overflow-auto">
            {currentPage === 'home' && <HomePage tasks={tasks} handleLinkClick={handleLinkClick} handleTaskCompletion={handleTaskCompletion} handleInviteFriends={handleInviteFriends} />}
            {currentPage === 'specialGiveaway' && <SpecialGiveawayPage />}
            {currentPage === 'letsSoar' && <LetsSoarPage />}
          </div>
        </div>
      </div>

      {/* Bottom fixed div */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#3b3b3b] flex justify-around items-center z-50 rounded-3xl text-xs bottom-nav">
        <div className={`text-center w-1/3 ${currentPage === 'home' ? 'active' : ''}`} onClick={() => setCurrentPage('home')}>
          <Coins className="w-8 h-8 mx-auto" />
          <p className="mt-1">Earn Now</p>
        </div>
        <div className={`text-center w-1/3 ${currentPage === 'specialGiveaway' ? 'active' : ''}`} onClick={() => setCurrentPage('specialGiveaway')}>
          <img src={dollarCoin} alt="Special Giveaway" className="w-8 h-8 mx-auto" />
          <p className="mt-1">Special Giveaway</p>
        </div>
        <div className={`text-center w-1/3 ${currentPage === 'letsSoar' ? 'active' : ''}`} onClick={() => setCurrentPage('letsSoar')}>
          <Friends className="w-8 h-8 mx-auto" />
          <p className="mt-1">Let's Soar</p>
        </div>
      </div>
    </div>
  );
};

export default App;
