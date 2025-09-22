import Attendance from "../model/attendance.model.js"

export const getAllEmployeesAttendance = async(req,res,next) =>{
      try {
        const employeesAttendance = await Attendance.find().populate('user')
        res.status(200).json({message: 'Attendance of all users', data:employeesAttendance})
      } catch (error) {
        next(error)
      }
}


// need arduino
export const postAttendance = async(req, res, next) =>{
    const {timeIn} = req.body
    const {userId} = req.person
    try {
        const employeePostedAttendance = await Attendance.create({
            user:userId,
            timeIn:timeIn
        })
        res.status(201).json({message: 'Attendance Successfully Recorded!', data:employeePostedAttendance})
    } catch (error) {
        console.log(error)
    }
}