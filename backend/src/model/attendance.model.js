import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    user: {type:mongoose.Schema.Types.ObjectId, ref: 'User'},
    timeIn: {type:Date},
})

// virtual for attendance

const Attendance = mongoose.model('Attendance', attendanceSchema)
export default Attendance