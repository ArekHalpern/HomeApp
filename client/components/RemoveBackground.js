import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { generateImageRembg } from '../store/rembgRedux'; // Adjust the import path as necessary
import { RiseLoader } from 'react-spinners';
import { handleDownload } from './downloadImage'; // Adjust the import path as necessary
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const RemoveBackgroundPage = () => {
  const dispatch = useDispatch();
  const { rembgResult, isLoading } = useSelector(state => state.rembgImage);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [resultImageBlob, setResultImageBlob] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const downloadImage = (blob) => {
    handleDownload(blob, 'rembg-image.png');
  };

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result);
      setResultImageBlob(null);
    };
    reader.readAsDataURL(file);
    setIsDragOver(false); // Reset drag over state
  }, []);

  useEffect(() => {
    if (rembgResult && rembgResult.image && rembgResult.image.url) {
      const imageUrl = rembgResult.image.url;
      fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => setResultImageBlob(URL.createObjectURL(blob)))
        .catch(console.error);
    }
  }, [rembgResult]);

  const handleRemoveBackground = () => {
    if (uploadedImage) {
      dispatch(generateImageRembg(uploadedImage));
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    onDragOver: () => setIsDragOver(true), // Set drag over state
    onDragLeave: () => setIsDragOver(false), // Reset drag over state
    onDropAccepted: onDrop // Use the existing onDrop function
  });

  return (
    <div className="remove-background-container">
      <div
        {...getRootProps()}
        className={`dropzone ${isDragOver ? 'highlight' : ''}`} // Apply highlight class on drag over
      >
        <input {...getInputProps()} />
        <p>Drop/Upload</p>
      </div>
      <div className="preview-container">
        {uploadedImage && (
          <img src={uploadedImage} alt="Uploaded Preview" className="uploaded-image-preview" />
        )}
      </div>
      <div className="action-container">
        {!isLoading && uploadedImage && (
          <button onClick={handleRemoveBackground} className="btn-remove-background">
            Remove Background
          </button>
        )}
        {isLoading && (
          <div className="loader-container">
            <RiseLoader color="#08bbd3"/>
          </div>
        )}
      </div>
      {resultImageBlob && (
        <div className="image-downloadable" onClick={() => downloadImage(resultImageBlob)}>
          <img src={resultImageBlob} alt="Background Removed" className="responsive-image" />
          <div className="download-icon">
            <FontAwesomeIcon icon={faDownload} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RemoveBackgroundPage;
