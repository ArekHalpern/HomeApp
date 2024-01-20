import React, { useState } from 'react';
import SDXLModel from './SdxlModel'; 
import { generateImageSdxl } from '../store';
// import FooocusModel from './FooocusModel'; 
import StyleNav from './StyleNav';
import stylePrompts from './stylePrompts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSprayCanSparkles } from '@fortawesome/free-solid-svg-icons';

const ImageGen = () => {
    const [userInput, setUserInput] = useState('');
    const [selectedStyle, setSelectedStyle] = useState('');
    const [currentModel, setCurrentModel] = useState('sdxl');
    const dispatch = useDispatch();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      let fullPrompt = userInput.trim();
      let negativePrompt = '';
  
      if (selectedStyle && stylePrompts[selectedStyle]) {
        const styleDetails = stylePrompts[selectedStyle];
        fullPrompt += ` ${styleDetails.prompt}`;
        negativePrompts = styleDetails.negativePrompt;
      }
  
      dispatch(generateImageSdxl(fullPrompt, negativePrompt));
    };

  return (
    <div className="image-generator-container">
      <div className="model-switcher">
        <button onClick={() => handleModelChange('sdxl')} className={`btn ${currentModel === 'sdxl' ? 'btn-primary' : 'btn-secondary'}`}>
          SDXL
        </button>
        <button onClick={() => handleModelChange('fooocus')} className={`btn ${currentModel === 'fooocus' ? 'btn-primary' : 'btn-secondary'}`}>
          Fooocus
        </button>
      </div>
      <StyleNav onSelectStyle={setSelectedStyle} selectedStyle={selectedStyle} />
      <form onSubmit={handleSubmit} className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Describe your image here"
        />
        <button className="btn btn-primary" type="submit">
          <FontAwesomeIcon icon={faSprayCanSparkles} />
        </button>
      </form>
      {currentModel === 'sdxl' ? (
        <SDXLModel userInput={userInput} selectedStyle={selectedStyle} stylePrompts={stylePrompts} handleSubmit={handleSubmit} />
      ) : (
        <FooocusModel userInput={userInput} selectedStyle={selectedStyle} stylePrompts={stylePrompts} />
      )}
    </div>
  );
};

export default ImageGen;
