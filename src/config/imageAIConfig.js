import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = "AIzaSyBUeURdIjflIY4aE16E5h8XD2xFLoThA0E";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro-exp-03-25' });

const generationConfig = {
  temperature: 0.6,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 4000,
  responseMimeType: 'text/plain',
};

async function runImageAI(prompt, imageBase64 = '') {
  const chat = model.startChat({ generationConfig });

  const parts = [
    { text: "`Do not use markdown or asterisks for emphasis. You are a visual AI assistant. Respond concisely." },
    ...(imageBase64 ? [{
      inlineData: {
        data: imageBase64.split(',')[1],
        mimeType: 'image/png',
      }
    }] : []),
    { text: prompt },
  ];

  const result = await chat.sendMessage(parts);
  return result.response.text();
}

export default runImageAI;
