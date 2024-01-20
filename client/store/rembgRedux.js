import axios from "axios";

// Action Types for rembg
const GENERATE_IMAGE_REMBG = "GENERATE_IMAGE_REMBG";
const SET_LOADING_STATE_REMBG = "SET_LOADING_STATE_REMBG";

// Action Creators for rembg
const createImageGenerationActionRembg = (result) => ({
  type: GENERATE_IMAGE_REMBG,
  result,
});

const setLoadingStateRembg = (isLoading) => ({
  type: SET_LOADING_STATE_REMBG,
  isLoading,
});

// Thunk Creators for rembg
export const generateImageRembg = (imageUrl) => async (dispatch) => {
  dispatch(setLoadingStateRembg(true));
  try {
    const requestData = { imageUrl };

    const response = await axios.post('/api/fal/proxy/rembg', requestData);
    dispatch(createImageGenerationActionRembg(response.data));
  } catch (error) {
    console.error('Error generating image with rembg model:', error);
  } finally {
    dispatch(setLoadingStateRembg(false));
  }
};

// Initial State for rembg
const initialState = {
  rembgResult: null,
  isLoading: false,
};

// Reducer for rembg
export default function generateImageRembgReducer(state = initialState, action) {
  switch (action.type) {
    case GENERATE_IMAGE_REMBG:
      return { ...state, rembgResult: action.result };
    case SET_LOADING_STATE_REMBG:
      return { ...state, isLoading: action.isLoading };
    default:
      return state;
  }
}
