import { useEffect } from 'react';

export default function SpaceInvadersGame() {
	useEffect(() => {
		document.title = 'Space Invaders';
	}, []);
	return (
		<>
			<div className="flex flex-col items-center gap-4 px-4 py-20 border-y min-h-[calc(100dvh-197px)]">
				<h2 className="text-3xl font-bold text-center">Space Invaders</h2>
				<iframe
					src="https://mukund1606.github.io/vibe-quest/space-invaders"
					id="game-iframe"
					title="Coin Quest"
					className="h-[75vh] aspect-square"
				></iframe>
			</div>
		</>
	);
}
