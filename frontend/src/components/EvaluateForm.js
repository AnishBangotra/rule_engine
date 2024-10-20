// src/Evaluate.js
import React, { useState, useEffect } from 'react';
import '../styles/EvaluateForm.css';

const Evaluate = ({ rules }) => {
  const [selectedRule, setSelectedRule] = useState('');
  const [userAttributes, setUserAttributes] = useState({
    age: '',
    department: '',
    salary: '',
    experience: '',
  });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [result, setResult] = useState(null);

  // Handle form submission to evaluate the selected rule
  const handleEvaluate = async (e) => {
    e.preventDefault(); // Prevent page reload
    if (!isValid) return;

    try {
      const sanitizedAttributes = {
        ...userAttributes,
        age: parseInt(userAttributes.age, 10),
        salary: parseFloat(userAttributes.salary),
        experience: parseInt(userAttributes.experience, 10),
      };

      console.log('bodyDataaaaaaaaaaaaa', selectedRule, userAttributes)
      const response = await fetch('http://localhost:8000/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rule_string: selectedRule,
          user_data: sanitizedAttributes,
        }),
      });

      const data = await response.json();
      console.log('dataaaaaaaaaaaaaaaaa', data)
      setResult(data.result);
      console.log('resulttttttttt', result) // Ensure 'result' is extracted correctly
      alert(`Evaluation Result: ${data.result === true ? 'Eligible' : 'Not Eligible'}`);
    } catch (error) {
      console.error('Error evaluating rule:', error);
      alert('Error during evaluation. Please try again.');
    }
  };

  // Validate the form inputs
  const validateForm = () => {
    const newErrors = {};
    if (!selectedRule) newErrors.selectedRule = '*Required';

    const requiredFields = ['age', 'department', 'salary', 'experience'];
    requiredFields.forEach((field) => {
      if (!userAttributes[field]) {
        newErrors[field] = `*Required`;
      }
    });

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserAttributes((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    validateForm();
  }, [selectedRule, userAttributes]);

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
            <option key={rule.id} value={rule.rule_string} className="dropdown-option">
              {rule.rule_string}
            </option>
          ))}
        </select>
        {errors.selectedRule && <p className="error">{errors.selectedRule}</p>}

        {/* Dynamic input fields for user attributes */}
        <div className="input-fields">
          {['age', 'department', 'salary', 'experience'].map((attr) => (
            <div key={attr} className="input-group">
              <label>{attr.charAt(0).toUpperCase() + attr.slice(1)}:</label>
              <input
                type={attr === 'age' || attr === 'salary' || attr === 'experience' ? 'number' : 'text'}
                name={attr}
                value={userAttributes[attr]}
                onChange={handleChange}
                required
              />
              {errors[attr] && <p className="error">{errors[attr]}</p>}
            </div>
          ))}
        </div>

        <button type="submit" disabled={!isValid}>
          Evaluate
        </button>
      </form>

      {/* Display evaluation result */}
      {result !== null && (
        <div className="result">
          <h3>Evaluation Result:</h3>
          <p>{result === true ? 'Eligible' : 'Not Eligible'}</p>
        </div>
      )}
    </div>
  );
};

export default Evaluate;
