import mongoose from 'mongoose'
const schema = new mongoose.Schema({ username: { type: String, required: true, unique: true }, name: String, email: { type: String, unique: true }, contactEmail: String, contactWhatsapp: String, passwordHash: String, studentId: String, department: String, faculty: String, level: String, role: { type: String, default: 'student' }, suspended: { type: Boolean, default: false } }, { timestamps: true })
export default mongoose.models.User || mongoose.model('User', schema)
