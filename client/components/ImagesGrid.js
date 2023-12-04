import React from 'react';
import './ImagesGrid.css';

const ImagesGrid = () => {
  const images = [
    '/Assets/Images/2023-12-04_00-16-24_8774.png',
    '/Assets/Images/2023-12-03_23-57-19_6710.png',
  ];

  return (
    <div className="images-grid">
      {images.map((image, index) => (
        <div key={index} className="image-container">
          <img src={image} alt={`Gallery ${index}`} />
        </div>
      ))}
    </div>
  );
};

export default ImagesGrid;
