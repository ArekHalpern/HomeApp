import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateImageFooocus } from '../store'; // Adjusted import
import { RiseLoader } from 'react-spinners';
import { handleDownload } from './downloadImage';
import { handleSave } from './saveImage';
import stylePrompts from './stylePrompts';
import StyleNav from './StyleNav';
import { ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSprayCanSparkles } from '@fortawesome/free-solid-svg-icons';
import SdxlImageGenerator from './SdxlImageGenerator';

const ImageGenerator = () => {
  const [userInput, setUserInput] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const dispatch = useDispatch();
  const { fooocusResult, isLoading } = useSelector((state) => state.fooocusImage); // Destructure fooocusResult and isLoading
  const [imageBlob, setImageBlob] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let fullPrompt = userInput;

    if (selectedStyle && stylePrompts[selectedStyle]) {
      const styleDetails = stylePrompts[selectedStyle];
      fullPrompt += ` ${styleDetails.prompt}`.trim();
    }

    dispatch(generateImageFooocus(fullPrompt)); // Dispatch the action with the full prompt
  };

  const handleStyleSelect = (style) => {
    setSelectedStyle((prevStyle) => (prevStyle === style ? '' : style));
  };

  useEffect(() => {
    if (fooocusResult && fooocusResult.url) { // Make sure to check for the presence of fooocusResult and its url
      fetch(fooocusResult.url)
        .then((response) => response.blob())
        .then((blob) => {
          setImageBlob(blob);
        });
    }
  }, [fooocusResult]);

  return (
    <div className="image-generator-container">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <StyleNav onSelectStyle={handleStyleSelect} selectedStyle={selectedStyle} />
      <SdxlImageGenerator />
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
        ) : imageBlob && (
          <div className="text-center">
            <img src={URL.createObjectURL(imageBlob)} alt="Generated" />
            <div>
              <button className="btn btn-success mt-3" onClick={() => handleDownload(imageBlob, 'generatedImage.png')}>
                Download Image
              </button>
              <button className="btn btn-primary mt-3 ml-2" onClick={() => handleSave(fooocusResult.url, dispatch)}>
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
