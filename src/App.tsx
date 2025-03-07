import React, { useState, useEffect } from 'react';
import './App.css';
import { soarchainLogo, dollarCoin } from './images';
import Info from './icons/Info';
import Settings from './icons/Settings';
import Coins from './icons/Coins';
import Friends from './icons/Friends';
import SpecialGiveawayPage from './SpecialGiveawayPage';
import LetsSoarPage from './LetsSoarPage';
import TelegramUser from './TelegramUser';
import WebApp from '@twa-dev/sdk';

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

const levelNames = [
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Diamond",
  "Epic",
  "Legendary",
  "Master",
  "GrandMaster",
  "Lord"
];

const levelMinPoints = [
  0,
  5000,
  25000,
  100000,
  1000000,
  2000000,
  10000000,
  50000000,
  100000000,
  1000000000
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [earnings, setEarnings] = useState(0);
  const [levelIndex, setLevelIndex] = useState(0);

  useEffect(() => {
    if (user) {
      setTasks(user.tasks);
      setEarnings(user.earnings);
    }
  }, [user]);

  useEffect(() => {
    const totalEarnings = tasks.reduce((sum, task) => (task.verified ? sum + task.reward : sum), 0);
    setEarnings(totalEarnings);
  }, [tasks]);

  useEffect(() => {
    for (let i = levelMinPoints.length - 1; i >= 0; i--) {
      if (earnings >= levelMinPoints[i]) {
        setLevelIndex(i);
        break;
      }
    }
  }, [earnings]);

  const handleTaskLinkClick = (taskId: number, link: string) => {
    window.open(link, '_blank');
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
  };

  const handleTaskVerification = (taskId: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, verified: true } : task
      )
    );

    const task = tasks.find(task => task.id === taskId);
    if (task) {
      setEarnings(prevEarnings => prevEarnings + task.reward);
      // Update backend
      if (user) {
        fetch(`${process.env.REACT_APP_BACKEND_API_URL}/user/${user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            earnings: earnings + task.reward,
            tasks: tasks.map(task =>
              task.id === taskId ? { ...task, verified: true } : task
            )
          }),
        })
          .then(response => response.json())
          .then(data => {
            setUser(data);
          })
          .catch(error => {
            console.error('Error updating user data:', error);
          });
      }
    }
  };

  const handleInviteFriends = () => {
    if (user) {
      const userId = user.id;
      WebApp.openTelegramLink(
        `https://t.me/share/url?url=t.me/soarc_bot/SoarchainLaunch?start=fren=${userId}`
      );
      setEarnings(prevEarnings => prevEarnings + 25000); // Add reward for inviting friends
    }
  };

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="bg-black flex justify-center">
      <TelegramUser setUser={setUser} />
      <div className="w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl">
        <div className="px-4 z-10 header">
          <div className="flex items-center justify-between pt-4 logo-title">
            <img src={soarchainLogo} alt="Soarchain Logo" className="soarchain-logo" />
            <p>Soarchain</p>
          </div>
          <div className="flex items-center justify-between space-x-4 mt-4 earnings-container">
            <div className="flex items-center">
              <div className="text-center">
                <p className="text-xs text-[#85827d] font-medium">Earnings</p>
                <div className="flex items-center justify-center space-x-1">
                  <img src={dollarCoin} alt="Earnings" className="coin-icon" />
                  <p className="text-sm">{earnings.toLocaleString()} Coins</p>
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
                <p className="text-sm">{levelNames[levelIndex]}</p>
              </div>
            </div>
            <Settings className="text-white" />
          </div>
        </div>

        <div className="flex-grow mt-4 bg-[#8e2de2] rounded-t-[48px] relative top-glow z-0">
          <div className="absolute top-[2px] left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px] overflow-auto">
            {currentPage === 'home' && (
              <div className="px-4 mt-4 task-list">
                <h2 className="text-white text-lg font-bold">Tasks List</h2>
                {tasks.map(task => (
                  <div key={task.id} className="task-item flex items-center justify-between">
                    <div className="flex items-center">
                      <img src={task.icon} alt={task.title} className="task-icon" />
                      <div className="task-info">
                        <p>{task.title}</p>
                        <p className="task-details">{task.details}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      {task.verified ? (
                        <span className="claimed">Claimed</span>
                      ) : (
                        <>
                          {task.completed ? (
                            <button
                              onClick={() => handleTaskVerification(task.id)}
                              className="bg-purple-600 text-white px-2 py-1 rounded-full task-button mt-1"
                            >
                              Verify
                            </button>
                          ) : (
                            <button
                              onClick={() => handleTaskLinkClick(task.id, task.link)}
                              className="bg-purple-600 text-white px-2 py-1 rounded-full task-button"
                            >
                              ✔
                            </button>
                          )}
                        </>
                      )}
                      <div className="earnings flex items-center mt-1">
                        <img src={dollarCoin} alt="Coin" className="coin-icon" />
                        <p>+{task.reward.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="task-item flex items-center justify-between">
                  <div className="flex items-center">
                    <img src={soarchainLogo} alt="Invite Friends" className="task-icon" />
                    <div className="task-info">
                      <p>Invite Friends</p>
                      <p className="task-details">Invite your friends to join Soarchain and earn rewards when they sign up using your referral link.</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <button
                      onClick={handleInviteFriends}
                      className="bg-purple-600 text-white px-2 py-1 rounded-full task-button"
                    >
                      Invite
                    </button>
                    <div className="earnings flex items-center mt-1">
                      <img src={dollarCoin} alt="Coin" className="coin-icon" />
                      <p>+25000</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
