import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';

import authRouter from './routes/auth';
import issueRouter from './routes/issues';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => {
	res.json({ status: 'ok' });
});

app.use('/api/auth', authRouter);
app.use('/api/issues', issueRouter);

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/airport_issue_portal';

async function start() {
	try {
		await mongoose.connect(mongoUri);
		console.log('Connected to MongoDB');
		const port = Number(process.env.PORT || 4000);
		app.listen(port, () => {
			console.log(`Server listening on http://localhost:${port}`);
		});
	} catch (err: any) {
		console.error('Failed to connect to MongoDB:', err.message);
		console.log('Please install MongoDB locally or set MONGO_URI in .env');
		process.exit(1);
	}
}

if (require.main === module) {
	start();
}

export default app;
