import ApiError from "../lib/ApiError.js";
import {validationResult} from 'express-validator'
import { deleteUserService, editUserService, getAllUsersService, getCurrentAccountInfo, getUserByIdService, loginService, registerService, usersWithTotalRequestService }
from "../services/users.service.js";

export const registerAccount = async (req, res, next) => {
  const errorMsg = validationResult(req)
  if(!errorMsg.isEmpty()) return next(new ApiError('Validation Error', 400, errorMsg.array()))

  const { firstName, lastName, age, email, password, role, department } = req.body;
  try {
    const createAccount = await registerService(firstName, lastName, age, email, password, role, department)
      res.status(201).json(createAccount)
  } catch (error) {
    console.log(error)
    next(error)
  }
}; 

export const login = async(req,res,next) =>{
  const {email, password} = req.body
    try {
      const loginUser = await loginService(email, password)
      res.status(200).json(loginUser)
    } catch (error) {
      console.log(error)
      next(error)
    }
}
// use middleware for this and check the userRole is admin , 
export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers  = await getAllUsersService()
    res.status(200).json(allUsers)
  } catch (error) {
    console.log(error)
    next(error) 
  }
};
// pang dashboard 
export const getAllUserWithTotalRequest = async(req, res, next) =>{
  try {
    const user = await usersWithTotalRequestService()
    res.status(200).json(user)
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
  try {
    const user = await editUserService(id, firstName, password)
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
};

export const deleteUser = async (req, res,next) => {
  const { id } = req.params;
  try {
    const user = await deleteUserService(id)
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
};

export const getById = async (req, res,next) => {
  const { id } = req.params;
  try {
    const user = await getUserByIdService(id)
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
};

export const getCurrentLoginAccount = async(req, res, next) => {
  const {userId} = req.person
    try {
      const currentAccount = await getCurrentAccountInfo(userId)
      res.status(200).json(currentAccount)
    } catch (error) {
      console.log(error)
      next(error)
    }
}