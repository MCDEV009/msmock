import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  questionText: { type: String, required: true },
  image: { type: String },
  options: {
    A: { type: String, required: true },
    B: { type: String, required: true },
    C: { type: String, required: true },
    D: { type: String, required: true }
  },
  correctAnswer: { type: String, enum: ['A', 'B', 'C', 'D'], required: true },
  language: { type: String, enum: ['uz', 'ru', 'en', 'qr'], default: 'uz' }
});

export default mongoose.model('Question', questionSchema);
