/* BusinessInfoUpload.jsx */

// This component:
// 1. Provides a user interface for uploading and saving business information.
// 2. Includes a Sidebar for navigation.
// 3. Saves the entered business information to localStorage.

// Step 1: Import necessary dependencies for the BusinessInfoUpload component.
import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './BusinessInfoUpload.css';


// Step 2: Define the BusinessInfoUpload component structure and include a Sidebar for navigation.
const BusinessInfoUpload = () => {


  // Step 3: Manage the state for business information and handle saving it to localStorage.
  const [businessInfo, setBusinessInfo] = useState(localStorage.getItem('businessInfo') || '');

  const handleSave = () => {
    localStorage.setItem('businessInfo', businessInfo);
    alert('Business Info saved successfully!');
  };


  // Step 4: Define the BusinessInfoUpload UI structure.
  return (
    <div className="business-info-page">
      <Sidebar />
      <main className="business-info-container">
        <h1 className="info-title">Business Information</h1>
        
        {/* Step 5: Provide a textarea for input and a button to save the information. */}
        <textarea
          className="info-textarea"
          value={businessInfo}
          onChange={(e) => setBusinessInfo(e.target.value)}
          placeholder="Enter your business details..."
        />
        <button className="save-button" onClick={handleSave}>Save</button>
      </main>
    </div>
  );
};

export default BusinessInfoUpload;
