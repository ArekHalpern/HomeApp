import React from 'react';
import stylePrompts from './stylePrompts';

const StyleNav = ({ onSelectStyle, selectedStyle }) => {
  // Adjust the function to toggle the selected style
  const handleStyleSelect = (style) => {
    onSelectStyle(selectedStyle === style ? '' : style);
  };

  return (
    <div className="style-nav">
      {Object.keys(stylePrompts).map((style) => (
        <button
          key={style}
          onClick={() => handleStyleSelect(style)}
          className={`style-button ${selectedStyle === style ? 'selected-style' : ''}`}
        >
          {style.charAt(0).toUpperCase() + style.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default StyleNav;
