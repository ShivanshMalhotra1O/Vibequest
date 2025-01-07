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
						key={game.gameId}
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

import { games } from '@/data/games';
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react';

export function GameCard({
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
