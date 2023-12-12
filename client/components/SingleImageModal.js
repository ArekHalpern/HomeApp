import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { editImage } from '../store';
import { DeleteSingleImageButton } from './deleteSingleImage';
import { ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const EditableText = ({ value, onSave, placeholder }) => {
  const [editMode, setEditMode] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleSave = () => {
    onSave(tempValue);
    setEditMode(false);
  };

  return editMode ? (
    <input 
      type="text"
      value={tempValue}
      onChange={(e) => setTempValue(e.target.value)}
      onBlur={handleSave}
      onKeyPress={(e) => e.key === 'Enter' && handleSave()}
      autoFocus
    />
  ) : (
    <span onClick={() => setEditMode(true)}>
      {value || placeholder}
    </span>
  );
};

const SingleImageModal = ({ show, onHide, initialImage }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(initialImage);

  useEffect(() => {
    setImage(initialImage);
    console.log("Initial Image (prop) updated:", initialImage);
  }, [initialImage]);

  const handleSave = (updatedField) => {
    const updatedImage = { ...image, ...updatedField };
    setImage(updatedImage);
    dispatch(editImage(updatedImage));
  };

  if (!image) {
    return null;
  }

  const handleImageClick = (event) => {
    event.preventDefault();
    const link = document.createElement('a');
    link.href = image.filePath;
    link.download = image.name || 'download'; // Provide a default name if none exists
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Modal.Header closeButton>
        <Modal.Title>
          <EditableText 
            value={image.name} 
            onSave={(newName) => handleSave({ name: newName })} 
            placeholder="Enter Image Name"
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="image-downloadable" onClick={handleImageClick}>
          <img src={image.filePath} alt={image.name || 'Image'} className="img-fluid" />
          <div className="download-icon">
            <FontAwesomeIcon icon={faDownload} />
          </div>
        </div>
        <div className="image-details">
          <EditableText 
            value={image.description} 
            onSave={(newDescription) => handleSave({ description: newDescription })} 
            placeholder="Enter Image Description"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <DeleteSingleImageButton imageId={image.id} />
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SingleImageModal;