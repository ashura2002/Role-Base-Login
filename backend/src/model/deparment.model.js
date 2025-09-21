import mongoose from 'mongoose'

const departmentSchema = new mongoose.Schema({
    departmentName: {type: String, required: true},
    descriptions: {type: String, required: true}
})

const Departments = mongoose.model('Departments', departmentSchema)
export default Departments