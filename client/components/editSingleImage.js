import React from 'react';
import { useDispatch } from 'react-redux';
import { editImage } from '../store'; 

export const EditSingleImageButton = ({ image }) => {
  const dispatch = useDispatch();

  const handleEdit = async () => {
    // Prompt for new details
    const newName = prompt('Enter new name:', image.name);
    const newDescription = prompt('Enter new description:', image.description);

    // Only dispatch if there are changes
    if (newName && newDescription && (newName !== image.name || newDescription !== image.description)) {
      const updatedImage = { ...image, name: newName, description: newDescription };
      await dispatch(editImage(updatedImage));
    }
  };

  return (
    <button className="btn btn-warning" onClick={handleEdit}>
      Edit Image
    </button>
  );
};
