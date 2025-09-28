import mongoose from 'mongoose'

const departmentSchema = new mongoose.Schema({
    departmentName: {type: String, required: true, default: '', uppercase: true},
    descriptions: {type: String, required: true, default: ''}
})

departmentSchema.virtual('userWithDepartment', {
    ref:'User',
    localField:'_id',
    foreignField: 'department'
})
// remove the duplicate id property make by virtual property
departmentSchema.set('toJSON', {virtuals: true, versionKey:false, transform:(_,doc) => {
    delete doc.id 
    return doc
}})
departmentSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (_, doc) => {
    delete doc.id
    return doc
  }
})
const Departments = mongoose.model('Departments', departmentSchema)
export default Departments