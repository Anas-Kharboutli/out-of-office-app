import db from '../config/database.js';

export const getAllEmployees = async (req,res) => {

    const [employeesData] = await db.query(`
        SELECT * 
        FROM employees`);

        res.status(200).json(employeesData);
};

export const addEmployee = async (req,res) => {

    const {full_name, subdivision, position, 
           people_partner, leave_balance } = req.body;

    const newEmployee = await db.query(`
        INSERT INTO employees (full_name, subdivision, position, people_partner, leave_balance)
        VALUES (?,?,?,?,?)`, [full_name, subdivision, position, people_partner, leave_balance]);

        res.status(201).json(newEmployee);
};