import express from 'express';
import Question from '../models/Question.js';

const router = express.Router();

router.get('/test/:testId', async (req, res) => {
  const questions = await Question.find({ testId: req.params.testId });
  res.json(questions);
});

export default router;
