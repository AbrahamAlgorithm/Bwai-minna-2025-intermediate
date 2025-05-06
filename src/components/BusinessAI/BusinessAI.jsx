/* BusinessAI.jsx */

// This component:
// 1. Provides a user interface for interacting with the BusinessAI context.
// 2. Allows users to input prompts and receive responses from the BusinessAI system.
// 3. Displays a loading state while the response is being fetched.
// 4. Includes a Sidebar for navigation.

// Step 1: Import necessary dependencies and context for BusinessAI functionality.
import React, { useContext } from "react";
import { BusinessAIContext } from "../../context/BusinessContext";
import Sidebar from "../Sidebar/Sidebar";
import "./BusinessAI.css";

// Step 2: Retrieve input, response, loading state, and sendPrompt function from BusinessAIContext.
const BusinessAI = () => {
  const { input, setInput, response, loading, sendPrompt } =
    useContext(BusinessAIContext);

  // Step 3: Handle the send action for business prompts and reset the input field.
  const handleSendPrompt = () => {
    sendPrompt(input);
    setInput("");
  };

  // Step 4: Define the BusinessAI UI structure and include a Sidebar for navigation.
  return (
    <div className="new-page-container">
      <Sidebar />
      <main className="new-page-content">
        <h1 className="page-title">Talk to Us</h1>
        <textarea
          className="prompt-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your prompt..."
        />
        <div className="actions-row">
          <button
            className="send-button"
            onClick={handleSendPrompt}
            disabled={loading}
          >
            {loading ? "Loading..." : "Send"}
          </button>
        </div>

        {/* Step 5: Display the response or loading state appropriately. */}
        {response && (
          <section className="response-section">
            <div className="response-box">{response}</div>
          </section>
        )}
      </main>
    </div>
  );
};

export default BusinessAI;
