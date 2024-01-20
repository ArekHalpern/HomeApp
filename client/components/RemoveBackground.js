import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { generateImageRembg } from '../store';
import { RiseLoader } from 'react-spinners';
import { handleDownload } from './downloadImage'; // Adjust path as necessary

const RemoveBackgroundPage = () => {
  const dispatch = useDispatch();
  const { rembgResult, isLoading } = useSelector(state => state.rembgImage);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [resultImageBlob, setResultImageBlob] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result);
      setResultImageBlob(null); // Clear previous result when new image is uploaded
    };
    reader.readAsDataURL(file);
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

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  return (
    <div>
      <div {...getRootProps()} style={{ border: '1px dashed white', padding: '20px', cursor: 'pointer',  }}>
        <input {...getInputProps()} />
        <p>Drop or Upload</p>
      </div>

      {uploadedImage && (
        <div>
          <div className="uploaded-image-preview">
            <img src={uploadedImage} alt="Uploaded Preview" style={{ maxWidth: '100px', marginTop: '10px' }} />
          </div>
          {!isLoading && (
            <button onClick={handleRemoveBackground} className="btn btn-primary mt-3">
              Remove Background
            </button>
          )}
        </div>
      )}

      {isLoading && (
        <div className="loader-container">
          <RiseLoader color="#08bbd3"/>
        </div>
      )}

      {resultImageBlob && (
        <div className="text-center">
            <img src={resultImageBlob} alt="Background Removed" className="responsive-image" />
            <button className="btn btn-success mt-3" onClick={() => handleDownload(resultImageBlob, 'rembg-image.png')}>
              Download Image
            </button>
        </div>
      )}
    </div>
  );
};

export default RemoveBackgroundPage;
