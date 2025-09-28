import mongoose from "mongoose"
import { BadRequest, NotFound } from "../lib/ApiError.js"
import Departments from "../model/department.model.js"



export const getAllDepartmentService = async() =>{
    const department = await Departments.find()
    if(!department) throw new NotFound('Department not found!')
    return {message: department.length === 0? 'No deparment added yet': 'List Of department', departments: department}
}

export const getUsersByDepartment = async (id) => {
    if(!mongoose.Types.ObjectId.isValid(id)) throw new BadRequest('Invalid Id')
    const users = await Departments.findById(id).populate({path: 'userWithDepartment', 
    select: 'firstName lastName email fullName -department'})
    if(!users) throw new NotFound('No users found on this department')
    return {message: users.userWithDepartment.length === 0? 'No users found on this department':
     'List of all users on this department', departments: users}
}

export const createDepartmentService = async(departmentName, descriptions) =>{
    const existingDepartment  = await Departments.findOne({departmentName})
    if(existingDepartment) throw new BadRequest('Department already exist')
    const deparment = new Departments({
        departmentName: departmentName.toUpperCase(),
        descriptions: descriptions
    })
    await deparment.save()
    return{message:'Created successfully', departments:deparment}
}

export const editDepartmentService = async(departmentId, departmentName, descriptions) =>{
    if(!mongoose.Types.ObjectId.isValid(departmentId)) throw new BadRequest('Invalid Id')
    const deparment = await Departments.findOneAndUpdate({_id: departmentId}, {
    departmentName: departmentName, descriptions: descriptions}, {new: true})
   return {message: 'Edited successfully', departments: deparment}
}

export const deleteDepartmentService = async (departmentId) => {
    if(!mongoose.Types.ObjectId.isValid(departmentId)) throw new BadRequest('Invalid Id')
    const deparment = await Departments.findOneAndDelete({_id: departmentId})
    if(!deparment) throw new NotFound('Department not found!')
    return {message: 'Deleted successfully', departments: deparment}
}
