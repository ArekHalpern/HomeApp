import axios from "axios";

const GENERATE_IMAGE_FOOOCUS = "GENERATE_IMAGE_FOOOCUS";
const SET_LOADING_STATE = "SET_LOADING_STATE";

const createImageGenerationActionFooocus = (result) => ({
  type: GENERATE_IMAGE_FOOOCUS,
  result,
});

const setLoadingState = (isLoading) => ({
  type: SET_LOADING_STATE,
  isLoading,
});

export const generateImageFooocus = (
  prompt, 
  negativePrompt,
  style = "cinematic-default", 
  performance = "Extreme Speed", 
  seed = 176400, 
  aspect_ratio = "1024x1024", 
  image_number = 1) => async (dispatch) => {
  dispatch(setLoadingState(true));
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
    
    const response = await axios.post('/api/fal/proxy/fooocus', requestData);
    dispatch(createImageGenerationActionFooocus(response.data));
    dispatch(setLoadingState(false));
  } catch (error) {
    console.error('Error generating image with fooocus model:', error);
    dispatch(setLoadingState(false)); 
  }
};

// INITIAL STATE
const initialState = {
  fooocusResult: null,
  isLoading: false, 
};

// REDUCER
export default function generateImageFooocusReducer(state = initialState, action) {
  switch (action.type) {
    case GENERATE_IMAGE_FOOOCUS:
      return { ...state, fooocusResult: action.result };
    case SET_LOADING_STATE:
      return { ...state, isLoading: action.isLoading };
    default:
      return state;
  }
}
