import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  userCode: { type: String, required: true, unique: true },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
  answers: [{ questionId: String, selected: String }],
  score: { type: Number, default: 0 },
  startedAt: { type: Date, default: Date.now },
  finishedAt: { type: Date }
});

export default mongoose.model('User', userSchema);
