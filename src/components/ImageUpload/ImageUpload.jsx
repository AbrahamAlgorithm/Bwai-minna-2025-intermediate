/* ImageUpload.jsx */

// This component:
// 1. Provides a user interface for uploading and previewing images.
// 2. Saves the uploaded image to localStorage for persistence.
// 3. Includes a Sidebar for navigation.

// Step 1: Import necessary dependencies for the ImageUpload component.
import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './ImageUpload.css';

// Step 2: Define the ImageUpload component structure and include a Sidebar for navigation.
const ImageUpload = () => {

  // Step 3: Manage the state for uploaded images and handle saving them to localStorage.
  const [imageData, setImageData] = useState(localStorage.getItem('businessImage') || '');

  useEffect(() => {
    if (imageData) {
      localStorage.setItem('businessImage', imageData);
    }
  }, [imageData]);

  
  // Step 4: Handle the image upload process and convert the file to a base64 string.
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setImageData(base64);
    };
    reader.readAsDataURL(file);
  };

  // Step 5: Handle clearing the uploaded image and removing it from localStorage.
  const handleClear = () => {
    localStorage.removeItem('businessImage');
    setImageData('');
  };

  // Step 6: Define the ImageUpload UI structure and include a Sidebar for navigation.
  return (
    <div className="image-upload-page">
      <Sidebar />
      <main className="image-upload-container">
        <h1 className="info-title">Upload Your Business Image</h1>

        {/* Step 7: Display the uploaded image preview or the upload input field. */}
        {imageData ? (
          <div className="image-preview-box">
            <img src={imageData} alt="Uploaded" className="image-preview" />
            <button className="clear-button" onClick={handleClear}>Remove Image</button>
          </div>
        ) : (
          <label className="upload-box">
            <span>Click to Upload Image</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </label>
        )}
      </main>
    </div>
  );
};

export default ImageUpload;
