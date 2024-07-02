import React from 'react';
import { soarchainLogo, twitter, telegram } from './images';

interface Task {
  id: number;
  title: string;
  reward: number;
  completed: boolean;
  details: string;
  link: string;
  verified: boolean;
}

interface HomePageProps {
  tasks: Task[];
  handleLinkClick: (taskId: number) => void;
  handleTaskCompletion: (taskId: number, reward: number) => void;
  handleInviteFriends: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ tasks, handleLinkClick, handleTaskCompletion, handleInviteFriends }) => {
  return (
    <>
      <div className="px-4 mt-4 message">
        <h2>🚀 Ready to Soar? 🚀</h2>
        <p>We're thrilled to offer you the opportunity to be part of our exciting journey towards the mainnet launch in September 2024. Join our airdrop campaign and earn exclusive Soar tokens along with cash prizes! Here’s how you can participate and start earning today:</p>
        <p><strong>Join the Soarchain Telegram Group:</strong> Become part of our community to stay updated with all the latest news and developments.</p>
        <p><strong>Follow & Engage on Twitter:</strong> Follow our official account, retweet the airdrop announcement, and tag a friend. Help us spread the word and grow our community!</p>
        <p><strong>Complete the Registration Form:</strong> Provide your details through our form to ensure you’re eligible for token distribution. Make sure you enter correct information for seamless participation.</p>
        <p><strong>Invite Friends:</strong> Share the excitement and bring your friends into our growing community. Use your unique referral link to invite friends and boost your points!</p>
        <p>Each week, the top 1000 active entries will earn points. These points will be converted into Soar tokens at the end of the campaign. Keep an eye on the weekly leaderboard to see how you stack up against other participants! Stay active, keep engaging, and watch your rewards grow as we approach the launch. Your support is instrumental in building a robust Soarchain community.</p>
      </div>
      <div className="px-4 mt-4 task-list">
        <h2 className="text-white text-lg font-bold">Tasks List</h2>
        {tasks.map(task => (
          <div key={task.id} className="task-item">
            <div className="flex items-center">
              {task.id === 1 && <img src={telegram} alt="Telegram" />}
              {task.id === 2 && <img src={twitter} alt="Twitter" />}
              {task.id === 3 && <img src={soarchainLogo} alt="Soarchain" />}
              <p>{task.title}</p>
            </div>
            <div className="earnings">
              <p>+{task.reward.toLocaleString()}</p>
              {task.completed && <span className="complete">✔</span>}
            </div>
            {!task.completed && !task.verified && task.id !== 4 && (
              <a
                href={task.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleLinkClick(task.id)}
                className="bg-purple-600 text-white px-2 py-1 rounded"
              >
                Go to Link
              </a>
            )}
            {!task.completed && task.verified && (
              <button
                onClick={() => handleTaskCompletion(task.id, task.reward)}
                className="bg-purple-600 text-white px-2 py-1 rounded"
              >
                Verify
              </button>
            )}
            {task.id === 4 && !task.completed && (
              <>
                <div className="mt-2">
                  <p>Invite your friends to join Soarchain and earn rewards when they sign up using your referral link.</p>
                  <button
                    onClick={() => {
                      handleInviteFriends();
                      handleTaskCompletion(task.id, task.reward);
                    }}
                    className="bg-purple-600 text-white px-2 py-1 rounded mt-2"
                  >
                    Invite Friends
                  </button>
                </div>
              </>
            )}
            {task.completed && <span className="complete">✔ Completed</span>}
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
