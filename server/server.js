import express from 'express';
import dotenv, { config } from 'dotenv';
dotenv.config();
import cors from 'cors';
import morgan from 'morgan';

import { ConnectDB } from './config/db.js';


const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Server is running');
});



app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
    ConnectDB();
})


