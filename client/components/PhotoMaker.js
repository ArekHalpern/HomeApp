import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { generateImagePhotomaker } from '../store/pmRedux';
import { RiseLoader } from 'react-spinners';
import { handleDownload } from './downloadImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const PhotomakerPage = () => {
    const dispatch = useDispatch();
    const { photomakerResult, isLoading } = useSelector(state => state.photomakerImage);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [resultImageBlob, setResultImageBlob] = useState(null);
    const [prompt, setPrompt] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);

    const downloadImage = async (imageUrl) => {
    
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'photomaker-image.png');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };

    const onDrop = useCallback(acceptedFiles => {
        setUploadedImage(acceptedFiles[0]);
        setResultImageBlob(null);
    }, []);

    useEffect(() => {
        if (photomakerResult && photomakerResult.images && photomakerResult.images.length > 0) {
            const imageUrl = photomakerResult.images[0].url;
            setResultImageBlob(imageUrl);
        }
    }, [photomakerResult]);

    const handlePhotomakerAction = async () => {
        if (uploadedImage && prompt) {
            try {
                const formData = new FormData();
                formData.append('image', uploadedImage);
    
                const uploadResponse = await axios.post('/api/google-storage/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
    
                const publicUrl = uploadResponse.data.image_archive_url;
    
                // Append 'img' to the prompt
                const fullPrompt = `${prompt.trim()} img`;
    
                const photomakerData = {
                    image_archive_url: publicUrl,
                    prompt: fullPrompt // Send the full prompt with 'img' appended
                };
    
                dispatch(generateImagePhotomaker(photomakerData));
            } catch (uploadError) {
                console.error('Error uploading image:', uploadError);
            }
        } else {
            console.error('Image or prompt is missing');
        }
    };    

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        onDragOver: () => setIsDragOver(true),
        onDragLeave: () => setIsDragOver(false)
    });

    return (
        <div className="pm-container">
            <div {...getRootProps()} className={`pm-dropzone ${isDragOver ? 'highlight' : ''}`}>
                <input {...getInputProps()} />
                <p>Drop/Upload</p>
            </div>
            {uploadedImage && (
                <>
                    <div className="pm-preview-container">
                        <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded Preview" className="pm-uploaded-image-preview" />
                    </div>
                    <div className="pm-input-fields">
                        <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Enter prompt here..." />
                    </div>
                    <div className="pm-action-container">
                        {!isLoading && (
                            <button onClick={handlePhotomakerAction} className="pm-btn-action">
                                Create Photo
                            </button>
                        )}
                        {isLoading && (
                            <div className="pm-loader-container">
                                <RiseLoader color="#08bbd3" />
                            </div>
                        )}
                    </div>
                </>
            )}
            {resultImageBlob && (
                <div className="pm-image-downloadable" onClick={() => downloadImage(resultImageBlob)}>
                    <img src={resultImageBlob} alt="Photo Created" className="pm-responsive-image" />
                    <div className="pm-download-icon">
                        <FontAwesomeIcon icon={faDownload} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhotomakerPage;
