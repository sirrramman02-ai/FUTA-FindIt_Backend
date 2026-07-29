import mongoose from 'mongoose'
const schema=new mongoose.Schema({userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},type:String,title:String,message:String,link:String,read:{type:Boolean,default:false}},{timestamps:true})
export default mongoose.models.Notification||mongoose.model('Notification',schema)
