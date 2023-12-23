import React from 'react';
import stylePrompts from './stylePrompts';

const StyleNav = ({ onSelectStyle, selectedStyle }) => {
  return (
    <div className="side-nav">
      {Object.keys(stylePrompts).map((style) => (
        <button
          key={style}
          onClick={() => onSelectStyle(style)}
          className={selectedStyle === style ? 'selected-style' : ''}
        >
          {style.charAt(0).toUpperCase() + style.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default StyleNav;
