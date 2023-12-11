import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages } from '../store';
import SingleImageModal from './SingleImageModal';

const ImagesGrid = () => {
    const dispatch = useDispatch();
    const images = useSelector(state => state.images.images);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
      dispatch(fetchImages());
    }, [dispatch]);

    const handleImageClick = (image) => {
      setSelectedImage(image);
      setShowModal(true);
    };

    useEffect(() => {
      if (selectedImage) {
        setShowModal(true);
      }
    }, [selectedImage]);

    return (
      <>
        <div className="images-grid">
          {images && images.map((image) => (
            <div key={image.id} className="image-container" onClick={() => handleImageClick(image)}>
              <img src={image.filePath} alt={image.name || 'Image'} />
            </div>
          ))}
        </div>

        {selectedImage && (
          <SingleImageModal 
            show={showModal} 
            onHide={() => setShowModal(false)} 
            initialImage={selectedImage} 
          />
        )}
      </>
    );
};

export default ImagesGrid;
