import express from'express';
import dotenv from 'dotenv';
import cors from 'cors';
import employeesRoute from './routes/employees.js';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();


app.use('/api', employeesRoute);



const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port: ${port}`));
