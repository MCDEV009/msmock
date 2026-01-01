import mongoose from 'mongoose';
import Test from './models/Test.js';
import Question from './models/Question.js';
import dotenv from 'dotenv';

dotenv.config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Test.deleteMany({});
    await Question.deleteMany({});

    const test1 = await Test.create({
      title: 'Milliy Sertifikat Test 1',
      visibility: 'PUBLIC',
      duration: 30,
      status: 'active'
    });

    const test2 = await Test.create({
      title: 'Milliy Sertifikat Test 2',
      visibility: 'PRIVATE',
      privateCode: '12345',
      duration: 45,
      status: 'active'
    });

    const questions1 = [
      {
        testId: test1._id,
        questionText: 'O\'zbekiston poytaxti qaysi shahar?',
        options: { A: 'Tashkent', B: 'Samarkand', C: 'Bukhara', D: 'Khiva' },
        correctAnswer: 'A',
        language: 'uz'
      },
      {
        testId: test1._id,
        questionText: 'Столица Узбекистана - это какой город?',
        options: { A: 'Ташкент', B: 'Самарканд', C: 'Бухара', D: 'Хива' },
        correctAnswer: 'A',
        language: 'ru'
      },
      {
        testId: test1._id,
        questionText: 'What is the capital of Uzbekistan?',
        options: { A: 'Tashkent', B: 'Samarkand', C: 'Bukhara', D: 'Khiva' },
        correctAnswer: 'A',
        language: 'en'
      }
    ];

    const questions2 = [
      {
        testId: test2._id,
        questionText: 'Qoraqalpog\'iston qaysi davlatning muxtori?',
        options: { A: 'O\'zbekiston', B: 'Turkmaniston', C: 'Qozog\'iston', D: 'Qirg\'iziston' },
        correctAnswer: 'A',
        language: 'qr'
      }
    ];

    await Question.insertMany([...questions1, ...questions2]);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDB();
