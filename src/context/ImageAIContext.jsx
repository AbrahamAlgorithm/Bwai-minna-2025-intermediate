/* ImageAIContext.jsx */

// This context:
// 1. Manages the state and functionality for interacting with the ImageAI system.
// 2. Provides input, response, and loading states to components.
// 3. Includes a function to send image-based prompts to the ImageAI system.


// Step 1: Import necessary dependencies and configuration for ImageAI functionality.
import React, { createContext, useState } from 'react';
import runImageAI from '../config/imageAIConfig';

// Step 2: Create the ImageAIContext to share state and functionality across components.
// eslint-disable-next-line react-refresh/only-export-components
export const ImageAIContext = createContext();

// Step 3: Define the ImageAIProvider component to manage input, response, and loading states.
const ImageAIProvider = ({ children }) => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);


  // Step 4: Implement the sendImagePrompt function to handle image-based prompts.
  const sendImagePrompt = async (prompt, imageBase64 = '') => {
    setLoading(true);
    const result = await runImageAI(prompt, imageBase64);
    setResponse(result);
    setLoading(false);
  };

  // Step 5: Provide the context values to children components.
  return (
    <ImageAIContext.Provider value={{ input, setInput, response, loading, sendImagePrompt }}>
      {children}
    </ImageAIContext.Provider>
  );
};


export default ImageAIProvider;
