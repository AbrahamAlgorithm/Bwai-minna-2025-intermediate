/* imageAIConfig.js */

// This file:
// 1. Configures the Google Generative AI model for image-related tasks.
// 2. Defines the generation configuration for the AI model.
// 3. Provides a function to interact with the AI model using prompts and optional image data.

// Step 1: Import the Google Generative AI library.
import { GoogleGenerativeAI } from '@google/generative-ai';

// Step 2: Initialize the Google Generative AI instance with an API key.
const apiKey = "AIzaSyBUeURdIjflIY4aE16E5h8XD2xFLoThA0E";
const genAI = new GoogleGenerativeAI(apiKey);


// Step 3: Retrieve the generative model with the specified configuration.
// You can find other variations of the model here: https://ai.google/get-started/our-models/
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro-exp-03-25' });


// Step 4: Define the generation configuration for the AI model.
const generationConfig = {
  temperature: 0.6, // Controls the randomness of the output.
  topP: 0.95,        // Controls the diversity of the output.
  topK: 40,         // Limits the number of highest-probability tokens to consider.
  maxOutputTokens: 4000, // Maximum number of tokens in the output.
  responseMimeType: 'text/plain', // Specifies the response format.
};


// Step 5: Define the function to interact with the AI model.
async function runImageAI(prompt, imageBase64 = '') {


  // Step 5.1: Start a new chat session with the specified generation configuration.
  const chat = model.startChat({ generationConfig });

  // Step 5.2: Construct the message parts including the system message and optional image data.
  const parts = [
    { text: "`Do not use markdown or asterisks for emphasis. You are a visual AI assistant. Respond concisely." },
    ...(imageBase64 ? [{
      inlineData: {
        data: imageBase64.split(',')[1], // Extract the base64 data from the input string.
        mimeType: 'image/png',          // Specify the MIME type of the image.
      }
    }] : []),
    { text: prompt },
  ];
  

  // Step 5.3: Send the message to the AI model and retrieve the response.
  const result = await chat.sendMessage(parts);
  return result.response.text();
}

// Step 6: Export the runImageAI function for use in other parts of the application.
export default runImageAI;
