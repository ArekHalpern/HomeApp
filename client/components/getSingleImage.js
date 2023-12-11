import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleImage } from '../store';
import { EditSingleImageButton } from './editSingleImage'; // Import Edit Button
import { DeleteSingleImageButton } from './deleteSingleImage'; // Import Delete Button

const SingleImage = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const image = useSelector(state => state.images.selectedImage);

  useEffect(() => {
    dispatch(fetchSingleImage(id));
  }, [dispatch, id]);

  if (!image) {
    return <div>Image not found</div>;
  }

  return (
    <div className="image-view">
      <img src={image.filePath} alt={image.name || 'Image'} />
      <div className="image-details">
        <h2>{image.name}</h2>
        <p>{image.description}</p>
      </div>
      {/* Edit and Delete Buttons */}
      <div className="image-actions">
        <EditSingleImageButton image={image} />
        <DeleteSingleImageButton imageId={image.id} />
      </div>
    </div>
  );
};

export default SingleImage;
