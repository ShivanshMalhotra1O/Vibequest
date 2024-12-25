import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type UserData = {
	id: string;
	name: string;
	username: string;
	image: {
		type: 'Buffer';
		data: Buffer;
	};
	joinedDate: string;
};
export const getUserData = async (): Promise<UserData | null> => {
	try {
		const res = await axios.get(`${BACKEND_URL}/user`, {
			withCredentials: true,
		});
		return res.data;
	} catch {
		return null;
	}
};

type Score = {
	_id: string;
	gameName: string;
	userId: string;
	username: string;
	name: string;
	userImage: {
		type: 'Buffer';
		data: Buffer;
	};
	score: number;
	createdAt: string;
};

export const getMyScores = async (
	gameName: string
): Promise<Score[] | null> => {
	try {
		const res = await axios.get(`${BACKEND_URL}/scores?gameName=${gameName}`, {
			withCredentials: true,
		});
		return res.data;
	} catch {
		return null;
	}
};

export const getAllScores = async (
	gameName: string
): Promise<Score[] | null> => {
	try {
		const res = await axios.get(
			`${BACKEND_URL}/scores/all?gameName=${gameName}`,
			{
				withCredentials: true,
			}
		);
		return res.data;
	} catch {
		return null;
	}
};

export function useUser() {
	return useQuery({
		queryKey: ['user_data'],
		queryFn: async () => {
			const res = await getUserData();
			return res
				? {
						...res,
						image: res?.image?.data
							? `data:image/png;base64,${toBase64(res?.image?.data)}`
							: undefined,
				  }
				: null;
		},
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
	});
}

export function useMyScores({ gameName }: { gameName: string }) {
	return useQuery({
		queryKey: ['my_scores', gameName],
		queryFn: async ({ queryKey: [, gameName] }) => {
			const res = await getMyScores(gameName);
			return res
				?.map((score) => {
					return {
						...score,
						userImage: score?.userImage?.data
							? `data:image/png;base64,${toBase64(score?.userImage?.data)}`
							: undefined,
					};
				})
				.sort((a, b) => b.score - a.score);
		},
	});
}

export function useAllScores({ gameName }: { gameName: string }) {
	return useQuery({
		queryKey: ['all_scores', gameName],
		queryFn: async ({ queryKey: [, gameName] }) => {
			const res = await getAllScores(gameName);
			return res
				?.map((score) => {
					return {
						...score,
						userImage: score?.userImage?.data
							? `data:image/png;base64,${toBase64(score?.userImage?.data)}`
							: undefined,
					};
				})
				.sort((a, b) => b.score - a.score);
		},
	});
}

export function useUpdateScoreMutation() {
	const apiUtils = useQueryClient();
	return useMutation({
		mutationFn: async ({
			score,
			gameName,
		}: {
			score: number;
			gameName: GameName;
		}) => {
			const res = await axios.post(
				import.meta.env.VITE_BACKEND_URL + '/scores',
				{
					gameName: gameName,
					score: score,
				},
				{
					responseType: 'json',
					withCredentials: true,
				}
			);
			return { message: res.data.message as string };
		},
		async onSettled(_, __, variables) {
			await apiUtils.invalidateQueries({
				queryKey: ['all_scores', variables.gameName],
			});
			await apiUtils.invalidateQueries({
				queryKey: ['my_scores', variables.gameName],
			});
		},
	});
}

export function useGetGameFilesMutation() {
	return useMutation({
		mutationFn: async ({ gameName }: { gameName: GameName }) => {
			const game = await axios.post(
				import.meta.env.VITE_BACKEND_URL + '/games/assets',
				{ gameName },
				{
					responseType: 'arraybuffer',
					withCredentials: true,
				}
			);
			const gameScript = await axios.post(
				import.meta.env.VITE_BACKEND_URL + '/games/code',
				{ gameName },
				{
					responseType: 'text',
					withCredentials: true,
				}
			);
			const gameData = game.data as ArrayBuffer;
			const scriptData = gameScript.data as string;
			return { gameData, scriptData };
		},
	});
}

export const logOut = async () => {
	try {
		await axios.post(
			`${BACKEND_URL}/user/logout`,
			{},
			{
				withCredentials: true,
			}
		);
		window.location.reload();
	} catch {
		return null;
	}
};

export function toBase64(arr: Uint8Array): string {
	return btoa(
		arr?.reduce((data, byte) => data + String.fromCharCode(byte), '')
	);
}

export type GameName =
	| 'snake_game'
	| 'space_invaders'
	| 'chess'
	| '2048'
	| 'car_game'
	| 'coin_quest'
	| 'tetris';

export const games: Array<{
	label: string;
	key: GameName;
	isLeaderboard: boolean;
}> = [
	{
		label: 'Snake Game',
		key: 'snake_game',
		isLeaderboard: true,
	},
	{
		label: 'Space Invaders',
		key: 'space_invaders',
		isLeaderboard: true,
	},
	{
		label: 'Chess',
		key: 'chess',
		isLeaderboard: false,
	},
	{
		label: '2048',
		key: '2048',
		isLeaderboard: true,
	},
	{
		label: 'Car Game',
		key: 'car_game',
		isLeaderboard: true,
	},
	{
		label: 'Coin Quest',
		key: 'coin_quest',
		isLeaderboard: true,
	},
	{
		label: 'Tetris',
		key: 'tetris',
		isLeaderboard: true,
	},
];
