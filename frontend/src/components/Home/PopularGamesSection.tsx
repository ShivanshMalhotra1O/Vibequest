const games: Array<{
	gameName: string;
	gameImage: string;
	gameDescription: string;
	gameLink: string;
}> = [
	{
		gameName: 'Coin Quest',
		gameImage: '/images/game-1.jpg',
		gameDescription: 'Action-packed and full of adventure.',
		gameLink: '/games/coin-quest',
	},
	{
		gameName: 'Snake Game',
		gameImage: '/images/game-4.jpg',
		gameDescription: 'A fun and engaging game that tests your reflexes.',
		gameLink: '/games/snake-game',
	},
	{
		gameName: 'Space Invaders',
		gameImage: '/images/game-5.jpg',
		gameDescription:
			'Space Shooter that challenges your reflexes and strategic thinking.',
		gameLink: '/games/space-invaders',
	},
	{
		gameName: '2048',
		gameImage: '/images/game-6.jpg',
		gameDescription:
			'A classic game that requires logic, strategy, and patience.',
		gameLink: '/games/2048',
	},
	{
		gameName: 'Chess',
		gameImage: '/images/game-7.jpg',
		gameDescription:
			'A game of strategy and tactics where you control the movement of your pieces.',
		gameLink: '/games/chess',
	},
	{
		gameName: 'Car Game',
		gameImage: '/images/game-8.jpg',
		gameDescription:
			'A fun and exciting game that tests your reflexes and problem-solving skills.',
		gameLink: '/games/car-game',
	},
	{
		gameName: 'Tetris',
		gameImage: '/images/game-9.png',
		gameDescription:
			"One of the most popular and challenging games of all time. It's a classic!",
		gameLink: '/games/tetris',
	},
	{
		gameName: 'Donkey Kong',
		gameImage: '/images/game-2.jpg',
		gameDescription: 'A thrilling puzzle game to challenge your mind.',
		gameLink: '/games?game=donkey-kong',
	},
	{
		gameName: 'Pacman',
		gameImage: '/images/game-3.jpg',
		gameDescription:
			'A classic arcade game that has been entertaining for decades.',
		gameLink: '/games?game=pacman',
	},
	{
		gameName: 'Vampire Survival',
		gameImage: '/images/game-10.png',
		gameDescription:
			'A challenging and engaging game that tests your reflexes and problem-solving skills.',
		gameLink: '/games/vampire-survival',
	},
];

export default function PopularGamesSection() {
	return (
		<div
			className="flex flex-col items-center gap-4 px-4 py-20 border-y"
			id="popular-games"
		>
			<h2 className="text-3xl font-bold">Popular Games</h2>
			<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
				{games.map((game) => (
					<GameCard
						key={game.gameName}
						gameName={game.gameName}
						gameImage={game.gameImage}
						gameDescription={game.gameDescription}
						gameLink={game.gameLink}
					/>
				))}
			</div>
		</div>
	);
}

import { Button, Card, CardBody, CardHeader } from '@nextui-org/react';

function GameCard({
	gameName,
	gameImage,
	gameDescription,
	gameLink,
}: {
	gameName: string;
	gameImage: string;
	gameDescription: string;
	gameLink: string;
}) {
	return (
		<Card className="w-full py-4">
			<CardHeader className="flex-col items-center px-4 pt-2 pb-0">
				<p className="text-xl font-bold uppercase">{gameName}</p>
				<small className="text-default-500">{gameDescription}</small>
			</CardHeader>
			<CardBody className="flex items-center gap-2 py-2 overflow-visible">
				<img
					alt={gameName}
					className="object-cover rounded-xl max-w-[80%]"
					src={gameImage}
				/>
				<a href={gameLink}>
					<Button
						color="primary"
						onPress={() => (window.location.href = gameLink)}
					>
						Play Now
					</Button>
				</a>
			</CardBody>
		</Card>
	);
}
