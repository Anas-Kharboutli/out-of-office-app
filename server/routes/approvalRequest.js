import express from 'express';
import { getAllApprovalRqst } from '../controllers/approvalRequest.js';

const router = express.Router();

router.get('/get_all_approval', getAllApprovalRqst);


export default router;