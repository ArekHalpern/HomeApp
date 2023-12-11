import { toast } from 'react-toastify';
import { saveImage as saveImageAction } from '../store';

export const handleSave = async (generatedImageUrl, dispatch) => {
  if (generatedImageUrl) {
    try {
      const imageData = {
        name: 'Generated Image',
        description: 'Generated using AI',
        filePath: generatedImageUrl
      };
      // Dispatch the action to save the image
      await dispatch(saveImageAction(imageData));
      // Notify the user of successful save
      toast.success('Image saved successfully!');
    } catch (error) {
      // Notify the user of an error
      toast.error('Failed to save the image. Please try again.');
      console.error('Error saving image:', error);
    }
  }
};
