import { useState, useEffect } from 'react';
import { getTests, getPrivateTest, createUser } from '../api';
import { generateUserCode } from '../utils/generateCode';
import { t } from '../i18n';

export default function Home({ language, onTestSelect }) {
  const [tests, setTests] = useState([]);
  const [search, setSearch] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedTest, setSelectedTest] = useState(null);
  const [privateCode, setPrivateCode] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTests = async () => {
      try {
        const res = await getTests(search);
        setTests(res.data.filter(t => t.visibility === 'PUBLIC'));
      } catch (error) {
        console.error('Error loading tests:', error);
      }
    };
    loadTests();
  }, [search]);

  const handleStartTest = async () => {
    if (!fullName || !selectedTest) return;
    setLoading(true);

    try {
      const userCode = generateUserCode();
      const user = await createUser({
        fullName,
        userCode,
        testId: selectedTest._id
      });
      onTestSelect(selectedTest, user.data);
    } catch (error) {
      console.error('Error starting test:', error);
      setLoading(false);
    }
  };

  const handlePrivateTest = async () => {
    if (!privateCode) return;
    try {
      const test = await getPrivateTest(privateCode);
      setSelectedTest(test.data);
      setIsPrivate(false);
    } catch (error) {
      alert('Invalid code');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {!selectedTest ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">{t(language, 'publicTest')}</h2>
              <input
                type="text"
                placeholder={t(language, 'search')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 border rounded mb-4"
              />
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {tests.map(test => (
                  <button
                    key={test._id}
                    onClick={() => setSelectedTest(test)}
                    className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded border-l-4 border-blue-600"
                  >
                    {test.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">{t(language, 'privateTest')}</h2>
              <input
                type="text"
                placeholder={t(language, 'enterCode')}
                value={privateCode}
                onChange={(e) => setPrivateCode(e.target.value)}
                className="w-full px-4 py-2 border rounded mb-4"
              />
              <button
                onClick={handlePrivateTest}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                {t(language, 'search')}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6">{selectedTest.title}</h2>
          <input
            type="text"
            placeholder={t(language, 'enterName')}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-2 border rounded mb-6"
          />
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedTest(null)}
              className="flex-1 bg-gray-300 text-black py-2 rounded hover:bg-gray-400"
            >
              {t(language, 'search')}
            </button>
            <button
              onClick={handleStartTest}
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? '...' : t(language, 'startTest')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
