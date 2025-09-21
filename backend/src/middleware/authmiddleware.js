import jwt from "jsonwebtoken";
import { NotAuthorized } from "../lib/ApiError.js";
// authentication
export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return next(new NotAuthorized('Provide a token'))

  const token = authHeader.split(" ")[1];
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.person = decoded;
    next();
  } catch (error) {
    next(new NotAuthorized('Invalid or expired token'))
  }
};

export const checkIfAdmin = (req, res, next) => {
  if (!req.person) return next(new NotAuthorized('Unauthorized'))

  const { role } = req.person;
  const rolesAllow = ['admin', 'hr', 'president', 'program head']  
  if (!rolesAllow.includes(role))
    return next(new NotAuthorized('Access Denied, Admins only'))

  next();
};

// only the user employee can submit a form
export const checkIfEmployeeToRequestForm = (req,res,next) => {
  if(!req.person) return next(new NotAuthorized('Only employees can create a form'))

  const {role} = req.person
  if(role !== 'user') return next(new NotAuthorized('Employee can view there own request or submit form only'))
    next()
}