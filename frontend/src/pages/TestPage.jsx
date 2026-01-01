import { useState, useEffect } from 'react';
import { getQuestions, saveAnswer, finishTest } from '../api';
import { t } from '../i18n';

export default function TestPage({ test, user, language, onFinish }) {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [time, setTime] = useState(test.duration * 60);
  const [finished, setFinished] = useState(false);
  const [saveStatus, setSaveStatus] = useState({});

  useEffect(() => {
    const loadQuestions = async () => {
      const res = await getQuestions(test._id);
      setQuestions(res.data);
    };
    loadQuestions();
  }, [test._id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) {
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAnswer = async (option) => {
    if (finished) return;

    const q = questions[currentIdx];
    setSaveStatus(prev => ({ ...prev, [q._id]: 'saving' }));

    try {
      await saveAnswer(user._id, q._id, option);
      setAnswers(prev => ({ ...prev, [q._id]: option }));
      setSaveStatus(prev => ({ ...prev, [q._id]: 'saved' }));
    } catch (error) {
      setSaveStatus(prev => ({ ...prev, [q._id]: 'error' }));
    }

    setTimeout(() => {
      setSaveStatus(prev => ({ ...prev, [q._id]: '' }));
    }, 2000);
  };

  const handleFinish = async () => {
    setFinished(true);
    await finishTest(user._id);

    let score = 0;
    questions.forEach(q => {
      if (answers[q._id] === q.correctAnswer) score++;
    });

    onFinish({
      score,
      total: questions.length,
      correct: score,
      wrong: questions.length - score,
      percentage: Math.round((score / questions.length) * 100)
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (questions.length === 0) return <div className="p-6">{t(language, 'loading')}...</div>;

  const q = questions[currentIdx];
  const status = saveStatus[q._id];

  return (
    <div className="h-screen bg-white flex flex-col">
      <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
        <h2 className="text-lg font-bold">{test.title}</h2>
        <div className="flex gap-8 items-center">
          <div className={`text-2xl font-bold ${time < 60 ? 'text-red-300' : ''}`}>
            {formatTime(time)}
          </div>
          <div className="text-sm">
            <div>{user.userCode}</div>
            <div className="text-xs">{user.fullName}</div>
          </div>
          {finished && <div className="text-2xl font-bold text-red-300">{t(language, 'finished')}</div>}
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="w-1/2 p-8 border-r border-gray-300 overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-sm text-gray-600 mb-2">
              {t(language, 'question')} {currentIdx + 1}/{questions.length}
            </h3>
            <h2 className="text-2xl font-bold">{q.questionText}</h2>
          </div>
          {q.image && <img src={q.image} alt="question" className="max-w-full rounded mb-6" />}
        </div>

        <div className="w-1/2 p-8 overflow-y-auto">
          <div className="space-y-4 mb-8">
            {['A', 'B', 'C', 'D'].map(opt => (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                disabled={finished}
                className={`w-full p-4 rounded-lg border-2 text-left font-semibold transition ${
                  answers[q._id] === opt
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                } ${finished ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                <div className="font-bold text-blue-600">{opt}</div>
                <div>{q.options[opt]}</div>
              </button>
            ))}
          </div>

          {status && (
            <div className={`p-3 rounded text-center font-semibold ${
              status === 'saving' ? 'bg-yellow-100 text-yellow-800' :
              status === 'saved' ? 'bg-green-100 text-green-800' :
              'bg-red-100 text-red-800'
            }`}>
              {status === 'saving' ? t(language, 'saving') :
               status === 'saved' ? t(language, 'saved') :
               t(language, 'error')}
            </div>
          )}

          <div className="flex gap-4 mt-8">
            <button
              onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
              disabled={currentIdx === 0 || finished}
              className="flex-1 bg-gray-300 py-2 rounded disabled:opacity-50"
            >
              ←
            </button>
            <button
              onClick={() => setCurrentIdx(Math.min(questions.length - 1, currentIdx + 1))}
              disabled={currentIdx === questions.length - 1 || finished}
              className="flex-1 bg-gray-300 py-2 rounded disabled:opacity-50"
            >
              →
            </button>
            <button
              onClick={handleFinish}
              disabled={finished}
              className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-50"
            >
              {t(language, 'finished')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
