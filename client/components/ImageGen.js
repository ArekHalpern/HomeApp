import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateImage } from '../store'; // Adjust the path as necessary
import 'bootstrap/dist/css/bootstrap.min.css';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const dispatch = useDispatch();
  const generatedImageUrl = useSelector(state => 
    state.generatedImage.generatedImage?.[0] // Accessing the first image URL in the array
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(generateImage(prompt));
  };

  return (
    <div className="container my-4">
      <form onSubmit={handleSubmit} className="input-group mb-3">
        <input 
          type="text" 
          className="form-control"
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)} 
          placeholder="Enter prompt for image generation" 
        />
        <button className="btn btn-primary" type="submit">Generate Image</button>
      </form>
      {generatedImageUrl && (
        <div className="text-center">
          <h3>Generated Image</h3>
          <img src={generatedImageUrl} alt="Generated" className="img-fluid" />
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;
