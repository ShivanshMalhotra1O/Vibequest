import { GameName, useAllScores } from '@/utils';
import React from 'react';

import {
	Autocomplete,
	AutocompleteItem,
	Pagination,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@nextui-org/react';
import { format } from 'date-fns';

const games: Array<{ label: string; key: GameName }> = [
	{
		label: 'Snake Game',
		key: 'snake_game',
	},
	{
		label: 'Space Invaders',
		key: 'space_invaders',
	},
	{
		label: 'Chess',
		key: 'chess',
	},
	{
		label: '2048',
		key: '2048',
	},
];

const pageSize = 10;
export default function Leaderboard() {
	const [gameName, setGameName] = React.useState<GameName>('snake_game');
	const [currentPage, setCurrentPage] = React.useState(1);

	const { data: scoresData } = useAllScores({ gameName: gameName });

	return (
		<div className="flex flex-col items-center  min-h-[calc(100dvh-157px)] px-4 py-6">
			<div className="flex flex-col items-center w-full p-6 bg-white rounded-lg shadow-md">
				<div className="flex justify-between w-full flex-col md:flex-row gap-4">
					<h1 className="text-3xl font-bold text-gray-800">
						{games.find((game) => game.key === gameName)?.label} Leaderboard
					</h1>
					<div className="flex gap-2">
						<Autocomplete
							label="Game"
							defaultItems={games}
							defaultSelectedKey={'snake_game'}
							onSelectionChange={(key) => {
								if (key) {
									setGameName(key as GameName);
								}
							}}
						>
							{(item) => (
								<AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
							)}
						</Autocomplete>
					</div>
				</div>

				<div className="w-full overflow-auto py-2 px-1">
					<Table
						className="w-full"
						aria-label="Leaderboard"
						removeWrapper
						isHeaderSticky
					>
						<TableHeader className="flex">
							<TableColumn align="start" key="username">
								USER
							</TableColumn>
							<TableColumn align="center" key="score">
								SCORE
							</TableColumn>
							<TableColumn align="center" key="createdAt">
								DATE
							</TableColumn>
						</TableHeader>
						<TableBody
							items={
								scoresData?.slice(
									(currentPage - 1) * pageSize,
									currentPage * pageSize
								) ?? []
							}
						>
							{(item) => (
								<TableRow key={item._id}>
									<TableCell>
										<div className="flex gap-2">
											<div className="flex items-center gap-2">
												<img
													src={item.userImage}
													alt="Profile"
													className="w-8 h-8 rounded-full"
												/>
												<div className="text-left">
													<p className="text-sm font-medium text-gray-800">
														{item.name}
													</p>
													<p className="text-sm text-gray-500">
														{item.username}
													</p>
												</div>
											</div>
										</div>
									</TableCell>
									<TableCell align="center" className="text-xl font-bold">
										{item.score}
									</TableCell>
									<TableCell align="center">
										{format(new Date(item.createdAt), 'dd/LL/yyyy hh:mm:ss b')}
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				<Pagination
					showControls
					color="success"
					page={currentPage}
					total={Math.ceil((scoresData?.length ?? 1) / pageSize)}
					onChange={setCurrentPage}
				/>
			</div>
		</div>
	);
}
