import React, { useState, useEffect } from 'react';
import { CodeEditor } from '../components/CodeEditor';
import { ErrorPanel } from '../components/ErrorPanel';
import { analyzeCode } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);
  const parseAnalysis = (analysisText) => {
    return analysisText.split('\n- ').filter(Boolean).map(line => ({
      line: line.match(/Line (\d+)/)?.[1] || 0,
      message: line.match(/\[(.*?)\]/)?.[1] || 'Error',
      explanation: line.split(']')[1]?.split('Suggestion:')[0] || '',
      suggestion: line.includes('Suggestion:') 
        ? line.split('Suggestion:')[1] 
        : ''
    }));
  };
  const handleAnalyze = async () => {
    try {
      const { data } = await analyzeCode(code, language);
      setErrors(data.analysis ? parseAnalysis(data.analysis) : []); // Add this helper function
    } catch (err) {
      setErrors([{
        line: 0,
        message: "API Error",
        explanation: err.response?.data?.error || "Failed to analyze code",
        suggestion: "Check console for details"
      }]);
      console.error("Analysis error:", err);
    }
  };

  return (
    <div className="home">
      <div className="editor-section">
        <CodeEditor code={code} setCode={setCode} language={language} setLanguage={setLanguage} />
        <button onClick={handleAnalyze} className="analyze-button">Analyze Code</button>
      </div>
      <div className="right-panel">
        <ErrorPanel errors={errors} />
      </div>
    </div>
  );
};

export default Home;
