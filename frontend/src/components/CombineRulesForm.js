// src/components/CombineRulesForm.js
import React, { useState } from 'react';
import '../styles/CombineRulesForm.css'; // Add this CSS file for styling

const CombineRulesForm = ({ rules, onCombine }) => {
  const [selectedRules, setSelectedRules] = useState([]);
  const [operator, setOperator] = useState('AND'); // Default operator
  const [error, setError] = useState('');

  const handleRuleSelection = (event) => {
    const { value } = event.target;
    setSelectedRules(
      Array.from(event.target.selectedOptions, (option) => option.value)
    );
  };

  const handleCombine = () => {
    if (selectedRules.length < 2) {
      setError('Please select at least two rules to combine.');
      return;
    }
    setError('');
    onCombine(selectedRules, operator);
  };

  return (
    <form onSubmit={handleCombine} className="combine-rules-container">
      <h2>Combine Rules</h2>
      <div className="form-group">
        <label>Select Rules:</label>
        <select
          multiple
          className="rule-select"
          onChange={handleRuleSelection}
        >
          {rules.map((rule) => (
            <option key={rule.id} value={rule.rule_string}>
              {rule.rule_string}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Operator:</label>
        <select
          className="operator-select"
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
        >
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </select>
      </div>

      {error && <p className="error-message">{error}</p>}

      <button className="combine-button" onClick={handleCombine}>
        Combine Rules
      </button>
    </form>
  );
};

export default CombineRulesForm;
