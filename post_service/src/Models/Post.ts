import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PostSchema = new Schema({
   title: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   content: {
      type: String,
      required: true
   },
   mainImageUrl: {
      type: String,
      required: true
   },
   createdBy: {
      type: String,
      required: true
   },
   isFeatured: {
      type: Boolean,
      default: false
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

export default mongoose.model('Post', PostSchema)