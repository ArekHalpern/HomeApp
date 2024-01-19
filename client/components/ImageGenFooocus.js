import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateImageFooocus } from '../store'; // Import generateImageFooocus
import { RiseLoader } from 'react-spinners';
import { handleDownload } from './downloadImage';
// import { handleSave } from './saveImage'; // Uncomment if save functionality is needed
import stylePrompts from './stylePrompts';
import StyleNav from './StyleNav';
import { ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSprayCanSparkles } from '@fortawesome/free-solid-svg-icons';

const ImageGeneratorFooocus = () => {
  const [userInput, setUserInput] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const dispatch = useDispatch();
  const { fooocusResult, isLoading } = useSelector((state) => state.fooocusImage); // Use fooocusImage from Redux state
  const [imageBlob, setImageBlob] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let fullPrompt = userInput.trim();
    let negativePrompts = '';

    if (selectedStyle && stylePrompts[selectedStyle]) {
      const styleDetails = stylePrompts[selectedStyle];
      fullPrompt += ` ${styleDetails.prompt}`;
      negativePrompts = styleDetails.negativePrompt;
    }

    dispatch(generateImageFooocus(fullPrompt, negativePrompts));
  };

  const handleStyleSelect = (style) => {
    setSelectedStyle((prevStyle) => (prevStyle === style ? '' : style));
  };

  useEffect(() => {
    if (fooocusResult && fooocusResult.images && fooocusResult.images[0] && fooocusResult.images[0].url) {
      const imageUrl = fooocusResult.images[0].url;
      fetch(imageUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const localUrl = URL.createObjectURL(blob);
          setImageBlob(localUrl);
        })
        .catch((error) => console.error('Error fetching image:', error));
    }
  }, [fooocusResult]);

  return (
    <div className="image-generator-container">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <form onSubmit={handleSubmit} className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Describe your image here"
        />
        <button className="btn btn-primary" type="submit" disabled={isLoading}>
          <FontAwesomeIcon icon={faSprayCanSparkles} />
        </button>
      </form>
      <StyleNav onSelectStyle={handleStyleSelect} selectedStyle={selectedStyle} />
      <div className="content">
        {isLoading ? (
          <div className="loader-container">
            <RiseLoader color="#08bbd3" />
          </div>
        ) : (
          imageBlob && (
            <div className="text-center">
              <img src={imageBlob} alt="Generated" className="responsive-image" />
              <div>
                <button className="btn btn-success mt-3" onClick={() => handleDownload(imageBlob, 'for-user.jpeg')}>
                  Download Image
                </button>
                {/* <button className="btn btn-primary mt-3 ml-2" onClick={() => handleSave(imageBlob, dispatch)}> */}
                  {/* Save Image */}
                {/* </button> */}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ImageGeneratorFooocus;
