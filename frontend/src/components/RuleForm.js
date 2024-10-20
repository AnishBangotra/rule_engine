// src/components/RuleForm.js
import React, { useState } from 'react';
import '../styles/RuleForm.css';

const RuleForm = ({ onRuleAdded }) => {
  const [ruleString, setRuleString] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/rules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rule_string: ruleString }),
      });

      if (response.ok) {
        const newRule = await response.json(); // Get the new rule from the backend
        onRuleAdded(newRule); // Notify parent about the new rule
        setRuleString(''); // Clear input
      } else {
        console.error('Failed to add rule');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };


  return (
    <div className="rule-form-container">
      <h2 style={{textAlign: 'left'}}>Add New Rule</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="rule-input"
          placeholder="Enter your rule (e.g., age > 30 AND department = 'Sales')"
          value={ruleString}
          onChange={(e) => setRuleString(e.target.value)}
          rows={4}
        />
        <button type="submit" className="submit-button">
          Add Rule
        </button>
      </form>
    </div>
  );
};

export default RuleForm;
