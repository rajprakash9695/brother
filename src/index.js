import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/index.js';
import { ConnectMongoDB } from './config/db.js';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 8000;
dotenv.config();
const app = express();

app.use(cors());
app.use(
  express.json({
    limit: '50mb',
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.listen(PORT, () => {
  ConnectMongoDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
