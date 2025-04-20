import React, { useContext, useRef, useState } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {
    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context)
    const fileInputRef = useRef(null)
    const [isRecording, setIsRecording] = useState(false)
    const mediaRecorderRef = useRef(null)
    const chunksRef = useRef([])

    const handleImageUpload = async (event) => {
        const file = event.target.files[0]
        if (file) {
            if (file.type.startsWith('image/')) {
                try {
                    // Create a placeholder text for the image
                    const imagePlaceholder = `[Analyzing image: ${file.name}]`
                    setInput(imagePlaceholder)

                    // Convert image to base64
                    const reader = new FileReader()
                    reader.onload = async (e) => {
                        const base64Image = e.target.result
                        // You can modify this part to handle the image in your context
                        onSent(base64Image)
                    }
                    reader.readAsDataURL(file)
                } catch (error) {
                    console.error('Error processing image:', error)
                    setInput('Error uploading image. Please try again.')
                }
            } else {
                setInput('Please upload an image file.')
            }
        }
    }

    const handleVoiceRecording = async () => {
        if (!isRecording) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
                mediaRecorderRef.current = new MediaRecorder(stream)
                chunksRef.current = []

                mediaRecorderRef.current.ondataavailable = (e) => {
                    if (e.data.size > 0) {
                        chunksRef.current.push(e.data)
                    }
                }

                mediaRecorderRef.current.onstop = async () => {
                    const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' })
                    try {
                        // Convert speech to text using Web Speech API
                        const text = await speechToText(audioBlob)
                        setInput(text)
                    } catch (error) {
                        console.error('Speech to text error:', error)
                        setInput('Error processing voice. Please try again.')
                    }

                    // Stop all audio tracks
                    stream.getTracks().forEach(track => track.stop())
                }

                mediaRecorderRef.current.start()
                setIsRecording(true)
                setInput('Recording...')
            } catch (error) {
                console.error('Error starting recording:', error)
                setInput('Error accessing microphone. Please check permissions.')
            }
        } else {
            mediaRecorderRef.current.stop()
            setIsRecording(false)
        }
    }

    const speechToText = (audioBlob) => {
        return new Promise((resolve, reject) => {
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
            recognition.lang = 'en-US'
            recognition.interimResults = false
            recognition.maxAlternatives = 1

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript
                resolve(transcript)
            }

            recognition.onerror = (event) => {
                reject(event.error)
            }

            // Convert blob to audio element and play it for recognition
            const audio = new Audio(URL.createObjectURL(audioBlob))
            audio.play()
            recognition.start()
        })
    }

    return (
        <div className='main'>
            <div className="nav">
                <p>BwAI-Minna 2025</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">

                {!showResult
                ?<>
                    <div className="greet">
                    <p><span>Hello, Friend</span></p>
                    <p>How can I help you today?</p>
                </div>
                <div className="cards">
                    <div className="card">
                        <p>Explain Superconductors</p>
                        <img src={assets.compass_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Briefly summarize this concept: urban planning</p>
                        <img src={assets.bulb_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Brainstorm some questions on Clapyron theorem of three moment equation with me</p>
                        <img src={assets.message_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Improve the readability of the following code</p>
                        <img src={assets.code_icon} alt="" />
                    </div>
                </div>
                </>
                :<div className="result">
                    <div className="result-title">
                        <img src={assets.user_icon} alt="" />
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="result-data">
                        <img src={assets.gemini_icon} alt="" />
                        {loading
                        ?<div className="loader">
                            <hr />
                            <hr />
                            <hr />
                        </div>
                        :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                        }
                    </div>
                </div>
                }

                

                <div className="main-bottom">
                    <div className="search-box">
                        <input 
                            onChange={(e)=>setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder="Ask BwAI-Minna"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && input) {
                                    onSent();
                                }
                            }}
                        />
                        <div>
                            <input 
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                accept="image/*"
                                style={{ display: 'none' }}
                            />
                            <img 
                                src={assets.gallery_icon} 
                                alt="Upload image" 
                                onClick={() => fileInputRef.current.click()}
                                style={{ cursor: 'pointer' }}
                            />
                            <img 
                                src={isRecording ? assets.mic_icon_active : assets.mic_icon} 
                                alt="Voice recording" 
                                onClick={handleVoiceRecording}
                                style={{ 
                                    cursor: 'pointer',
                                    filter: isRecording ? 'invert(23%) sepia(86%) saturate(2526%) hue-rotate(356deg) brightness(94%) contrast(93%)' : 'none'
                                }}
                            />
                            {input?<img onClick={()=>onSent()} src={assets.send_icon} alt="" />:null}
                        </div>
                    </div>
                    <p className="bottom-info">
                        BwAI-Minna 2025
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main
