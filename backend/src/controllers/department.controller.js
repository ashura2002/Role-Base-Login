import mongoose from "mongoose"
import { BadRequest, NotFound } from "../lib/ApiError.js"
import Departments from "../model/department.model.js"

// all department 
export const getAllDepartments = async(req, res, next) =>{
    try {
        const allDepartments = await Departments.find()
        res.status(200).json({message: allDepartments.length === 0? 'No Department Added': 'List Of Departments', data: allDepartments})
    } catch (error) {
        next(error)
    }
}

// all users on that department 
export const  getAllUserOnDepartment = async(req,res,nex) =>{

}

export const createDepartment = async(req, res, next) =>{
    const {departmentName,descriptions} = req.body
    try {
        const existedDepartment = await Departments.findOne({departmentName})
        if(existedDepartment) return next(new BadRequest('Department Already Exist'))

        const department = await Departments.create({
            departmentName: departmentName.toUpperCase(),
            descriptions: descriptions
        })

        res.status(201).json({message: 'Created Successfully', data: department})
    } catch (error) {
        next(error)
    }
}

export const editDepartment = async(req, res, next) => {
    const {departmentName, descriptions} = req.body
    const {departmentId} = req.params

    try {
        if(!mongoose.Types.ObjectId.isValid(departmentId)) return next(new BadRequest('Invalid ID'))
        const modifyDepartment = await Departments.findOneAndUpdate({_id: departmentId},
             {departmentName:departmentName, descriptions:descriptions}, {new: true})
        if(!modifyDepartment) return next(new NotFound('Department Not Found'))
        res.status(200).json({message:'Edited Successfully', data: modifyDepartment})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const deleteDepartment = async (req, res, next) => {
    const {departmentId} = req.params
    try {
        if(!mongoose.Types.ObjectId.isValid(departmentId)) return next(new BadRequest('Invalid ID'))
        const removeDepartment = await Departments.findOneAndDelete({_id: departmentId})
        if(!removeDepartment) return next(new NotFound('Department not found!'))
        res.status(200).json({message:'Deleted Successfully', data: removeDepartment})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

