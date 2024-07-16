import express from 'express';
import { getAllApprovalRqst, updateLeaveRqstStatus } from '../controllers/approvalRequest.js';

const router = express.Router();

router.get('/get_all_approval', getAllApprovalRqst);
router.post('/update_approval', updateLeaveRqstStatus);

export default router;