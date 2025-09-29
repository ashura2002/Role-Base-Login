import mongoose from "mongoose";

const buildingSchema = new mongoose.Schema({
    buildingName:{type:String, required: true, uppercase: true},
})

const Building = new mongoose.model('Building', buildingSchema)
export default Building
// future update add rooms and populate on this schema