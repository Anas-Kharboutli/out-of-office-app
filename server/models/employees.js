import db from '../config/database.js';


export class Employee {
    static getAll(callback) {
        db.query('SELECT * FROM employees', callback);
    }
};

