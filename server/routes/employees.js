import express from 'express';
import { getAllEmployees, addEmployee, employeeStatus, updateEmployee } from '../controllers/employees.js';

const router = express.Router();

router.get('/get_all_employees', getAllEmployees);
router.post('/add_employee', addEmployee);
router.post('/update_status', employeeStatus);
router.post('/update_employee', updateEmployee);

export default router;