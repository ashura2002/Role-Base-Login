import mongoose from "mongoose"
import { BadRequest, NotAuthorized, NotFound } from "../lib/ApiError.js"
import FormSchema from "../model/requestForm.model.js"
import Users from "../model/user.model.js"


// admin side
export const getAllRequestByAdminService = async() =>{
    const request = await FormSchema.find().populate({
        path: 'user',   select: 'firstName lastName email'
    })
    return {messaage: request.length === 0? 'No request added yet': 'List of request', requests: request}
}
// client side
export const getOwnUserRequestService = async(userId) => {
    const request = await FormSchema.find({user: userId})
    return {message: request.length === 0? 'No request added yet': 'List of your request', requests: request}
}

export const createRequestService = async (userId, requestType, startDate, endDate, reason, status) => {
    const rolesOrders = ['admin', 'program_head', 'hr', 'president']
    const allowedApprovers = await Users.find({role: {$in:rolesOrders}})

    // sequence ang pag approve sa request mao ni e value sa approvals nga properties sa schema
     const sequenceOfApprovals = rolesOrders.map((roles, index) => {
           const userToApprove = allowedApprovers.find((a) => a.role === roles)
             return {
              approvers:userToApprove._id,
              role:userToApprove.role,
              sequence:index + 1,
              status: 'Pending',
             }})

        // creating a form
         const leaveForm = new FormSchema({
            user:userId,
            requestType:requestType,
            startDate:startDate,
            endDate:endDate,
            reason:reason,
            status:status,
            approvals:sequenceOfApprovals
        })
        await leaveForm.save()
        return {messaage:'Created Successfully', requests: leaveForm}     
}

export const approveARequestService = async(userId, status, id) => {
        if(!mongoose.Types.ObjectId.isValid(id)) throw new BadRequest('Invalid Id')
             // find the request
            const recievedRequest = await FormSchema.findById(id)
            if(!recievedRequest) throw new NotFound('Reqeuest not found!')
                
            // check if the login user is an approver
            const isAnApprover = recievedRequest.approvals.find((a)=> a.approvers.toString() === userId)
            if(!isAnApprover) throw new NotAuthorized('You are not an approver')
            // check if the approver has already decided
            if(isAnApprover.status !== 'Pending') throw new BadRequest('You has already decided')
            
            // check if you're turn now to approve
            let canApprove = false
            if(isAnApprover.sequence === 0){
                canApprove = true
            }else{
                // check the sequence of the approver - checking if the sequence
                //  of the receivedRequest is less than the sequence of the approver login
                const currentApprover = recievedRequest.approvals.filter((a) => a.sequence < isAnApprover.sequence)
                // check if the previouse approver was already decided
                const isAlreadyDecided = currentApprover.every((a) => a.status !== 'Pending')
                if(!isAlreadyDecided) throw new NotAuthorized('Previous approver must decided first')
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
        return{messaage:`Request was ${status} successfully`, requests: recievedRequest}
}

export const deleteRequestService = async (id) => {
    if(!mongoose.Types.ObjectId.isValid(id)) throw new BadRequest('Invalid Id')
    const request = await FormSchema.findOneAndDelete({_id: id})
    if(!request) throw new NotFound('Request not found!')

    return {message: 'Deleted Successfully', requests: request}
}
