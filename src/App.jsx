import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'
import './App.css'

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
        </Routes>
      </Router>
    </div>
  )
}

export default App