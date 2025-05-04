import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyD_zhOVdBX3pQl68msd9S1aL3c47G6RgBg";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

const generationConfig = {
  temperature: 0.7,
  topP: 0.9,
  topK: 50,
  maxOutputTokens: 5000,
  responseMimeType: "text/plain",
};

async function runNewAI(prompt, businessInfo = "") {
  const chatSession = model.startChat({ generationConfig });

  const systemMessage = businessInfo
    ? `Do not use markdown or asterisks for emphasis, You are now representing the company , Answer in a very very brief short paragraph, as the official voice of the company based on the following business info:\n${businessInfo}`
    : "You are now acting as a normal AI.";

  const parts = [{ text: systemMessage }, { text: prompt }];

  const result = await chatSession.sendMessage(parts);
  return result.response.text();
}

export default runNewAI;
