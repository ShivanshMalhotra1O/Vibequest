import { useEffect, useMemo } from 'react';

import { useSearchParams } from 'react-router';

import { generateGameHTML } from './generateGameHTML';

const gamesMap = [
	{
		gameName: 'snake-game',
		title: 'Snake Game',
	},
	{
		gameName: 'coin-quest',
		title: 'CoinQuest',
	},
	{
		gameName: 'donkey-kong',
		title: 'Donkey Kong',
	},
	{
		gameName: 'space-invaders',
		title: 'Space Invaders',
	},
	{
		gameName: 'pacman',
		title: 'Pacman',
	},
	{
		gameName: 'chess',
		title: 'Chess',
	},
	{
		gameName: '2048',
		title: '2048',
	},
	{
		gameName: 'car-game',
		title: 'Car Game',
	},
];

export default function GamePage() {
	const [params] = useSearchParams();
	const gameName = params.get('game');

	const game = useMemo(
		() => gamesMap.find((game) => game.gameName === gameName),
		[gameName]
	);

	useEffect(() => {
		document.title = game?.title || 'Game';
	}, [gameName, game?.title]);

	if (!game) {
		return <div>Game not found</div>;
	}

	return (
		<>
			<div className="flex flex-col items-center gap-4 px-4 py-20 border-y min-h-[calc(100dvh-197px)]">
				<h2 className="text-3xl font-bold text-center">{game.title}</h2>
				<div className="flex justify-center w-full px-4">
					<iframe
						srcDoc={generateGameHTML(game.gameName, game.title)}
						className="w-full max-w-[550px] aspect-square"
					></iframe>
				</div>
			</div>
		</>
	);
}
