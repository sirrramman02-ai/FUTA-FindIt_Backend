import mongoose from 'mongoose'
const schema = new mongoose.Schema({ name: String, email: { type: String, unique: true }, passwordHash: String, studentId: String, department: String, faculty: String, level: String, role: { type: String, default: 'student' }, suspended: { type: Boolean, default: false } }, { timestamps: true })
export default mongoose.models.User || mongoose.model('User', schema)
