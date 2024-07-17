import db from '../config/database.js';

export const getAllEmployees = async (req,res) => {

    const [employeesData] = await db.query(`
        SELECT * 
        FROM Employees`);

        res.status(200).json(employeesData);
};

export const addEmployee = async (req,res) => {

    const {FullName, Subdivision, Position, 
        People_Partner, Leave_Balance, Photo } = req.body;
    try {
        const newEmployee = await db.query(`
            INSERT INTO Employees (FullName, Subdivision, Position, people_partner, leave_balance, photo)
            VALUES (?,?,?,?,?,?)`, [FullName, Subdivision, Position, People_Partner, Leave_Balance, Photo]);
    
            res.status(201).json(newEmployee);

    } catch (error) {
        console.error('Error adding employee:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const employeeStatus = async (req,res) => {

    const { ID, Status } = req.body;
    try {
        const updateStatus = await db.query(`
            UPDATE Employees SET Status = ?
            WHERE ID = ?`, [Status, ID]);
    
            res.status(200).json(updateStatus);

    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateEmployee = async (req, res) => {
   
    const { ID, FullName, Subdivision, Position } = req.body;
    
    try {

        let query = 'UPDATE Employees SET ';
        const params = [];

        if (FullName !== '') {
            query += 'FullName = ?, ';
            params.push(FullName);
        }
        if (Subdivision !== '') {
            query += 'Subdivision = ?, ';
            params.push(Subdivision);
        }
        if (Position !== '') {
            query += 'Position = ?, ';
            params.push(Position);
        }

        query = query.slice(0, -2);

        query += ' WHERE ID = ?';
        params.push(ID);

        const updateEmployee = await db.query(query, params);

        res.status(200).json(updateEmployee);
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

