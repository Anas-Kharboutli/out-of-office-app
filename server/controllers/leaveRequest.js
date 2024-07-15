import db from '../config/database.js';

export const getAllLeaveRqst = async (req,res) => {

    const [leaveRequests] = await db.query(`
        SELECT * 
        FROM LeaveRequest`);

        res.status(200).json(leaveRequests);
};


export const addLeaveRqst = async (req, res) => {
    const { Employee, AbsenceReason, StartDate, EndDate, Comment } = req.body;
    
    try {

        await db.query('START TRANSACTION');

        const [newLeaveRequest] = await db.query(`
            INSERT INTO LeaveRequest (Employee, AbsenceReason, StartDate, EndDate, Comment)
            VALUES (?, ?, ?, ?, ?)`, [Employee, AbsenceReason, StartDate, EndDate, Comment]);

        const newRequestId = newLeaveRequest.insertId;

        const [employeeResult] = await db.query('SELECT People_Partner FROM Employees WHERE ID = ?', [Employee]);
        const approverId = employeeResult[0].People_Partner;

        await db.query(`
            INSERT INTO ApprovalRequest (Approver, LeaveRequest)
            VALUES (?, ?)`, [approverId, newRequestId]);

        await db.query('COMMIT');

        res.status(201).json({ message: 'Leave request and approval request created successfully' });

    } catch (error) {
        // Rollback transaction in case of error
        await db.query('ROLLBACK');
        console.error('Error adding Leave Request:', error);
        res.status(500).json({ error: 'Error adding Leave Request' });
    }
};
