import db from '../config/database.js';

export const getAllEmployees = async (req,res) => {

    const [employeesData] = await db.query(`
        SELECT * 
        FROM employees`);

        res.status(200).json(employeesData);
};

export const addEmployee = async (req,res) => {

    const {full_name, subdivision, position, 
           people_partner, leave_balance, photo } = req.body;
    try {
        const newEmployee = await db.query(`
            INSERT INTO employees (full_name, subdivision, position, people_partner, leave_balance, photo)
            VALUES (?,?,?,?,?,?)`, [full_name, subdivision, position, people_partner, leave_balance, photo]);
    
            res.status(201).json(newEmployee);

    } catch (error) {
        console.error('Error adding employee:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const employeeStatus = async (req,res) => {

    const { id, status } = req.body;
    try {
        const newEmployee = await db.query(`
            UPDATE employees SET status = ?
            WHERE id = ?`, [status, id]);
    
            res.status(200).json(newEmployee);

    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateEmployee = async (req, res) => {
   
    const { id, full_name, subdivision, position } = req.body;
    
    try {

        let query = 'UPDATE employees SET ';
        const params = [];

        if (full_name !== '') {
            query += 'full_name = ?, ';
            params.push(full_name);
        }
        if (subdivision !== '') {
            query += 'subdivision = ?, ';
            params.push(subdivision);
        }
        if (position !== '') {
            query += 'position = ?, ';
            params.push(position);
        }

        query = query.slice(0, -2);

        query += ' WHERE id = ?';
        params.push(id);

        const updateEmployee = await db.query(query, params);

        res.status(200).json(updateEmployee);
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

