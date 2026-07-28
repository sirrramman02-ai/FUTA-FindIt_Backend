import mongoose from 'mongoose'
const reportSchema = new mongoose.Schema({ type: { type: String, enum: ['lost','found'], required: true }, description: { type: String, required: true }, category: String, brand: String, model: String, color: String, distinguishingFeatures: [String], keywords: [String], location: String, dateOccurred: Date, approximateTime: String, images: [String], status: { type: String, default: 'active' }, userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } }, { timestamps: true })
reportSchema.index({ type: 1, status: 1, category: 1, location: 1 }); reportSchema.index({ keywords: 1 })
export default mongoose.models.Report || mongoose.model('Report', reportSchema)
