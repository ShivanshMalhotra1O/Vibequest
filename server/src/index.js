import 'dotenv/config';

// DB
import { createConnection } from './db/conn.js';

// Express
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

// Routes
import userRouter from './routes/user.js';

const PORT = process.env.PORT ?? 3000;
const app = express();
app.use(bodyParser.json());
app.use(
	cors({
		credentials: true,
	})
);

app.get('/', (req, res) => {
	res.json({ message: 'Hello World!' });
});

app.use('/users', userRouter);

console.log('Starting server...');
app.listen(PORT, () => {
	createConnection();
	console.log(`Server started at http://localhost:${PORT}`);
});
