import mongoose from "mongoose";

const buildingSchema = new mongoose.Schema({
    buildingName:{type:String, required: true},
})

const Building = new mongoose.model('Building', buildingSchema)
export default Building