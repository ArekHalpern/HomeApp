// deleteSingleImage.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteImage } from '../store'; // Import the deleteImage thunk

export const DeleteSingleImageButton = ({ imageId }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      await dispatch(deleteImage({ id: imageId }));
    }
  };

  return (
    <button className="btn btn-danger" onClick={handleDelete}>
      Delete Image
    </button>
  );
};
