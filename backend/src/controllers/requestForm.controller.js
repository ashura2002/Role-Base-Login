import { validationResult } from "express-validator";
import FormSchema from "../model/requestForm.model.js";
import Users from '../model/user.model.js'
import ApiError, { BadRequest, NotAuthorized, NotFound } from "../lib/ApiError.js";

// get all admin request
export const getAllRequestAdmin = async(req, res, next) =>{
    try {
        const listOfAllForms = await FormSchema.find().populate({
            path:'user',
            select: 'firstName lastName email'
        })
        res.status(200).json({
            message: listOfAllForms.length === 0? 'No Request Added Yet!': 'List Request',
            requests: listOfAllForms.length === 0? []: listOfAllForms
        })
    } catch (error) {
        next(error)
    }
}

// get all own users request  - user 
export const getAllUsersRequest = async (req, res,next) => {
    const {userId} = req.person // id  sa user na nakalogin
    try {
        const allRequest = await FormSchema.find({user: userId})
        res.status(200).json({
            message: allRequest.length === 0? 'No Request Added Yet!': 'Request List',
            request: allRequest.length === 0? []: allRequest
        })
    } catch (error) {
        next(error)
    }   
} 

// create user request  
const rolesOrders = ['admin', 'hr', 'president']
export const createRequest = async(req, res, next) => {
    const errMsg = validationResult(req)
    if(!errMsg.isEmpty()) return next(new ApiError('Validation Error', 400, errMsg.array()))

    const {requestType, startDate, endDate, reason, status} = req.body
    const {userId} = req.person
    
    try {
        // get all allowed approvers
        const allowedApprovers = await Users.find({role:{$in:rolesOrders}})
        if(!allowedApprovers || allowedApprovers.length === 0) return next(new NotAuthorized('You are not an approver'))
 
        // e sequence ang pag approve sa request mao ni e value sa approvals nga properties sa schema
        const sequenceOfApprovals = rolesOrders.map((roles, index) => {
            const userToApprove = allowedApprovers.find((a) => a.role === roles)
            return {
              approvers:userToApprove._id,
              role:userToApprove.role,
              sequence:index + 1,
              status: 'Pending',
            }
        })
 // creating a form
        const leaveForm = await FormSchema.create({
            user:userId,
            requestType:requestType,
            startDate:startDate,
            endDate:endDate,
            reason:reason,
            status:status,
            approvals:sequenceOfApprovals
        })
    res.status(201).json({message:'Submitted Succesfully', reqeust: leaveForm})
    } catch (error) {
        next(error)
    }
}

// approve a request 
export const approveARequest = async (req, res, next) => {
    const {userId} = req.person;
    const {status} = req.body;
    const {id} = req.params
    try {
            // find the request
            const recievedRequest = await FormSchema.findById(id)
            if(!recievedRequest) return next(new NotFound('Reqeuest not found!'))
                
            // check if the login user is an approver
            const isAnApprover = recievedRequest.approvals.find((a)=> a.approvers.toString() === userId)
            if(!isAnApprover) return next(new NotAuthorized('You are not an approver'))
            // check if the approver has already decided
            if(isAnApprover.status !== 'Pending') return next(new BadRequest('You has already decided'))
            
            // check if you're turn now to approve
            let canApprove = false
            if(isAnApprover.sequence === 0){
                canApprove = true
            }else{
                // check the sequence of the approver - checking if the sequnce of the receivedRequest is less than the sequence of the approver login
                const currentApprover = recievedRequest.approvals.filter((a) => a.sequence < isAnApprover.sequence)
                // check if the previouse approver was already decided
                const isAlreadyDecided = currentApprover.every((a) => a.status !== 'Pending')
                if(!isAlreadyDecided) return next(new NotAuthorized('Previous approver must decided first'))
                canApprove = true
            }

            if(canApprove){
                // upate the status of the request
               isAnApprover.status = status
               isAnApprover.timeIn = new Date()

               // checking all the element if all was approved or has atleast one value has rejected
               const allApproved = recievedRequest.approvals.every((a) => a.status === 'Approved')
               const hasRejected = recievedRequest.approvals.some((a) => a.status === 'Rejected')
               
               //update the overAllStatus
               if(allApproved){
                recievedRequest.overAllStatus.status = 'Approved'
               }else if(hasRejected){
                recievedRequest.overAllStatus.status = 'Rejected'
               }
            }

            // save the changes on databased
            await recievedRequest.save()
            res.status(200).json({message: `The request was ${status}`, request: recievedRequest})
    } catch (error) {
        next(error)
    }
};

// delete users request
export const deleteRequest = async(req, res, next) =>{
    const {id} = req.params
    try {
        const removeRequest = await FormSchema.findByIdAndDelete({_id: id})
        if(!removeRequest) return next(new NotFound('Request Not Found!'))

        res.status(200).json({message: 'Request Deleted Succesfully', request: removeRequest})
    } catch (error) {
        next(error)
    }
}
