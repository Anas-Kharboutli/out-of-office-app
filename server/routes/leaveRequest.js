import express from 'express';
import { getAllLeaveRqst, addLeaveRqst } from '../controllers/leaveRequest.js';

const router = express.Router();

router.get('/get_all_leave', getAllLeaveRqst);
router.post('/create_new_leave', addLeaveRqst);

export default router;