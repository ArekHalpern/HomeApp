import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateImage } from '../store';
import { RiseLoader } from 'react-spinners';
import { handleDownload } from './DownloadImage.js';
import { handleSave } from './SaveImage.js';
import stylePrompts from './stylePrompts.js';
import StyleNav from './StyleNav.js';
import { ToastContainer } from 'react-toastify';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageBlob, setImageBlob] = useState(null);
  const dispatch = useDispatch();
  const generatedImageUrl = useSelector((state) => state.generatedImage.image?.[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await dispatch(generateImage(prompt));
    setIsLoading(false);
  };

  const handleStyleSelect = (style) => {
    setPrompt(`${prompt} ${stylePrompts[style]}`.trim());
  };

  useEffect(() => {
    if (generatedImageUrl) {
      fetch(generatedImageUrl)
        .then((response) => response.blob())
        .then((blob) => setImageBlob(blob));
    }
  }, [generatedImageUrl]);

  return (
    
    <div className="image-generator-container">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <StyleNav onSelectStyle={handleStyleSelect} />
      <div className="content">
        <form onSubmit={handleSubmit} className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="We Start Here..."
          />
          <button className="btn btn-primary" type="submit" disabled={isLoading}>
            Create
          </button>
        </form>
        {isLoading ? (
          <div className="loader-container">
            <RiseLoader color="#08bbd3" />
          </div>
        ) : generatedImageUrl && (
          <div className="text-center">
            <h3>{prompt}</h3>
            <img src={generatedImageUrl} alt="Generated" />
            <div>
              <button className="btn btn-success mt-3" onClick={() => handleDownload(imageBlob, 'sdxlimage.png')}>
                Download Image
              </button>
              <button className="btn btn-primary mt-3 ml-2" onClick={() => handleSave(generatedImageUrl, dispatch)}>
                Save Image
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;
