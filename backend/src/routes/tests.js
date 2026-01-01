import express from 'express';
import Test from '../models/Test.js';
import Question from '../models/Question.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { search } = req.query;
  const query = search ? { title: { $regex: search, $options: 'i' } } : {};
  const tests = await Test.find(query);
  res.json(tests);
});

router.get('/:id', async (req, res) => {
  const test = await Test.findById(req.params.id);
  if (!test) return res.status(404).json({ error: 'Test not found' });
  res.json(test);
});

router.get('/private/:code', async (req, res) => {
  const test = await Test.findOne({ privateCode: req.params.code });
  if (!test) return res.status(404).json({ error: 'Test not found' });
  res.json(test);
});

export default router;
