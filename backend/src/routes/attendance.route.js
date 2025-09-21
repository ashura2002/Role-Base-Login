import express from 'express'
import { getAllEmployeesAttendance, postAttendance } from '../controllers/attendance.controller.js';
import{verifyToken, checkIfAdmin} from '../middleware/authmiddleware.js'
const attendanceRouter = express.Router()

// for admin
attendanceRouter.get('/attendance',verifyToken, checkIfAdmin, getAllEmployeesAttendance)

// for employee/user
attendanceRouter.post('/attendance',verifyToken, postAttendance)

export default attendanceRouter;

