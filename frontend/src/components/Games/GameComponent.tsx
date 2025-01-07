import React from 'react';

import { usePyodide } from '@/hooks/usePyodide';
import {
	GameName,
	games,
	useGetGameFilesMutation,
	useUpdateScoreMutation,
} from '@/utils';
import { toast } from 'sonner';

type GameStatus = 'RUNNING' | 'STOPPED' | 'ENDED' | 'INITIAL';

export default function GameComponent({
	gameName,
	toUpdateLeaderboard = true,
	initialSpeed = 60,
	showSpeed = true,
}: {
	gameName: GameName;
	toUpdateLeaderboard?: boolean;
	initialSpeed?: number;
	showSpeed?: boolean;
}) {
	const canvasRef = React.useRef<HTMLCanvasElement>(null);
	const packages = React.useMemo(() => ['micropip', 'pygame-ce'], []);
	const micropipPackages = React.useMemo(
		() => (gameName === 'vampire-survival' ? ['pytmx'] : []),
		[gameName]
	);
	const [speed, setSpeed] = React.useState(initialSpeed);
	const [canvasSize, setCanvasSize] = React.useState(500);
	const [gameState, setGameStatus] = React.useState<GameStatus>('INITIAL');

	const game = games.find((game) => game.key === gameName);

	const { pyodide, isLoading } = usePyodide(
		import.meta.env.VITE_PYODIDE_URL,
		packages,
		micropipPackages
	);

	const updateScoreMuttaion = useUpdateScoreMutation();
	const { mutateAsync: getGameFilesMutationAsync } = useGetGameFilesMutation();

	async function runGame() {
		const { gameData, scriptData } = await getGameFilesMutationAsync({
			gameName,
		});
		const canvas = canvasRef.current;
		if (!canvas) return;
		if (!pyodide) return;
		pyodide.globals.set('pyodide', pyodide);
		pyodide.globals.set('canvas', canvas);
		pyodide.globals.set('speed', speed);
		pyodide.globals.set('setGameStatus', setGameStatus);
		pyodide.canvas.setCanvas2D(canvas);
		pyodide.unpackArchive(gameData, 'zip');
		pyodide.runPythonAsync(scriptData).then(async () => {
			if (toUpdateLeaderboard) {
				const game = pyodide.globals.get('game').toJs();
				const score = game.score;
				await updateScore(score);
			}
			setGameStatus('STOPPED');
		});
		setGameStatus('RUNNING');
	}

	async function updateScore(score: number) {
		try {
			const res = await updateScoreMuttaion.mutateAsync({ gameName, score });
			toast.success(res.message);
		} catch {
			toast.error('Something went wrong!');
		}
	}

	async function exitGame() {
		const exitGame = pyodide?.globals.get('exit_game').toJs();
		await exitGame();
		if (canvasRef.current) {
			canvasRef.current.height = canvasSize;
			canvasRef.current.width = canvasSize;
		}
		setGameStatus('ENDED');
	}

	return (
		<>
			<div className="flex flex-col items-center gap-4 px-4 py-10 border-y min-h-[calc(100dvh-157px)]">
				<h2 className="text-3xl font-bold text-center">{game?.label}</h2>
				<div className="flex items-center justify-center gap-4">
					<button
						className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 disabled:bg-gray-400 whitespace-nowrap"
						onClick={async () => {
							if (gameState === 'INITIAL') {
								await runGame();
							} else if (gameState === 'STOPPED') {
								await exitGame();
								await runGame();
							}
						}}
						disabled={
							isLoading || gameState === 'RUNNING' || gameState === 'ENDED'
						}
					>
						{gameState === 'INITIAL' ? 'Play Game' : 'Restart Game'}
					</button>
					<div className="w-full">
						<div className="text-center">
							<p className="text-xl font-bold whitespace-nowrap">
								{gameState === 'INITIAL'
									? 'Not Started'
									: gameState === 'RUNNING'
									? 'Running'
									: 'Stopped'}
							</p>
						</div>
					</div>
					{showSpeed && (
						<div className="flex flex-col items-center">
							<p className="text-xl font-bold">Speed:{speed}</p>
							<div className="flex gap-2">
								<button
									className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 disabled:bg-gray-400"
									onClick={() => {
										setSpeed((prevSpeed) => prevSpeed + 10);
									}}
									disabled={gameState === 'RUNNING'}
								>
									+
								</button>
								<button
									className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 disabled:bg-gray-400"
									onClick={() => {
										setSpeed((prevSpeed) => prevSpeed - 10);
									}}
									disabled={gameState === 'RUNNING'}
								>
									-
								</button>
							</div>
						</div>
					)}
					{gameName !== 'vampire-survival' && (
						<div className="flex flex-col items-center">
							<p className="text-xl font-bold whitespace-nowrap">
								Size: {canvasSize}px
							</p>
							<div className="flex gap-2">
								<button
									className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 disabled:bg-gray-400"
									onClick={() => {
										setCanvasSize((prevCanvasSize) => prevCanvasSize + 50);
									}}
									disabled={gameState === 'RUNNING'}
								>
									+
								</button>
								<button
									className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 disabled:bg-gray-400"
									onClick={() => {
										setCanvasSize((prevCanvasSize) => prevCanvasSize - 50);
									}}
									disabled={gameState === 'RUNNING'}
								>
									-
								</button>
							</div>
						</div>
					)}
				</div>
				<div id="canvas-container">
					<canvas
						id="canvas"
						width={canvasSize}
						height={canvasSize}
						ref={canvasRef}
						className="border-2 border-black rounded-md"
					></canvas>
				</div>
			</div>
		</>
	);
}
