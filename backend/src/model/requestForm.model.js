import mongoose from 'mongoose'


const requestFormSchema = new mongoose.Schema({
    name: {type: String, lowercase:true},
    email: {type: String, lowercase:true},
    requestType: {type: String, enum:['Sick Leave', 'Vacation', 'Personal Leave', 'Other'], required:true},
    startDate: {type: Date, required:true},
    endDate: {type: Date, required:true},
    reason: {type: String},
    user:{
        ref:'User',
        type: mongoose.Schema.Types.ObjectId,
    },
    
    approvals:[
        {
        approvers: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
        role:{type:String, enum:['admin', 'program_head', 'hr', 'president'], ref:'User'}, // sequence sa approver
        sequence:{type:Number}, // index sa approver
        status: {type: String, enum:['Pending', 'Approved', 'Rejected'], default: 'Pending'},
        timeIn:{type: Date}
        }
    ],
    overAllStatus:{
        status:{type:String, enum:['Pending', 'Approved', 'Rejected'], default:'Pending'}
    }
},{
    timestamps:true
})

requestFormSchema.virtual('CalculateDays').get(function(){
  const getDays = this.endDate.getTime() - this.startDate.getTime()
  const result = Math.floor(getDays/(1000 * 60 * 60 * 24)) + 1
  return result
})

requestFormSchema.set('toJSON', {virtuals: true, versionKey: false})
requestFormSchema.set('toObject', {virtuals: true, versionKey: false})


const FormSchema = mongoose.model('Request-Form', requestFormSchema)
export default FormSchema
