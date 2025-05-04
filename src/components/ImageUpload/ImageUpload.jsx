import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './ImageUpload.css';

const ImageUpload = () => {
  const [imageData, setImageData] = useState(localStorage.getItem('businessImage') || '');

  useEffect(() => {
    if (imageData) {
      localStorage.setItem('businessImage', imageData);
    }
  }, [imageData]);

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

  const handleClear = () => {
    localStorage.removeItem('businessImage');
    setImageData('');
  };

  return (
    <div className="image-upload-page">
      <Sidebar />
      <main className="image-upload-container">
        <h1 className="info-title">Upload Your Business Image</h1>

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
