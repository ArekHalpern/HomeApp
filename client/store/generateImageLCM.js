import axios from "axios";

const GENERATE_IMAGE_LCM = "GENERATE_IMAGE_LCM";
const SET_LOADING_STATE_LCM = "SET_LOADING_STATE_LCM";

const createImageGenerationActionLcm = (result) => ({
    type: GENERATE_IMAGE_LCM,
    result,
  });
  
  const setLoadingStateLcm = (isLoading) => ({
    type: SET_LOADING_STATE_LCM,
    isLoading,
  });

  export const generateImageLcm = (prompt, negativePrompt, style = "cinematic-default", performance = "Speed", seed = 176400, aspect_ratio = "1024x1024", image_number = 1) => async (dispatch) => {
    dispatch(setLoadingStateLcm(true));
    try {
      const requestData = {
        prompt,
        negative_prompt: negativePrompt,
        style,
        performance,
        seed,
        aspect_ratio,
        image_number,
      };
      
      const response = await axios.post('/api/fal/proxy/lcm', requestData);
      dispatch(createImageGenerationActionLcm(response.data));
      dispatch(setLoadingStateLcm(false));
    } catch (error) {
      console.error('Error generating image with lcm model:', error);
      dispatch(setLoadingStateLcm(false));
    }
  };

  const initialStateLcm = {
    lcmResult: null,
    isLoadingLcm: false,
  };
  
  const generateImageLcmReducer = (state = initialStateLcm, action) => {
    switch (action.type) {
      case GENERATE_IMAGE_LCM:
        return { ...state, lcmResult: action.result };
      case SET_LOADING_STATE_LCM:
        return { ...state, isLoadingLcm: action.isLoading };
      default:
        return state;
    }
  };
  
  export default generateImageLcmReducer;
  