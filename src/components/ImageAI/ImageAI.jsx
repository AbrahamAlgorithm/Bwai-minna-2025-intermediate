// components/ImageAI/ImageAI.jsx
import React, { useContext } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { ImageAIContext } from "../../context/ImageAIContext";
import "./ImageAI.css";

const ImageAI = () => {
  const { input, setInput, response, loading, sendImagePrompt } =
    useContext(ImageAIContext);
  const imageData = typeof window !== "undefined" ? localStorage.getItem("businessImage") || "" : "";

  const handleSend = () => {
    if (!input && !imageData) return;
    sendImagePrompt(input, imageData);
    setInput("");
  };

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
        {response && <div className="response">{response}</div>}
      </main>
    </div>
  );
};

export default ImageAI;
