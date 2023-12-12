import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteImage } from '../store'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'; 


export const DeleteSingleImageButton = ({ imageId }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await dispatch(deleteImage({ id: imageId }));
        toast.success("Image deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete the image.");
      }
    }
  };

  return (
    <button className="btn btn-danger" onClick={handleDelete}>
      <FontAwesomeIcon icon={faTrashAlt} /> 
    </button>
  );
};