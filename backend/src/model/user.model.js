import mongoose, { VirtualType } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minlength: 5,
      required: true,
      lowercase: true,
      trim: true,
    },
    lastName: { type: String, minlength: 5, required: true, lowercase: true },
    age: { type: Number, index: true, required: true, min: 1, max: 110, },
    email: { type: String, required: true, unique: true, lowercase:true},
    password: { type: String, required: true, select:false}, // automatic dili ma include ang password pag get method
    role: { // dropwdown sa UI
      type: String,
      enum: ["admin", "user", 'program_head', 'hr', 'president'], // e butang sa dropdown
      default: "user",
      lowercase:true,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.virtual('totalRequest',{
  ref:'Request-Form',
  localField: '_id',
  foreignField: 'user',
  count:true
})

userSchema.virtual('fullname').get(function(){
  return `${this.firstName} ${this.lastName}`
})

userSchema.virtual('finalStatus',{
  ref:'Request-Form',
  localField: '_id',
  foreignField: 'user'
})

// remove extra id and version built in by virtual to avoid duplacate _id and id
userSchema.set('toJSON', {virtuals: true, versionKey:false,  transform: (_, ret)=>{
  delete ret.id
  return ret
}})
userSchema.set('toObject', {virtuals: true})

// hashing password middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// creating a custom method
userSchema.methods.comparePassword = async function (currentPassword) {
  return await bcrypt.compare(currentPassword, this.password);
};

const Users = mongoose.model("User", userSchema);
export default Users;
