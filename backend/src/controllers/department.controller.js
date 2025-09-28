import mongoose from "mongoose"
import { BadRequest, NotFound } from "../lib/ApiError.js"
import Departments from "../model/department.model.js"
import { createDepartmentService, deleteDepartmentService, editDepartmentService, getAllDepartmentService, getUsersByDepartment } from "../services/department.service.js"

// all department 
export const getAllDepartments = async(req, res, next) =>{
    try {
        const allDepartments = await getAllDepartmentService()
        res.status(200).json(allDepartments)
    } catch (error) {
        next(error)
    }
}

// all users on that department 
export const  getAllUserOnDepartment = async(req,res,next) =>{
    const {id} = req.params
    try {
      const usersOnDepartment = await getUsersByDepartment(id)
      res.status(200).json(usersOnDepartment)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const createDepartment = async(req, res, next) =>{
    const {departmentName,descriptions} = req.body
    try {
        const department = await createDepartmentService(departmentName, descriptions)
        res.status(201).json(department)
    } catch (error) {
        next(error)
    }
}

export const editDepartment = async(req, res, next) => {
    const {departmentName, descriptions} = req.body
    const {departmentId} = req.params
    try {
        const editedDeparment = await editDepartmentService(departmentId, departmentName, descriptions)
        res.status(200).json(editedDeparment)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const deleteDepartment = async (req, res, next) => {
    const {departmentId} = req.params
    try {
        const result = await deleteDepartmentService(departmentId)
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        next(error)
    }
}
