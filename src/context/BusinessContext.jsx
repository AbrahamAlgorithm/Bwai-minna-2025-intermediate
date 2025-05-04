import React, { createContext, useState } from 'react';
import runNewAI from '../config/businessAIConfig';

// eslint-disable-next-line react-refresh/only-export-components
export const BusinessAIContext = createContext();

const BusinessAIProvider = ({ children }) => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendPrompt = async (prompt = '') => {
    setLoading(true);

    const businessInfoParagraph =
      localStorage.getItem('businessInfo') || '';

    const result = await runNewAI(prompt, businessInfoParagraph);
    setResponse(result);
    setLoading(false);
  };

  return (
    <BusinessAIContext.Provider
      value={{ input, setInput, response, loading, sendPrompt }}
    >
      {children}
    </BusinessAIContext.Provider>
  );
};

export default BusinessAIProvider;