import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './BusinessInfoUpload.css';

const BusinessInfoUpload = () => {
  const [businessInfo, setBusinessInfo] = useState(localStorage.getItem('businessInfo') || '');

  const handleSave = () => {
    localStorage.setItem('businessInfo', businessInfo);
    alert('Business Info saved successfully!');
  };

  return (
    <div className="business-info-page">
      <Sidebar />
      <main className="business-info-container">
        <h1 className="info-title">Business Information</h1>
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
