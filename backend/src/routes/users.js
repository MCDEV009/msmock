import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { fullName, userCode, testId } = req.body;
  const user = new User({ fullName, userCode, testId });
  await user.save();
  res.json(user);
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

router.get('/search/:query', async (req, res) => {
  const users = await User.find({
    $or: [
      { fullName: { $regex: req.params.query, $options: 'i' } },
      { userCode: { $regex: req.params.query, $options: 'i' } }
    ]
  });
  res.json(users);
});

router.patch('/:id/answer', async (req, res) => {
  const { questionId, selected } = req.body;
  const user = await User.findById(req.params.id);
  const existing = user.answers.find(a => a.questionId === questionId);
  if (existing) {
    existing.selected = selected;
  } else {
    user.answers.push({ questionId, selected });
  }
  await user.save();
  res.json(user);
});

router.patch('/:id/finish', async (req, res) => {
  const user = await User.findById(req.params.id);
  user.finishedAt = new Date();
  await user.save();
  res.json(user);
});

export default router;
