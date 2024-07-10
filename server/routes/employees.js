import express from 'express';
import { getAllEmployees, addEmployee } from '../controllers/employees.js';

const router = express.Router();

router.get('/get_all_employees', getAllEmployees);
router.post('/add_employee', addEmployee);

export default router;