// SdxlImageGenerator.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { generateImageSdxl } from '../store'; // Adjust the import path as needed

const SdxlImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(generateImageSdxl(prompt));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)} 
          placeholder="Enter prompt for SDXL model" 
        />
        <button type="submit">Generate SDXL Image</button>
      </form>
    </div>
  );
};

export default SdxlImageGenerator;
