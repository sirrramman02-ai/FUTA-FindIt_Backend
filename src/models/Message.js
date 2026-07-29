import mongoose from 'mongoose'
const schema=new mongoose.Schema({claimId:{type:mongoose.Schema.Types.ObjectId,ref:'Claim',required:true},senderId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},message:{type:String,required:true,maxlength:1000}},{timestamps:true})
export default mongoose.models.Message||mongoose.model('Message',schema)
