import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchImages } from '../store'; // Import fetchUserImages instead of fetchImages
import '../../public/images.css';

const ImagesGrid = () => {
    const dispatch = useDispatch();
    const images = useSelector(state => state.images.images);
    

    useEffect(() => {
      dispatch(fetchImages());
    }, [dispatch]);

    return (
      <div className="images-grid">
        {images && images.map((image) => (
          <div key={image.id} className="image-container">
            <Link to={`/image/${image.id}`}>
              <img src={image.filePath} alt={image.name || 'Image'} />
            </Link>
          </div>
        ))}
      </div>
    );
    
};

export default ImagesGrid;
