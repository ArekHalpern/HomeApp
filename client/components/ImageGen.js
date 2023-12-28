import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateImageSdxl } from '../store'; // Importing the SDXL action
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
  const dispatch = useDispatch();
  const { sdxlResult, isLoading } = useSelector((state) => state.sdxlImage);
  const [imageBlob, setImageBlob] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let fullPrompt = userInput.trim();

    if (selectedStyle && stylePrompts[selectedStyle]) {
      const styleDetails = stylePrompts[selectedStyle];
      fullPrompt += ` ${styleDetails.prompt}`;
    }

    console.log('Dispatching SDXL action with prompt:', fullPrompt); // Log the prompt being dispatched
    dispatch(generateImageSdxl(fullPrompt));
  };

  const handleStyleSelect = (style) => {
    setSelectedStyle((prevStyle) => (prevStyle === style ? '' : style));
  };

  useEffect(() => {
    console.log('SDXL Result:', sdxlResult); // Log the SDXL result
    if (sdxlResult && sdxlResult.images && sdxlResult.images[0] && sdxlResult.images[0].url) {
      const imageUrl = sdxlResult.images[0].url;
      console.log('Fetching image from URL:', imageUrl); // Log the URL being fetched
      fetch(imageUrl)
        .then((response) => response.blob())
        .then((blob) => {
          console.log('Blob received:', blob); // Log the received blob
          const localUrl = URL.createObjectURL(blob);
          console.log('Local URL created:', localUrl); // Log the created local URL
          setImageBlob(localUrl);
        })
        .catch((error) => console.error('Error fetching image:', error)); // Log any errors during fetch
    }
  }, [sdxlResult]);
  

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
        ) : (
          imageBlob && (
            <div className="text-center">
              <img src={imageBlob} alt="Generated" />
              <div>
              <button className="btn btn-success mt-3" onClick={() => handleDownload(imageBlob, 'generatedImage.jpeg')}>
                  Download Image
              </button>
                <button className="btn btn-primary mt-3 ml-2" onClick={() => handleSave(sdxlResult.url, dispatch)}>
                  Save Image
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;
