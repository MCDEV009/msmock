import { useState } from 'react';
import Home from './pages/Home';
import TestPage from './pages/TestPage';
import ResultPage from './pages/ResultPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [testData, setTestData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [results, setResults] = useState(null);
  const [language, setLanguage] = useState('uz');

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Milliy Sertifikat</h1>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-blue-700 text-white px-3 py-1 rounded"
        >
          <option value="uz">Ozbek</option>
          <option value="ru">Русский</option>
          <option value="en">English</option>
          <option value="qr">Qaraqalpoq</option>
        </select>
      </header>

      {currentPage === 'home' && (
        <Home
          language={language}
          onTestSelect={(test, user) => {
            setTestData(test);
            setUserData(user);
            setCurrentPage('test');
          }}
        />
      )}

      {currentPage === 'test' && testData && userData && (
        <TestPage
          test={testData}
          user={userData}
          language={language}
          onFinish={(results) => {
            setResults(results);
            setCurrentPage('results');
          }}
        />
      )}

      {currentPage === 'results' && results && (
        <ResultPage
          results={results}
          language={language}
          onHome={() => {
            setCurrentPage('home');
            setTestData(null);
            setUserData(null);
            setResults(null);
          }}
        />
      )}

      {currentPage === 'welcome' && (
        <div>
          <h1>Milliy Sertifikat</h1>
          <p>Welcome to the application</p>
        </div>
      )}
    </div>
  );
}
