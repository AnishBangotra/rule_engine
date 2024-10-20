const API_URL = 'http://localhost:8000';

export const fetchRules = async () => {
    const response = await fetch(`${API_URL}/rules/`);
    return response.json();
};

// export const createRule = async (ruleString) => {
//     await fetch(`${API_URL}/rules/`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ rule_string: ruleString }),
//     });

// };
  
export const evaluateRule = async (combinedRule, data) => {
    const response = await fetch(`${API_URL}/evaluate/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rule: combinedRule, data }),
    });
    return response.json();
};