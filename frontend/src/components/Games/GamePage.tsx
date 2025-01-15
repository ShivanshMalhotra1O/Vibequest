import { GameName } from '@/utils'; // Import GameName from utils/index.ts
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import GameComponent from './GameComponent'; // Import GameComponent

// Ensure you're using the GameName type from utils
const gamesMap: { gameName: GameName; title: string }[] = [
  { gameName: 'snake-game', title: 'Snake Game' },
  { gameName: 'coin-quest', title: 'CoinQuest' },
  { gameName: 'donkey-kong', title: 'Donkey Kong' },
  { gameName: 'space-invaders', title: 'Space Invaders' },
  { gameName: 'pacman', title: 'Pacman' },
  { gameName: 'chess', title: 'Chess' },
  { gameName: '2048', title: '2048' },
  { gameName: 'car-game', title: 'Car Game' },
  { gameName: 'space-dodge', title: 'Space Dodge' },
];

export default function GamePage() {
  const [params] = useSearchParams();
  const gameName = params.get('game'); // Retrieve the game name from query

  const game = useMemo(() => {
    return gamesMap.find((game) => game.gameName === gameName);
  }, [gameName]);

  useEffect(() => {
    document.title = game?.title || 'Searched Game';
  }, [game?.title]);

  if (!game) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 px-4 py-20 min-h-screen">
        <h2 className="text-2xl font-bold">Searched for: {gameName}</h2>
        <p className="text-lg">Game not found. Please try another search.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 px-4 py-20 min-h-screen">
      <h2 className="text-3xl font-bold">Searched for: {game.title}</h2>
      {/* Pass the correct gameName prop */}
      <GameComponent gameName={game.gameName} />
    </div>
  );
}
