import { Router } from 'express';

import ScoreModel from '../db/models/scoreModel.js';
import UserModel from '../db/models/userModel.js';
import { requireAuth } from './user.js';

const scoreRouter = Router();

import { games } from '../constants.js';

scoreRouter.post('/', requireAuth, async (req, res) => {
	try {
		const { userId } = req.user;
		const data = req.body;
		const gameName = data.gameName;
		if (!games.includes(gameName)) {
			return res.status(400).json({ message: 'Game not found!' });
		}
		const score = Number(data.score);
		if (score < 0 || isNaN(score)) {
			return res.status(400).json({ message: 'Score is required!' });
		}
		const user = await UserModel.findById(userId);
		if (!user) {
			return res.status(400).json({ message: 'User not found!' });
		}
		const scoreData = new ScoreModel({
			gameName: gameName,
			userId: userId,
			score: score,
		});
		await scoreData.save();
		res.json({ message: 'Score added successfully!' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal server error!' });
	}
});

scoreRouter.get('/', requireAuth, async (req, res) => {
	try {
		const { userId } = req.user;
		const { gameName } = req.query;
		if (!games.includes(gameName)) {
			return res.status(400).json({ message: 'Game not found!' });
		}
		const user = await UserModel.findById(userId);
		if (!user) {
			return res.status(400).json({ message: 'User not found!' });
		} else {
			const scores = await ScoreModel.find({
				userId: userId,
				gameName: gameName,
			});
			const data = scores.map((s) => {
				return {
					_id: s._id,
					gameName: s.gameName,
					userId: s.userId,
					username: user.username,
					name: user.name,
					userImage: user.image,
					score: s.score,
					createdAt: s.createdAt,
				};
			});
			return res.json(data);
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal server error!' });
	}
});

scoreRouter.get('/all', async (req, res) => {
	try {
		const { gameName } = req.query;
		if (!games.includes(gameName)) {
			return res.status(400).json({ message: 'Game not found!' });
		}

		const allUsers = await UserModel.find();

		const scores = await ScoreModel.find({ gameName: gameName });
		const data = scores.map((s) => {
			const user = allUsers.find(
				(u) => u._id.toString() === s.userId.toString()
			);
			return {
				_id: s._id,
				gameName: s.gameName,
				userId: s.userId,
				username: user?.username,
				name: user?.name,
				userImage: user?.image,
				score: s.score,
				createdAt: s.createdAt,
			};
		});

		return res.json(data);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal server error!' });
	}
});

export default scoreRouter;
