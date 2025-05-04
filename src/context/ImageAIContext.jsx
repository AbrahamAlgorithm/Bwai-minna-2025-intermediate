import React, { createContext, useState } from 'react';
import runImageAI from '../config/imageAIConfig';

// eslint-disable-next-line react-refresh/only-export-components
export const ImageAIContext = createContext();

const ImageAIProvider = ({ children }) => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendImagePrompt = async (prompt, imageBase64 = '') => {
    setLoading(true);
    const result = await runImageAI(prompt, imageBase64);
    setResponse(result);
    setLoading(false);
  };

  return (
    <ImageAIContext.Provider value={{ input, setInput, response, loading, sendImagePrompt }}>
      {children}
    </ImageAIContext.Provider>
  );
};

export default ImageAIProvider;
