import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    subjectName: {type:String, required: true},
    subjectDescriptions: {type:String, required: true},
    controlNumber: {type:String, require},
})

const Subjects = new mongoose.model('Subjects', subjectSchema)
export default Subjects;