import { emotionsConfig } from './emotions';

export const games: Array<{
	gameId: string;
	gameName: string;
	gameImage: string;
	gameDescription: string;
	gameLink: string;
}> = [
	{
		gameId: 'coin-quest',
		gameName: 'Coin Quest',
		gameImage: '/images/game-1.jpg',
		gameDescription: 'Action-packed and full of adventure.',
		gameLink: '/games/coin-quest',
	},
	{
		gameId: 'snake-game',
		gameName: 'Snake Game',
		gameImage: '/images/game-4.jpg',
		gameDescription: 'A fun and engaging game that tests your reflexes.',
		gameLink: '/games/snake-game',
	},
	{
		gameId: 'space-invaders',
		gameName: 'Space Invaders',
		gameImage: '/images/game-5.jpg',
		gameDescription:
			'Space Shooter that challenges your reflexes and strategic thinking.',
		gameLink: '/games/space-invaders',
	},
	{
		gameId: '2048',
		gameName: '2048',
		gameImage: '/images/game-6.jpg',
		gameDescription:
			'A classic game that requires logic, strategy, and patience.',
		gameLink: '/games/2048',
	},
	{
		gameId: 'chess',
		gameName: 'Chess',
		gameImage: '/images/game-7.jpg',
		gameDescription:
			'A game of strategy and tactics where you control the movement of your pieces.',
		gameLink: '/games/chess',
	},
	{
		gameId: 'car-game',
		gameName: 'Car Game',
		gameImage: '/images/game-8.jpg',
		gameDescription:
			'A fun and exciting game that tests your reflexes and problem-solving skills.',
		gameLink: '/games/car-game',
	},
	{
		gameId: 'tetris',
		gameName: 'Tetris',
		gameImage: '/images/game-9.png',
		gameDescription:
			"One of the most popular and challenging games of all time. It's a classic!",
		gameLink: '/games/tetris',
	},
	{
		gameId: 'donkey-kong',
		gameName: 'Donkey Kong',
		gameImage: '/images/game-2.jpg',
		gameDescription: 'A thrilling puzzle game to challenge your mind.',
		gameLink: '/games?game=donkey-kong',
	},
	{
		gameId: 'pacman',
		gameName: 'Pacman',
		gameImage: '/images/game-3.jpg',
		gameDescription:
			'A classic arcade game that has been entertaining for decades.',
		gameLink: '/games?game=pacman',
	},
	{
		gameId: 'space-dodge',
		gameName: 'Space Dodge',
		gameImage: '/images/game-3.jpg',
		gameDescription:
			'A classic arcade game that has been entertaining for decades.',
		gameLink: `/games?game=space-dodge`,
	},
	{
		gameId: 'vampire-survival',
		gameName: 'Vampire Survival',
		gameImage: '/images/game-10.png',
		gameDescription:
			'A challenging and engaging game that tests your reflexes and problem-solving skills.',
		gameLink: '/games/vampire-survival',
	},
];

export type Emotion = keyof typeof emotionsConfig;

export const emotionGames = (emotion: Emotion) => [
	{
		gameId: 'coin-quest',
		gameName: 'Coin Quest',
		gameImage: '/images/game-1.jpg',
		gameDescription: 'Action-packed and full of adventure.',
		gameLink: `/emotion/${emotion}/coin-quest`,
	},
	{
		gameId: 'snake-game',
		gameName: 'Snake Game',
		gameImage: '/images/game-4.jpg',
		gameDescription: 'A fun and engaging game that tests your reflexes.',
		gameLink: `/emotion/${emotion}/snake-game`,
	},
	{
		gameId: 'space-invaders',
		gameName: 'Space Invaders',
		gameImage: '/images/game-5.jpg',
		gameDescription:
			'Space Shooter that challenges your reflexes and strategic thinking.',
		gameLink: `/emotion/${emotion}/space-invaders`,
	},
	{
		gameId: '2048',
		gameName: '2048',
		gameImage: '/images/game-6.jpg',
		gameDescription:
			'A classic game that requires logic, strategy, and patience.',
		gameLink: `/emotion/${emotion}/2048`,
	},
	{
		gameId: 'chess',
		gameName: 'Chess',
		gameImage: '/images/game-7.jpg',
		gameDescription:
			'A game of strategy and tactics where you control the movement of your pieces.',
		gameLink: `/emotion/${emotion}/chess`,
	},
	{
		gameId: 'car-game',
		gameName: 'Car Game',
		gameImage: '/images/game-8.jpg',
		gameDescription:
			'A fun and exciting game that tests your reflexes and problem-solving skills.',
		gameLink: `/emotion/${emotion}/car-game`,
	},
	{
		gameId: 'tetris',
		gameName: 'Tetris',
		gameImage: '/images/game-9.png',
		gameDescription:
			"One of the most popular and challenging games of all time. It's a classic!",
		gameLink: `/emotion/${emotion}/tetris`,
	},
	{
		gameId: 'donkey-kong',
		gameName: 'Donkey Kong',
		gameImage: '/images/game-2.jpg',
		gameDescription: 'A thrilling puzzle game to challenge your mind.',
		gameLink: `/games?game=donkey-kong`,
	},
	{
		gameId: 'pacman',
		gameName: 'Pacman',
		gameImage: '/images/game-3.jpg',
		gameDescription:
			'A classic arcade game that has been entertaining for decades.',
		gameLink: `/games?game=pacman`,
	},
	{
		gameId: 'space-dodge',
		gameName: 'Space Dodge',
		gameImage: '/images/game-3.jpg',
		gameDescription:
			'A classic arcade game that has been entertaining for decades.',
		gameLink: `/games?game=space-dodge`,
	},
	{
		gameId: 'vampire-survival',
		gameName: 'Vampire Survival',
		gameImage: '/images/game-10.png',
		gameDescription:
			'A challenging and engaging game that tests your reflexes and problem-solving skills.',
		gameLink: `/emotion/${emotion}/vampire-survival`,
	},
];
