import express from 'express'
const departmentRoute = express.Router()
import {createDepartment, deleteDepartment, editDepartment, getAllDepartments} from '../controllers/department.controller.js'
import {verifyToken, checkIfAdmin} from '../middleware/authmiddleware.js'

departmentRoute.get('/departments',verifyToken, checkIfAdmin, getAllDepartments)
departmentRoute.post('/departments', verifyToken, checkIfAdmin, createDepartment)
departmentRoute.put('/departments/:departmentId', verifyToken, checkIfAdmin, editDepartment)
departmentRoute.delete('/departments/:departmentId', verifyToken, checkIfAdmin, deleteDepartment)


export default departmentRoute