import axios from "axios";

// Action Types
const GENERATE_IMAGE_SDXL = "GENERATE_IMAGE_SDXL";
const SET_LOADING_STATE_SDXL = "SET_LOADING_STATE_SDXL";

// Action Creators
const createImageGenerationActionSdxl = (result) => ({
  type: GENERATE_IMAGE_SDXL,
  result,
});

const setLoadingStateSdxl = (isLoading) => ({
  type: SET_LOADING_STATE_SDXL,
  isLoading,
});

// Thunk Creators
export const generateImageSdxl = (
  prompt,
  negativePrompt = "cartoon, illustration, animation. face. male, female",
  image_size = "square_hd",
  num_inference_steps = 25,
  seed = 0,
  enable_deep_cache = 0,
  guidance_scale = 7.5,
  sync_mode = 0,
  num_images = 1
) => async (dispatch) => {
  dispatch(setLoadingStateSdxl(true));
  try {
    const requestData = {
      prompt,
      negative_prompt: negativePrompt,
      image_size,
      num_inference_steps,
      seed,
      enable_deep_cache,
      guidance_scale,
      sync_mode,
      num_images,
    };

    const response = await axios.post('/api/fal/proxy/sdxl', requestData);
    dispatch(createImageGenerationActionSdxl(response.data));
  } catch (error) {
    console.error('Error generating image with sdxl model:', error);
  } finally {
    dispatch(setLoadingStateSdxl(false));
  }
};

// Initial State
const initialState = {
  sdxlResult: null,
  isLoading: false,
};

// Reducer
export default function generateImageSdxlReducer(state = initialState, action) {
  switch (action.type) {
    case GENERATE_IMAGE_SDXL:
      return { ...state, sdxlResult: action.result };
    case SET_LOADING_STATE_SDXL:
      return { ...state, isLoading: action.isLoading };
    default:
      return state;
  }
}
