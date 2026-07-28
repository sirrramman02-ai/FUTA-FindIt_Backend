import mongoose from 'mongoose'
const schema = new mongoose.Schema({ lostReportId: mongoose.Schema.Types.ObjectId, foundReportId: mongoose.Schema.Types.ObjectId, score: Number, reasons: [String], status: { type: String, default: 'suggested' } }, { timestamps: true })
export default mongoose.models.Match || mongoose.model('Match', schema)
