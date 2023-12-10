import { saveImage as saveImageAction } from '../store'; 

export const handleSave = async (generatedImageUrl, dispatch) => {
  if (generatedImageUrl) {
    const imageData = {
      name: 'Generated Image', 
      description: 'Generated using AI', 
      filePath: generatedImageUrl
    };
    // Dispatch the action to save the image
    await dispatch(saveImageAction(imageData));
  }
};
