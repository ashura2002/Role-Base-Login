import express from 'express'
const departmentRoute = express.Router()
import {createDepartment, deleteDepartment, editDepartment, getAllDepartments, getAllUserOnDepartment} from '../controllers/department.controller.js'
import {verifyToken, checkIfAdmin} from '../middleware/authmiddleware.js'

departmentRoute.get('/departments',verifyToken, checkIfAdmin, getAllDepartments)
departmentRoute.get('/departments/:id/users', verifyToken, checkIfAdmin, getAllUserOnDepartment)
departmentRoute.post('/departments', verifyToken, checkIfAdmin, createDepartment)
departmentRoute.put('/departments/:departmentId', verifyToken, checkIfAdmin, editDepartment)
departmentRoute.delete('/departments/:departmentId', verifyToken, checkIfAdmin, deleteDepartment)


export default departmentRoute