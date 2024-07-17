import express from 'express';
import { getAllProjects, addProject, projectStatus } from '../controllers/project.js';

const router = express.Router();

router.get('/get_all_projects', getAllProjects);
router.post('/add_new_project', addProject);
router.post('/update_project_status', projectStatus);

export default router;