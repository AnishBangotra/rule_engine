import React, { useEffect } from 'react';
import '../styles/RuleList.css'; // Optional: Import specific styles for RuleList

const RuleList = ({ rules }) => {
  useEffect(() => {
  }, [rules])
  return (
    <div className="rule-list">
      <h2>Rules</h2>
      <div className="rule-list-container">
        {rules.length > 0 ? (
          rules.map((rule, index) => (
            <div key={rule.id} className="rule-item">
              {index + 1}. {rule.rule_string}
            </div>
          ))
        ) : (
          <p>No rules available</p>
        )}
      </div>
    </div>
  );
};

export default RuleList;
