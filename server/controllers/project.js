import db from '../config/database.js';

export const getAllProjects = async (req,res) => {

    const [projectsData] = await db.query(`
        SELECT * 
        FROM Project`);

        res.status(200).json(projectsData);
};

export const addProject = async (req,res) => {

    const { ProjectType, StartDate, EndDate, ProjectManager, Comment } = req.body;
    try {
        const newProject = await db.query(`
            INSERT INTO Project (ProjectType, StartDate, EndDate, ProjectManager, Comment)
            VALUES (?,?,?,?,?)`, [ProjectType, StartDate, EndDate, ProjectManager, Comment]);
    
            res.status(201).json(newProject);

    } catch (error) {
        console.error('Error adding Project:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const projectStatus = async (req,res) => {

    const { ID, Status } = req.body;
    try {
        const updateStatus = await db.query(`
            UPDATE Project SET Status = ?
            WHERE ID = ?`, [Status, ID]);
    
            res.status(200).json(updateStatus);

    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};