export const emotionsConfig = {
	angry: {
		games: ['chess', '2048', 'tetris', 'snake-game', 'vampire-survival'],
		speed: 0.75, // Slow and strategic games to promote calmness
	},
	disgust: {
		games: ['chess', '2048', 'car-game', 'snake-game', 'coin-quest'],
		speed: 0.8, // Slightly slow-paced games to ease reluctance
	},
	fear: {
		games: [
			'space-invaders',
			'vampire-survival',
			'snake-game',
			'chess',
			'2048',
		],
		speed: 0.9, // Moderate speed to channel the heightened alertness
	},
	happy: {
		games: [
			'pacman',
			'donkey-kong',
			'coin-quest',
			'space-invaders',
			'snake-game',
		],
		speed: 1, // Balanced speed to match a positive and active mood
	},
	sad: {
		games: ['2048', 'chess', 'tetris', 'snake-game', 'car-game'],
		speed: 0.75, // Slow-paced games to gently engage the mind
	},
	surprise: {
		games: [
			'pacman',
			'donkey-kong',
			'space-invaders',
			'coin-quest',
			'vampire-survival',
		],
		speed: 1, // Slightly faster pace to match the excitement of surprise
	},
	neutral: {
		games: ['chess', '2048', 'snake-game', 'car-game', 'coin-quest'],
		speed: 1, // Standard speed for a calm and steady state
	},
};
