import mongoose from "mongoose"
import { BadRequest, NotFound } from "../lib/ApiError.js"
import Departments from "../model/department.model.js"
import Users from "../model/user.model.js"
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs"

export const registerService = async(firstName, lastName, age, email, password, role, department) => {
    const findDepartment = await Departments.findOne({departmentName: department.toUpperCase()})
    if(!findDepartment) throw new NotFound('Department not found!')

    const existingUser = await Users.findOne({email: email})
    if(existingUser) throw new BadRequest('Email already existed, Try again')

    const user = new Users({
        firstName: firstName,
        lastName:lastName,
        age:age,
        email: email,
        password: password,
        role: role,
        department: findDepartment._id
    })

    await user.save()
    await user.populate({path:'department', select:'departmentName descriptions'})
    const {password:_, ...returnWithoutPassword} = user.toObject()
    return {message: 'Registration Successfully', user: returnWithoutPassword}
}

export const loginService = async(email, password) =>{
    const user = await Users.findOne({email: email}).select('+password')
    if(!user) throw new NotFound('Users not found!')
    
    const isPasswordIsMatch = await user.comparePassword(password)
    if(!isPasswordIsMatch) throw new BadRequest('Incorrect Password') 

    const token = jwt.sign(
        {
        userId: user._id,
        role: user.role,
        email: user.email,
        firstName:user.firstName,
        lastName:user.lastName,
        },
        process.env.JWT_SECRET,{
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    )

    const {password:_p, role, email:_e, ...userWithSafeData} = user.toObject()
    return {message:'Login Successfully', token, user: userWithSafeData}
}

export const getAllUsersService = async() =>{
    const allUsers = await Users.find({ role: { $in: ['user','program_head', 'hr', 'president', 'admin'] } })
    if(!allUsers) throw new NotFound('Users not found!')
    return {message: allUsers.length === 0? 'No Users Yet': 'All Users', user: allUsers}
}

export const usersWithTotalRequestService = async() =>{
    const userTotalRequest = await Users.find({role: 'user'}).populate({path: 'totalRequest'}).populate({path: 'department'})
    if(!userTotalRequest) throw new NotFound('Users not found!')
    return {message: userTotalRequest.length === 0? 'No users request yet': 'Users total request', user: userTotalRequest}
}

export const editUserService = async(id, firstName, password) => {
    if(!mongoose.Types.ObjectId.isValid(id)) throw new BadRequest('Invalid Id')
    const userToEdit = await Users.findById(id)
    if(!userToEdit) throw new NotFound('User not found')

    const updatedFields = {}
    if(firstName) updatedFields.firstName = firstName
    if(password){
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(password, salt)
        updatedFields.password = hashPassword
    }
    const modifyUser = await Users.findOneAndUpdate({_id: id}, updatedFields , {new:true})
    return {message:'Modify Succesfully', user: modifyUser}
}

export const deleteUserService = async (id) =>{
    if(!mongoose.Types.ObjectId.isValid(id)) throw new BadRequest('Invalid Id')
    const user = await Users.findOneAndDelete({_id:id})
    if(!user) throw new NotFound(`User not found!`)
    return {message: 'Deleted successfully', user: user}
}

export const getUserByIdService = async(id) => {
    if(!mongoose.Types.ObjectId.isValid(id)) throw new BadRequest('Invalid Id')
    const user = await Users.findById(id).populate({path:'department'})
    if(!user) throw new NotFound('User not found!')
    return {message: `User with the id of ${id}`, user: user}
}