import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   role: {
      type: String,
      default: ""
   },
   createdAt: {
      type: Date,
      default: Date.now
   },
   updatedAt: {
      type: Date,
      default: Date.now
   }
})

export default mongoose.model('User', UserSchema)