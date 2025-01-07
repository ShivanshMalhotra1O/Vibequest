import { GameCard } from '@/components/Home/PopularGamesSection';
import { emotionsConfig } from '@/data/emotions';
import { emotionGames } from '@/data/games';
import { useParams } from 'react-router';

const availableEmotions = Object.keys(emotionsConfig);
export default function EmotionPage() {
	const params = useParams();
	const emotion = params.emotion;
	if (!emotion || !availableEmotions.includes(emotion)) {
		return (
			<div className="box-border flex flex-col items-center min-h-[calc(100dvh-157px)] p-5 bg-gray-100">
				<h1 className="text-center text-3xl font-bold">Emotion not found</h1>
			</div>
		);
	}
	const em = emotion as keyof typeof emotionsConfig;
	const availableGames = emotionsConfig[em].games;
	const games = emotionGames(em);
	const filteredGames = games.filter((game) =>
		availableGames.includes(game.gameId)
	);

	return (
		<div className="box-border flex flex-col items-center min-h-[calc(100dvh-157px)] p-5 bg-gray-100">
			<h1 className="text-center text-3xl font-bold">
				Emotion {em[0].toUpperCase() + em.slice(1)} Games
			</h1>
			<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
				{filteredGames.map((game) => (
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
