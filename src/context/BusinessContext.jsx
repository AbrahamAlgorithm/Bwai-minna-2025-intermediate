/* BusinessContext.jsx */

// This file:
// 1. Creates a context for managing BusinessAI-related states and actions.
// 2. Provides a provider component to share context values with child components.
// 3. Implements a function to handle prompts and fetch responses from the BusinessAI system.


// Step 1: Import necessary dependencies for creating the BusinessAI context.
import React, { createContext, useState } from 'react';
import runNewAI from '../config/businessAIConfig';


// Step 2: Create the BusinessAIContext to share state and actions.
// eslint-disable-next-line react-refresh/only-export-components
export const BusinessAIContext = createContext();


// Step 3: Define the BusinessAIProvider component to manage input, response, and loading states.
const BusinessAIProvider = ({ children }) => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);


  // Step 4: Implement the sendPrompt function to handle business-related prompts.
  const sendPrompt = async (prompt = '') => {
    setLoading(true);

    const businessInfoParagraph =
      localStorage.getItem('businessInfo') || '';

    const result = await runNewAI(prompt, businessInfoParagraph);
    setResponse(result);
    setLoading(false);
  };


  // Step 5: Provide the context values to children components.
  return (
    <BusinessAIContext.Provider
      value={{ input, setInput, response, loading, sendPrompt }}
    >
      {children}
    </BusinessAIContext.Provider>
  );
};

export default BusinessAIProvider;