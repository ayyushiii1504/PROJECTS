import React, { useState, useEffect } from 'react';
import { getHistory } from '../services/api';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchHistory();
    }
  }, [navigate]);

  const fetchHistory = async () => {
    try {
      const response = await getHistory();
      setHistory(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="history">
      <h2>Debug History</h2>
      {history.map((log, index) => (
        <div key={index} className="history-item">
          <p><strong>Language:</strong> {log.language}</p>
          <p><strong>Timestamp:</strong> {new Date(log.timestamp).toLocaleString()}</p>
          <pre>{log.code}</pre>
        </div>
      ))}
    </div>
  );
};

export default History;