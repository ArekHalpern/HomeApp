import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateImage } from '../store';
import { RiseLoader } from 'react-spinners';
import { handleDownload } from './downloadImage';
import { handleSave } from './saveImage';
import stylePrompts from './stylePrompts';
import StyleNav from './StyleNav';
import { ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSprayCanSparkles } from '@fortawesome/free-solid-svg-icons';

const ImageGenerator = () => {
  const [userInput, setUserInput] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageBlob, setImageBlob] = useState(null);
  const dispatch = useDispatch();
  const generatedImageUrl = useSelector((state) => state.generatedImage.image?.[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (selectedStyle && stylePrompts[selectedStyle]) {
      const styleDetails = stylePrompts[selectedStyle];
      const fullPrompt = `${userInput} ${styleDetails.prompt}`.trim();
      const negativePrompt = styleDetails.negativePrompt;
      await dispatch(generateImage(fullPrompt, negativePrompt));
    } else {
      console.error('Selected style is undefined or does not exist in stylePrompts');
    }

    setIsLoading(false);
  };

  const handleStyleSelect = (style) => {
    setSelectedStyle(prevStyle => prevStyle === style ? '' : style);
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
      <StyleNav onSelectStyle={handleStyleSelect} selectedStyle={selectedStyle} />
      <div className="content">
        <form onSubmit={handleSubmit} className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="We Start Here..."
          />
          <button className="btn btn-primary" type="submit" disabled={isLoading}>
            <FontAwesomeIcon icon={faSprayCanSparkles} />
          </button>
        </form>
        {isLoading ? (
          <div className="loader-container">
            <RiseLoader color="#08bbd3" />
          </div>
        ) : generatedImageUrl && (
          <div className="text-center">
            {/* <h3>userInput</h3> */}
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
