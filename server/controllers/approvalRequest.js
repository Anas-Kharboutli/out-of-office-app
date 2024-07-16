import db from '../config/database.js';

export const getAllApprovalRqst = async (req,res) => {

    const [approvalRequests] = await db.query(`
        SELECT * 
        FROM approvalRequest`);
        
        res.status(200).json(approvalRequests);
};


const updateLeaveBalance = async (employeeId, days) => {
    const [employee] = await db.query('SELECT Leave_Balance FROM Employees WHERE ID = ?', [employeeId]);
    const currentBalance = employee[0].Leave_Balance;
    const newBalance = currentBalance - days;

    await db.query('UPDATE Employees SET Leave_Balance = ? WHERE ID = ?', [newBalance, employeeId]);
}

export const updateLeaveRqstStatus = async (req, res) => {
    
    const { LeaveRequestId, Status, Comment } = req.body;

    try {
        await db.query('START TRANSACTION');

        await db.query(`UPDATE LeaveRequest SET Status = ? 
                        WHERE ID = ?`, [Status, LeaveRequestId]);

        await db.query(`UPDATE ApprovalRequest SET Status = ?, Comment = ?
                        WHERE LeaveRequest = ?`, [Status, Comment, LeaveRequestId]);

        if (Status === 'Approved') {
         
            const [leaveRequest] = await db.query(
               `SELECT Employee, StartDate, EndDate FROM LeaveRequest 
                WHERE ID = ?`, [LeaveRequestId]);

            const { Employee, StartDate, EndDate } = leaveRequest[0];

            const startDateObj = new Date(StartDate);
            const endDateObj = new Date(EndDate);
            const duration = Math.ceil((endDateObj - startDateObj) / (1000 * 60 * 60 * 24));

            await updateLeaveBalance(Employee, duration);
        }

        await db.query('COMMIT');

        res.status(200).json({ message: 'Leave request status updated successfully' });

    } catch (error) {
        await db.query('ROLLBACK');
        console.error('Error updating Leave Request status:', error);
        res.status(500).json({ error: 'Error updating Leave Request status' });
    }
};