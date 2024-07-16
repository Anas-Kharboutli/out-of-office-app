import express from 'express';
import { getAllLeaveRqst, addLeaveRqst, cancelLeaveRqst } from '../controllers/leaveRequest.js';

const router = express.Router();

router.get('/get_all_leave', getAllLeaveRqst);
router.post('/create_new_leave', addLeaveRqst);
router.post('/cancel_leave-Request', cancelLeaveRqst);

export default router;