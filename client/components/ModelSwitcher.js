import React, { useState } from 'react';
import SDXLModel from './SdxlModel';
import FooocusModel from './FooocusModel';
import StyleNav from './StyleNav';
import stylePrompts from './stylePrompts';
import { generateImageSdxl, generateImageFooocus } from '../store';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSprayCanSparkles } from '@fortawesome/free-solid-svg-icons';

const ModelSwitcher = () => {
  const [userInput, setUserInput] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [currentModel, setCurrentModel] = useState('sdxl');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullPrompt = userInput.trim();
    const styleDetails = selectedStyle && stylePrompts[selectedStyle];
    const positivePrompt = styleDetails ? ` ${styleDetails.prompt}` : '';
    const negativePrompt = styleDetails ? styleDetails.negativePrompt : '';

    if (currentModel === 'sdxl') {
      dispatch(generateImageSdxl(fullPrompt + positivePrompt, negativePrompt));
    } else if (currentModel === 'fooocus') {
      dispatch(generateImageFooocus(fullPrompt + positivePrompt, negativePrompt));
    }
  };

  const handleModelChange = (model) => {
    setCurrentModel(model);
  };

  // Calculate the prompts here to pass to the models
  const fullPrompt = userInput.trim();
  const styleDetails = selectedStyle && stylePrompts[selectedStyle];
  const positivePrompt = styleDetails ? ` ${styleDetails.prompt}` : '';
  const negativePrompt = styleDetails ? styleDetails.negativePrompt : '';

  return (
    <div className="image-generator-container">
      <div className="model-switcher">
        <button onClick={() => handleModelChange('sdxl')} className={`model-button ${currentModel === 'sdxl' ? 'selected' : ''}`}>
          Speed
        </button>
        <button onClick={() => handleModelChange('fooocus')} className={`model-button ${currentModel === 'fooocus' ? 'selected' : ''}`}>
          Quality
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
        <SDXLModel userInput={fullPrompt + positivePrompt} negativePrompt={negativePrompt} />
      ) : (
        <FooocusModel userInput={fullPrompt + positivePrompt} negativePrompt={negativePrompt} />
      )}
    </div>
    
  );
};

export default ModelSwitcher;
