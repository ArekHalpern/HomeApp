import axios from "axios";

// Action Types for photomaker
const GENERATE_IMAGE_PHOTOMAKER = "GENERATE_IMAGE_PHOTOMAKER";
const SET_LOADING_STATE_PHOTOMAKER = "SET_LOADING_STATE_PHOTOMAKER";

// Action Creators for photomaker
const createImageGenerationActionPhotomaker = (result) => ({
  type: GENERATE_IMAGE_PHOTOMAKER,
  result,
});

const setLoadingStatePhotomaker = (isLoading) => ({
  type: SET_LOADING_STATE_PHOTOMAKER,
  isLoading,
});

// Thunk Creators for photomaker
export const generateImagePhotomaker = (photomakerData) => async (dispatch) => {
    dispatch(setLoadingStatePhotomaker(true));

    try {
        const response = await axios.post('/api/fal/proxy/photomaker', photomakerData);
        dispatch(createImageGenerationActionPhotomaker(response.data));
    } catch (error) {
        console.error('Error generating image with Photomaker API:', error);
        if (error.response) {
            console.error('Error response:', error.response);
        }
    } finally {
        dispatch(setLoadingStatePhotomaker(false));
    }
};

// Initial State for photomaker
const initialState = {
  photomakerResult: null,
  isLoading: false,
};

// Reducer for photomaker
export default function generateImagePhotomakerReducer(state = initialState, action) {
  switch (action.type) {
    case GENERATE_IMAGE_PHOTOMAKER:
      return { ...state, photomakerResult: action.result };
    case SET_LOADING_STATE_PHOTOMAKER:
      return { ...state, isLoading: action.isLoading };
    default:
      return state;
  }
}
