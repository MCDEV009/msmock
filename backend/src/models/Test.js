import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  visibility: { type: String, enum: ['PUBLIC', 'PRIVATE'], default: 'PUBLIC' },
  privateCode: { type: String, sparse: true, unique: true },
  duration: { type: Number, required: true },
  status: { type: String, enum: ['active', 'finished'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Test', testSchema);
