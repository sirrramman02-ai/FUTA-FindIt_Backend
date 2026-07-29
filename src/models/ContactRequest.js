import mongoose from 'mongoose'
const schema=new mongoose.Schema({lostReportId:{type:mongoose.Schema.Types.ObjectId,ref:'Report',required:true},foundReportId:{type:mongoose.Schema.Types.ObjectId,ref:'Report',required:true},finderId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},ownerId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},message:{type:String,required:true},status:{type:String,default:'pending'}},{timestamps:true})
export default mongoose.models.ContactRequest||mongoose.model('ContactRequest',schema)
