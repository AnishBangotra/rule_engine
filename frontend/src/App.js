import React, { useState, useEffect } from 'react';
import RuleForm from './components/RuleForm';
import RuleList from './components/RuleList';
import EvaluateForm from './components/EvaluateForm';
import './styles/App.css';

const App = () => {
  const [rules, setRules] = useState([]);

  const fetchRules = async () => {
    try {
      const response = await fetch('http://localhost:8000/rules');
      const data = await response.json();
      setRules(data); // Update the rules state with fetched data
    } catch (error) {
      console.error('Error fetching rules:', error);
    }
  };
  // Fetch existing rules when the app loads
  useEffect(() => {
    fetchRules();
  }, []);

  const handleRuleAdded = (newRule) => {
    fetchRules()
  };

  return (
    <div className="container">
      <h1>Rule Engine</h1>
      <RuleForm onRuleAdded={handleRuleAdded} />
      <div className='row-container'>
        <RuleList rules={rules}/>
        <EvaluateForm rules={rules} />
      </div>
    </div>
  );
};

export default App;