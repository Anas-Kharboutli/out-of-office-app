import db from '../config/database.js';

export const getAllApprovalRqst = async (req,res) => {

    const [approvalRequests] = await db.query(`
        SELECT * 
        FROM approvalRequest`);
        
        res.status(200).json(approvalRequests);
};
