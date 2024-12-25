import 'dotenv/config';

// DB
import { createConnection } from './db/conn.js';

// Express
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

// Routes
import gameRouter from './routes/games.js';
import scoreRouter from './routes/scores.js';
import userRouter from './routes/user.js';

const PORT = process.env.PORT ?? 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	cors({
		origin: ['https://minor-project.mukund.page', 'http://localhost:5173'],
		credentials: true,
	})
);

app.get('/', (req, res) => {
	res.json({ message: 'Hello World!' });
});

app.use('/user', userRouter);
app.use('/games', gameRouter);
app.use('/scores', scoreRouter);

console.log('Starting server...');
app.listen(PORT, () => {
	createConnection();
	console.log(`Server started at http://localhost:${PORT}`);
});
