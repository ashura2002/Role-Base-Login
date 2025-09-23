import jwt from "jsonwebtoken";
import Users from "../model/user.model.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import ApiError, { BadRequest, NotFound } from "../lib/ApiError.js";
import {validationResult} from 'express-validator'
import Departments from "../model/department.model.js";


export const registerAccount = async (req, res, next) => {
  const errorMsg = validationResult(req)
  if(!errorMsg.isEmpty()) return next(new ApiError('Validation Error', 400, errorMsg.array()))

  const { firstName, lastName, age, email, password, role, department } = req.body;
  try {
    const existedEmail = await Users.findOne({email: email})
    if(existedEmail) return next(new ApiError(`Can't create email already exist, try again`, 400))
      
    const findDepartment = await Departments.findOne({departmentName: department.toUpperCase()})
    if(!findDepartment) return next(new NotFound('Department not found, Select other department!'))
    const newUser = new Users({
      firstName: firstName,
      lastName:lastName,
      age:age,
      email: email,
      password: password,
      role: role,
      department: findDepartment._id
    })
    await newUser.save()
    await newUser.populate({path: 'department', select: 'departmentName descriptions'})
    res.status(201).json({message: 'Created successfully', data:newUser})
  } catch (error) {
    console.log(error)
    next(error)
  }
}; 

export const login = async (req, res,next) => {
  const errorMsg = validationResult(req)
  if(!errorMsg.isEmpty()) return next(new ApiError('Validation Error', 400, errorMsg.array()))

  const { email, password, firstName } = req.body;

  try {
    const user = await Users.findOne({ email }).select('+password'); // need to include pass kay by default di sya madala agis schema na validation
    // check if user exist
    if (!user) return next(new NotFound('Account Not Found!'));

    // check if firtname exist
    if (user.firstName !== firstName)
      return next(new ApiError('Wrong Firstname', 404))

    // check if password is beingg hash
    const isPasswordMatch = await user.comparePassword(password); // aron ma compare sa bcrypt ang passwword gikan sa body ug password from DB
    if (!isPasswordMatch)
      return next(new ApiError('Incorrect Password', 401));

    //assigning token
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    //  remove password to the reponse object 
    const {password:_, ...userWithoutPassword} = user.toObject()


    res.status(200).json({ message: "Login Successfully", token, data: userWithoutPassword });
  } catch (error) {
    next(error)
  }
}; // try to refactor use firstname and password only on login

// use middleware for this and check the userRole is admin , 
export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await Users.find({ role: { $in: ['user','program_head', 'hr', 'president', 'admin'] } })
    if(!allUsers) return next(new NotFound(`No Users Found`))
    res.status(200).json({ message: "All Users", data: allUsers });
  } catch (error) {
    console.log(error)
    next(error) 
  }
};

// pang dashboard 
export const getAllUserWithTotalRequest = async(req, res, next) =>{
  try {
    const usersAndTotalRequest = await Users.find({role: 'user'}).populate({
      path:'totalRequest'
    }).populate({
      path: 'finalStatus',
      select: 'overAllStatus.status'
    }) // select ang importanting fields para dili bloated ang response
    if(!usersAndTotalRequest) return next(new NotFound(`No Users Found`))
      res.status(200).json({message: 'Users total request', data: usersAndTotalRequest})
  } catch (error) {
    console.log(error)
    next(error)
  }
}


export const editUser = async (req, res,next) => {
  const errorMsg = validationResult(req)
  if(!errorMsg.isEmpty()) return next(new ApiError('Validation Error', 400, errorMsg.array()))

  const { firstName, password } = req.body;
  const { id } = req.params;
  const salt = await bcrypt.genSalt()
  const hashPassword = await bcrypt.hash(password, salt)

  try {
    if(!mongoose.Types.ObjectId.isValid(id)) return next(new NotFound('Id not found'))

    const modifyUser = await Users.findOneAndUpdate({_id: id}, {firstName: firstName, password: hashPassword}, {new: true})
    if(!modifyUser) return res.status(404).json({message: 'User not found'})
    res.status(200).json({message: `User with the Id of ${id} is Successfully edited`, data: modifyUser})
  } catch (error) {
    next(error)
  }
};

export const deleteUser = async (req, res,next) => {
  const { id } = req.params;
  try {
    if(!mongoose.Types.ObjectId.isValid(id)) return next(new NotFound('Id not found!'))

    const removeUser = await Users.findOneAndDelete({_id: id})
    if(!removeUser) return next(new NotFound('User not found!'))
    res.status(200).json({ message: `User with the id of ${id} successfully deleted!`, data: removeUser });
  } catch (error) {
    next(error)
  }
};

export const getById = async (req, res,next) => {
  const { id } = req.params;
  try {
    if(!mongoose.Types.ObjectId.isValid(id)) return  next(new NotFound('Id not found!'))

    const getUserById = await Users.findOne({_id:id})
    if(!getUserById) return next(new NotFound('User not found'))
    res.status(200).json({ message: `Get user by id ${id}`, data: getUserById });
  } catch (error) {
    next(error)
  }
};
