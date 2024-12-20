import { useEffect } from 'react';

export default function SnakeGame() {
	useEffect(() => {
		document.title = 'Snake Game';
	}, []);
	return (
		<>
			<div className="flex flex-col items-center gap-4 px-4 py-20 border-y min-h-[calc(100dvh-157px)]">
				<h2 className="text-3xl font-bold text-center">Snake Game</h2>
				<iframe
					src="https://mukund1606.github.io/vibe-quest/snake"
					id="game-iframe"
					title="Coin Quest"
					className="h-[75vh] aspect-square"
				></iframe>
			</div>
		</>
	);
}
