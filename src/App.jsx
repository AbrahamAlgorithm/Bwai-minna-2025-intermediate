import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ImagePage from './components/ImageAI/ImageAI'
import Sidebar from './components/Sidebar/Sidebar'
import BusinessAI from './components/BusinessAI/BusinessAI'
import Main from './components/Main/Main'
import './App.css'
import ImageAIProvider from './context/ImageAIContext';
import BusinessAIProvider from './context/BusinessContext'
import BusinessInfoUpload from './components/BusinessInfoUpload/BusinessInfoUpload'
import ImageUpload from './components/ImageUpload/ImageUpload'


const Home = () => (
  <div className="home-container">
    <Sidebar />
    <Main />
  </div>
);

const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/businessAI" element={  <BusinessAIProvider> <BusinessAI /> </BusinessAIProvider>} />
          <Route path="/businessInfoUpload" element={<BusinessInfoUpload />} />
          <Route path="/imageAI" element={<ImageAIProvider><ImagePage /></ImageAIProvider>} />
          <Route path="/imageUpload" element={<ImageUpload />} />
         
          {/* Add more routes as needed */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App