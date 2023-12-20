import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

const BackgroundManager = ({ setBackgroundImage }) => {
  const handleIconClick = (imageUrl) => {
    setBackgroundImage(imageUrl);
  };

  return (
    <div className="icon-container">
      <FontAwesomeIcon icon={faCircle} className="gradient-icon icon1" onClick={() => handleIconClick('../../../Assets/Images/Generated_Image.png')} />
      <FontAwesomeIcon icon={faCircle} className="gradient-icon icon2" onClick={() => handleIconClick('../../../Assets/Images/2023-12-05_22-55-58_9396.png')} />
      <FontAwesomeIcon icon={faCircle} className="gradient-icon icon3" onClick={() => handleIconClick('../../../Assets/Images/00003-3000603952.png')} />
      <FontAwesomeIcon icon={faCircle} className="gradient-icon icon4" onClick={() => handleIconClick('url4.jpg')} />
    </div>
  );
};

export default BackgroundManager;
