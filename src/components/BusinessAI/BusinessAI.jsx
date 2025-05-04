/* BusinessAI.jsx */
import React, { useContext } from "react";
import { BusinessAIContext } from "../../context/BusinessContext";
import Sidebar from "../Sidebar/Sidebar";
import "./BusinessAI.css";

const BusinessAI = () => {
  const { input, setInput, response, loading, sendPrompt } =
    useContext(BusinessAIContext);

  const handleSendPrompt = () => {
    sendPrompt(input);
    setInput("");
  };

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
