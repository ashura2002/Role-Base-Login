import mongoose from 'mongoose'

const departmentSchema = new mongoose.Schema({
    departmentName: {type: String, required: true, default: ''},
    descriptions: {type: String, required: true, default: ''}
})
const Departments = mongoose.model('Departments', departmentSchema)
export default Departments