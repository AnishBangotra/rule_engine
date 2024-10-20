// src/Evaluate.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/EvaluateForm.css';

const Evaluate = ({rules}) => {
  const [selectedRule, setSelectedRule] = useState('');
  const [userAttributes, setUserAttributes] = useState({
    age: '',
    department: '',
    salary: '',
    experience: '',
  });
  const [result, setResult] = useState(null);

  // Handle form submission to evaluate the selected rule
  const handleEvaluate = async () => {
    try {
      const response = await fetch('http://localhost:8000/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rule_string: selectedRule,
          user_data: userAttributes,
        }),
      });

      const data = await response.json();
      setResult(data)
      alert(`Evaluation Result: ${data ? 'Eligible' : 'Not Eligible'}`);
    } catch (error) {
      console.error('Error evaluating rule:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserAttributes({ ...userAttributes, [name]: value });
  };

  useEffect(() => {
  }, [rules]);
//   console.log('ruleeeeeeeeessssss', availableRules)
  return (
    <div className="evaluate-container">
      <h2>Evaluate a Rule</h2>

      <form onSubmit={handleEvaluate} className="evaluate-form">
        {/* Dropdown for rule selection */}
        <select
          id="rule-select"
          value={selectedRule}
          onChange={(e) => setSelectedRule(e.target.value)}
          className="dropdown"
          required
        >
          <option value="">-- Select a Rule --</option>
          {rules.map((rule) => (
            <option key={rule.id} value={rule.id} className="dropdown-option">
              {rule.rule_string}
            </option>
          ))}
        </select>

        {/* Dynamic input fields for user attributes */}
        <div className="input-fields">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={userAttributes.age}
            onChange={handleChange}
            required
          />

          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={userAttributes.department}
            onChange={handleChange}
            required
          />

          <label>Salary:</label>
          <input
            type="number"
            name="salary"
            value={userAttributes.salary}
            onChange={handleChange}
            required
          />

          <label>Experience:</label>
          <input
            type="number"
            name="experience"
            value={userAttributes.experience}
            onChange={handleChange}
            required
          />
        </div>

        <button onClick={handleEvaluate} type="submit">Evaluate</button>
      </form>

      {/* Display evaluation result */}
      {result !== null && (
        <div className="result">
          <h3>Evaluation Result:</h3>
          <p>{result ? 'Eligible' : 'Not Eligible'}</p>
        </div>
      )}
    </div>
  );
};

export default Evaluate;
