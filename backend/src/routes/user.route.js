import express from "express";
import {
  deleteUser,
  editUser,
  getAllUsers,
  login,
  registerAccount,
  getById,
  getAllUserWithTotalRequest
} from "../controllers/user.controller.js";
import { checkIfAdmin, verifyToken } from "../middleware/authmiddleware.js";
import {editUserValidator, loginValidator, registerValidator} from '../lib/InputValidator.js'
const userRoutes = express.Router();


userRoutes.post("/auth/login",loginValidator, login); // http://localhost:8000/api/auth/login

// admin ray maka access 
// http://localhost:8000/api/auth/register
userRoutes.post("/auth/register",registerValidator,verifyToken, registerAccount);

userRoutes.get("/users", verifyToken, checkIfAdmin, getAllUsers); // http://localhost:8000/api/users

// admin only get all users total request and overAllStatus
userRoutes.get("/users/total-request", verifyToken, checkIfAdmin, getAllUserWithTotalRequest); // http://localhost:8000/api/users

userRoutes.put("/users/:id",editUserValidator, verifyToken, checkIfAdmin, editUser);  // http://localhost:8000/api/users/someId

userRoutes.delete("/users/:id", verifyToken, checkIfAdmin, deleteUser);

userRoutes.get("/users/:id", verifyToken, checkIfAdmin, getById);

export default userRoutes;
