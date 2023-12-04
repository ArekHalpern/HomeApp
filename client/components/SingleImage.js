// ImageView.js in your React component
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../public/images.css';

const SingleImage = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetch(`/api/images/${id}`)
      .then((res) => res.json())
      .then((data) => setImage(data))
      .catch((error) => console.error('Error fetching image:', error));
  }, [id]);

  if (!image) {
    return <div>Loading...</div>;
  }

  return (
    <div className="image-view">
      <img src={image.filePath} alt={image.name} />
      <div className="image-details">
        <h2>{image.name}</h2>
        <p>{image.description}</p>
      </div>
    </div>
  );
};

export default SingleImage;
