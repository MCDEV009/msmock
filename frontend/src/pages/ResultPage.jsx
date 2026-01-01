import { t } from '../i18n';

export default function ResultPage({ results, language, onHome }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-12 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">{t(language, 'finished')}</h1>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="text-4xl font-bold text-blue-600">{results.score}/{results.total}</div>
            <div className="text-sm text-gray-600 mt-2">{t(language, 'score')}</div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <div className="text-4xl font-bold text-green-600">{results.percentage}%</div>
            <div className="text-sm text-gray-600 mt-2">{t(language, 'percentage')}</div>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex justify-between text-lg">
            <span>{t(language, 'correct')}:</span>
            <span className="font-bold text-green-600">{results.correct}</span>
          </div>
          <div className="flex justify-between text-lg">
            <span>{t(language, 'wrong')}:</span>
            <span className="font-bold text-red-600">{results.wrong}</span>
          </div>
        </div>

        <button
          onClick={onHome}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
        >
          {t(language, 'home')}
        </button>
      </div>
    </div>
  );
}
