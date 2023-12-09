import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateImage } from '../store';
import { RiseLoader } from 'react-spinners';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageBlob, setImageBlob] = useState(null);
  const dispatch = useDispatch();
  const generatedImageUrl = useSelector((state) => state.generatedImage.image?.[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await dispatch(generateImage(prompt));
    setIsLoading(false);
  };

  useEffect(() => {
    if (generatedImageUrl) {
      fetch(generatedImageUrl)
        .then((response) => response.blob())
        .then((blob) => {
          setImageBlob(blob);
        });
    }
  }, [generatedImageUrl]);

  const handleDownload = () => {
    if (imageBlob) {
      const url = URL.createObjectURL(imageBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sdxlimage.png';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="container my-4">
      <form onSubmit={handleSubmit} className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="We Start Here..."
        />
        <button className="btn btn-primary" type="submit" disabled={isLoading}>
          Create
        </button>
      </form>

      {isLoading ? (
        <div className="loader-container">
          <RiseLoader color="#08bbd3" />
        </div>
      ) : generatedImageUrl && (
        <div className="text-center">
          <h3>{prompt}</h3>
          <img src={generatedImageUrl} alt="Generated" />
          <div>
            <button className="btn btn-success mt-3" onClick={handleDownload}>
              Download Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;
