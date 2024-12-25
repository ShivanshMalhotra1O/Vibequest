import { createWriteStream, readFileSync, unlinkSync } from 'fs';

import archiver from 'archiver';
import { Router } from 'express';
import path from 'path';

import { requireAuth } from './user.js';

import { games } from '../constants.js';

const gameRouter = Router();

gameRouter.post('/assets', requireAuth, async (req, res) => {
	try {
		const { gameName } = req.body;
		if (!games.includes(gameName)) {
			return res.sendStatus(404);
		}
		const time = new Date().toISOString().replace(/:/g, '-');
		const zipName = `zips/${gameName}_${time}.zip`;

		const output = createWriteStream(zipName);
		const archive = archiver('zip', {
			zlib: { level: 9 },
		});

		archive.pipe(output);

		archive.glob('**/*', {
			cwd: path.join('games', gameName),
			ignore: ['main.py'],
			dot: true,
		});

		await archive.finalize();

		await new Promise((resolve, reject) => {
			output.on('close', resolve);
			output.on('error', reject);
		});

		const fileData = readFileSync(zipName);

		unlinkSync(zipName);

		res.setHeader('Content-Type', 'application/zip');
		res.setHeader(
			'Content-Disposition',
			`attachment; filename="${gameName}.zip"`
		);
		return res.send(fileData);
	} catch (error) {
		console.error(error);
		return res.sendStatus(500);
	}
});

gameRouter.post('/code', requireAuth, async (req, res) => {
	try {
		const { gameName } = req.body;

		if (!games.includes(gameName)) {
			return res.sendStatus(404);
		}

		const fileData = readFileSync(path.join('games', gameName, 'main.py'));

		res.setHeader('Content-Type', 'text/plain');
		res.setHeader('Content-Disposition', 'attachment; filename="main.py"');
		return res.send(fileData);
	} catch (error) {
		console.error(error);
		return res.sendStatus(500);
	}
});

export default gameRouter;
