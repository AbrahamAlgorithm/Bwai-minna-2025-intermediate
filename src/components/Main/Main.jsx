import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {
    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context)

    return (
        <div className='main'>
            <div className="nav">
                <div className="nav-left">
                    <img src={assets.gemini_icon} alt="logo" className="nav-logo" />
                    <p>AI-StudyMate</p>
                </div>
                <div className="nav-right">
                    <img src={assets.user_icon} alt="user" className="nav-user" />
                </div>
            </div>
            
            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="welcome-section">
                            <h1>Hello, what would you like to learn today?</h1>
                            <p className="subtitle">AI-StudyMate can help you understand complex topics</p>
                        </div>
                        
                        <div className="suggestions">
                            <div className="suggestion-row">
                                <div className="suggestion-card">
                                    <img src={assets.compass_icon} alt="" />
                                    <h3>Explain concepts</h3>
                                    <p>Like "What are superconductors and how do they work?"</p>
                                </div>
                                <div className="suggestion-card">
                                    <img src={assets.bulb_icon} alt="" />
                                    <h3>Summarize topics</h3>
                                    <p>Ask me to break down complex subjects into simple terms</p>
                                </div>
                            </div>
                            <div className="suggestion-row">
                                <div className="suggestion-card">
                                    <img src={assets.message_icon} alt="" />
                                    <h3>Practice questions</h3>
                                    <p>Get help with study materials and practice problems</p>
                                </div>
                                <div className="suggestion-card">
                                    <img src={assets.code_icon} alt="" />
                                    <h3>Code assistance</h3>
                                    <p>Get help understanding and improving code</p>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="chat-container">
                        <div className="chat-message user-message">
                            <img src={assets.user_icon} alt="" />
                            <div className="message-content">
                                <p>{recentPrompt}</p>
                            </div>
                        </div>
                        <div className="chat-message ai-message">
                            <img src={assets.gemini_icon} alt="" />
                            <div className="message-content">
                                {loading ? (
                                    <div className="typing-indicator">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                ) : (
                                    <p dangerouslySetInnerHTML={{__html: resultData}}></p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="input-container">
                    <div className="text-input-field with-toolbox-drawer">
                        <div className="text-input-field-wrapper">
                            <div className="text-input-field-main-area">
                                <div className="text-input-inner">
                                    <div className="rich-textarea">
                                        <input 
                                            type="text"
                                            className="textarea new-input-ui"
                                            placeholder="Ask AI-StudyMate..."
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && input && onSent()}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="actions-wrapper">
                            <div className="leading-actions">
                                <button className="action-btn upload-btn">
                                    <i className="ri-add-line"></i>
                                </button>
                                <button className="action-btn">
                                    <i className="ri-compass-3-line"></i>
                                </button>
                                <button className="action-btn">
                                    <i className="ri-edit-line"></i>
                                </button>
                            </div>
                            <div className="trailing-actions">
                                <button className="action-btn">
                                    <i className="ri-mic-line"></i>
                                </button>
                                <button 
                                    className={`send-btn ${!input ? 'disabled' : ''}`}
                                    onClick={input ? onSent : undefined}
                                    disabled={!input}
                                >
                                    <i className="ri-send-plane-line"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <p className="input-info">
                        AI-StudyMate may display inaccurate info • Built With AI Minna - 2025
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main
