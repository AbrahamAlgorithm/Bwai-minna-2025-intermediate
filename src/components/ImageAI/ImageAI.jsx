// components/ImageAI/ImageAI.jsx

// This component:
// 1. Provides a user interface for interacting with the ImageAI context.
// 2. Allows users to input prompts and receive responses from the ImageAI system.
// 3. Displays a loading state while the response is being fetched.
// 4. Includes a Sidebar for navigation.

// Step 1: Import necessary dependencies and context for ImageAI functionality.
import React, { useContext } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { ImageAIContext } from "../../context/ImageAIContext";
import "./ImageAI.css";

// Step 2: Retrieve input, response, loading state, and sendImagePrompt function from ImageAIContext.
const ImageAI = () => {
  const { input, setInput, response, loading, sendImagePrompt } =
    useContext(ImageAIContext);
  const imageData = typeof window !== "undefined" ? localStorage.getItem("businessImage") || "" : "";

  // Step 3: Handle the send action for image prompts and reset the input field.
  const handleSend = () => {
    if (!input && !imageData) return;
    sendImagePrompt(input, imageData);
    setInput("");
  };

  // Step 4: Define the ImageAI UI structure and include a Sidebar for navigation.
  return (
    <div className="image-page-container">
      <Sidebar />
      <main className="image-page-content">
        <h1>Ask Image </h1>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your request or question..."
        />
        <div className="controls">
          <button onClick={handleSend} disabled={loading}>
            {loading ? "Loading..." : "Send"}
          </button>
        </div>

        {/* Step 5: Display the response or loading state appropriately. */}
        {response && <div className="response">{response}</div>}
      </main>
    </div>
  );
};

export default ImageAI;
