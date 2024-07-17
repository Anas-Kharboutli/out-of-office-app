import express from'express';
import dotenv from 'dotenv';
import cors from 'cors';
import employeesRoute from './routes/employees.js';
import leaveRoute     from './routes/leaveRequest.js';
import approvalRoute  from './routes/approvalRequest.js';
import projectRoute   from './routes/project.js';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();


app.use('/api', employeesRoute);
app.use('/api', leaveRoute);
app.use('/api', approvalRoute);
app.use('/api', projectRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port: ${port}`));
