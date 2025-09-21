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
        role:{type:String, enum:['admin', 'hr', 'president'], ref:'User'}, // sequence sa approver
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


const FormSchema = mongoose.model('Request-Form', requestFormSchema)
export default FormSchema
