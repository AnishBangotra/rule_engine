import React, { useState, useEffect } from 'react';
import RuleForm from './components/RuleForm';
import RuleList from './components/RuleList';
import EvaluateForm from './components/EvaluateForm';
import './styles/App.css';
import CombineRulesForm from './components/CombineRulesForm';

const App = () => {
  const [rules, setRules] = useState(['()', '()']);

  const handleCombine = async (selectedRules, operator) => {
    const combined = selectedRules.join(` ${operator} `); // Combine the selected rules with the chosen operator
    console.log('combinedddddddddddd', combined)
    try {
      const response = await fetch('http://localhost:8000/combine_rule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rules: combined, operator }),
      });

      console.log('responseeeeeeeee', response)
      if (response.ok) {
        const data = await response.json();
        console.log('dataaaaaaaaaa', data)
        console.log('Combined Rule:', data.combined_ast);
        alert(`Combined Rule ast value is ${data.combined_ast}`)
      } else {
        console.error('Error combining rules:', response.statusText);
      }
    } catch (error) {
      console.error('Error combining rules:', error);
    }
  };

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
        {/* <RuleList rules={rules}/> */}
        <EvaluateForm rules={rules} />
        <CombineRulesForm rules={rules} onCombine={handleCombine} />
      </div>
    </div>
  );
};

export default App;