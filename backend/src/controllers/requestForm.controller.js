import { validationResult } from "express-validator";
import ApiError from "../lib/ApiError.js";
import { approveARequestService, createRequestService, deleteRequestService,
     getAllRequestByAdminService, getOwnUserRequestService } from "../services/requestForm.service.js";

// get all admin request
export const getAllRequestAdmin = async(req, res, next) =>{
    try {
        const listOfAllForms = await getAllRequestByAdminService()
        res.status(200).json(listOfAllForms)
    } catch (error) {
        next(error)
    }
}

// get all own users request  - user 
export const getAllUsersRequest = async (req, res,next) => {
    const {userId} = req.person // id  sa user na nakalogin
    try {
        const allRequest = await getOwnUserRequestService(userId)
        res.status(200).json(allRequest)
    } catch (error) {
        console.log(error)
        next(error)
    }   
} 

// create user request  
export const createRequest = async(req, res, next) => {
    const errMsg = validationResult(req)
    if(!errMsg.isEmpty()) return next(new ApiError('Validation Error', 400, errMsg.array()))
    const {requestType, startDate, endDate, reason, status} = req.body
    const {userId} = req.person
    try {
        const leaveForm = await createRequestService(userId, requestType, startDate, endDate, reason, status)
        res.status(201).json(leaveForm)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

// approve a request 
export const approveARequest = async (req, res, next) => {
    const {userId} = req.person;
    const {status} = req.body;
    const {id} = req.params
    try {
       const decided = await approveARequestService(userId, status, id)    
       res.status(200).json(decided)
    } catch (error) {
        next(error)
    }
};

// delete users request
export const deleteRequest = async(req, res, next) =>{
    const {id} = req.params
    try {
        const removeRequest = await deleteRequestService(id)
        res.status(200).json(removeRequest)
    } catch (error) {
        next(error)
    }
}
