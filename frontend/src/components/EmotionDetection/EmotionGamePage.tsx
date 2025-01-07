import { emotionsConfig } from '@/data/emotions';
import { emotionGames } from '@/data/games';
import { GameName } from '@/utils';
import { useNavigate, useParams } from 'react-router';
import GameComponent from '../Games/GameComponent';

const availableEmotions = Object.keys(emotionsConfig);
export default function EmotionGamePage() {
	const navigate = useNavigate();
	const params = useParams();
	const emotion = params.emotion;
	const selectedGame = params.gameId ?? '';
	if (!emotion || !availableEmotions.includes(emotion)) {
		return (
			<div className="box-border flex flex-col items-center min-h-[calc(100dvh-157px)] p-5 bg-gray-100">
				<h1 className="text-center text-3xl font-bold">Invalid Emotion</h1>
			</div>
		);
	}
	const em = emotion as keyof typeof emotionsConfig;
	const availableSpeed = emotionsConfig[em].speed;
	const availableGames = emotionsConfig[em].games;
	const games = emotionGames(em);
	const filteredGame = games.find((game) => game.gameId === selectedGame);
	if (!availableGames.includes(selectedGame) || !filteredGame) {
		return (
			<div className="box-border flex flex-col items-center min-h-[calc(100dvh-157px)] p-5 bg-gray-100">
				<h1 className="text-center text-3xl font-bold">
					Invalid Game for Given Emotion
				</h1>
			</div>
		);
	}

	if (
		filteredGame.gameId === 'pacman' ||
		filteredGame.gameId === 'donkey-kong'
	) {
		navigate(`/games?game=${filteredGame.gameId}`, {
			replace: true,
		});
		return <></>;
	}

	return (
		<GameComponent
			gameName={filteredGame?.gameId as GameName}
			initialSpeed={availableSpeed * 60}
			showSpeed={false}
		/>
	);
}
