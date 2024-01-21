import React, { useCallback, useState, useEffect } from 'react';
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

    const downloadImage = (blob) => {
        handleDownload(blob, 'photomaker-image.png');
    };

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setUploadedImage(reader.result);
            setResultImageBlob(null);
        };
        reader.readAsDataURL(file);
    }, []);

    useEffect(() => {
        if (photomakerResult && photomakerResult.image && photomakerResult.image.url) {
            const imageUrl = photomakerResult.image.url;
            fetch(imageUrl)
                .then(response => response.blob())
                .then(blob => setResultImageBlob(URL.createObjectURL(blob)))
                .catch(console.error);
        }
    }, [photomakerResult]);

    const handlePhotomakerAction = () => {
        if (uploadedImage) {
            // Default values for other parameters
            const style = 'Photographic';
            const negativePrompt = 'nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry';
            const numInferenceSteps = 50;
            const styleStrength = 20;
            const numImages = 1;
            const guidanceScale = 5;
            const seed = 42;
    
            const photomakerData = {
                image_archive_url: uploadedImage,
                prompt, // User provided prompt
                style, // Default style
                negative_prompt: negativePrompt, // Default negative prompt
                num_inference_steps: numInferenceSteps,
                style_strength: styleStrength,
                num_images: numImages,
                guidance_scale: guidanceScale,
                seed
            };
    
            console.log('Dispatching Photomaker action with:', photomakerData);
            dispatch(generateImagePhotomaker(photomakerData));
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*'
    });

    return (
        <div className="photomaker-container">
            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                <p>Drop/Upload</p>
            </div>
            <div className="preview-container">
                {uploadedImage && (
                    <img src={uploadedImage} alt="Uploaded Preview" className="uploaded-image-preview" />
                )}
            </div>
            <div className="input-fields">
                <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Prompt" />
            </div>
            <div className="action-container">
                {!isLoading && uploadedImage && (
                    <button onClick={handlePhotomakerAction} className="btn-photomaker-action">
                        Create Photo
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
                    <img src={resultImageBlob} alt="Photo Created" className="responsive-image" />
                    <div className="download-icon">
                        <FontAwesomeIcon icon={faDownload} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhotomakerPage;
