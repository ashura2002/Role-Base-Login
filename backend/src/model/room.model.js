import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomNumber: {type:Number, required:true},
    building: {type:mongoose.Schema.Types.ObjectId, ref:'Building'}
})

const Rooms = new mongoose.model('Rooms', roomSchema)
export default Rooms