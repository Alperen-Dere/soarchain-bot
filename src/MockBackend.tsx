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
  
  export const fetchTasks = (): Promise<Task[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, title: 'Join our TG channel', reward: 5000, completed: false, details: 'Become part of our community to stay updated with all the latest news and developments.', link: 'https://t.me/soarchain_tg', verified: false, icon: telegram },
          { id: 2, title: 'Follow our X account', reward: 5000, completed: false, details: 'Follow our official account, retweet the airdrop announcement, and tag a friend. Help us spread the word and grow our community!', link: 'https://twitter.com/soar_chain', verified: false, icon: twitter },
          { id: 3, title: 'Complete the Registration Form', reward: 10000, completed: false, details: 'Provide your details through our form to ensure you’re eligible for token distribution. Make sure you enter correct information for seamless participation.', link: '#', verified: false, icon: soarchainLogo },
          { id: 4, title: 'Invite Friends', reward: 25000, completed: false, details: 'Invite your friends to join Soarchain and earn rewards when they sign up using your referral link.', link: '', verified: false, icon: soarchainLogo }
        ]);
      }, 1000);
    });
  };
  