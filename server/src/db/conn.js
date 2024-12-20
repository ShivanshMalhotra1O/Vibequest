import 'dotenv/config';

import mongoose from 'mongoose';

const DATABASE_URL = process.env.DATABASE_URL;

// Database Connection
export const createConnection = () => {
	mongoose
		.connect(DATABASE_URL, {
			dbName: 'vibequest',
		})
		.then((e) => {
			console.log('Database connected');
		})
		.catch((error) => {
			console.log('Error connecting to database');
			console.error(error);
		});
};
