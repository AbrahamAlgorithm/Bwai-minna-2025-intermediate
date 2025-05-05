/* businessAIConfig.js */

// This file:
// 1. Configures the Google Generative AI model for business-related tasks.
// 2. Defines the generation configuration for the AI model.
// 3. Provides a function to interact with the AI model using prompts and optional business information.

// Step 1: Import the Google Generative AI library.
import { GoogleGenerativeAI } from "@google/generative-ai";



// Step 2: Initialize the Google Generative AI instance with an API key.
const apiKey = "AIzaSyD_zhOVdBX3pQl68msd9S1aL3c47G6RgBg";
const genAI = new GoogleGenerativeAI(apiKey);



// Step 3: Retrieve the generative model with the specified configuration.
// you can find other variation of the model here: https://ai.google/get-started/our-models/
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});


// Step 4: Define the generation configuration for the AI model.
const generationConfig = {
  temperature: 0.7, // Controls the randomness of the output.
  topP: 0.9,        // Controls the diversity of the output.
  topK: 50,         // Limits the number of highest-probability tokens to consider.
  maxOutputTokens: 5000, // Maximum number of tokens in the output.
  responseMimeType: "text/plain", // Specifies the response format.
};


// Step 5: Define the function to interact with the AI model.
async function runNewAI(prompt, businessInfo = "") {

  // Step 5.1: Start a new chat session with the specified generation configuration.
  const chatSession = model.startChat({ generationConfig });


  // Step 5.2: Construct the system message based on the provided business information.
  const systemMessage = businessInfo
    ? `Do not use markdown or asterisks for emphasis, You are now representing the company , Answer in a very very brief short paragraph, as the official voice of the company based on the following business info:\n${businessInfo}`
    : "You are now acting as a normal AI.";


  // Step 5.3: Create the message parts including the system message and user prompt.
  const parts = [{ text: systemMessage }, { text: prompt }];
  

  // Step 5.4: Send the message to the AI model and retrieve the response.
  const result = await chatSession.sendMessage(parts);
  return result.response.text();
}

// Step 6: Export the runNewAI function for use in other parts of the application.
export default runNewAI;
