import axios from "axios";

// ACTION TYPES
const GENERATE_IMAGE = "GENERATE_IMAGE";

// ACTION CREATORS
const createImageGenerationAction = image => ({
  type: GENERATE_IMAGE,
  image
});

// THUNK CREATORS
export const generateImage = prompt => async dispatch => {
  try {
    const { data } = await axios.post(`/api/generate-image`, { prompt });
    dispatch(createImageGenerationAction(data));
  } catch (error) {
    console.error('Error generating image:', error);
  }
};

// INITIAL STATE
const initialState = {
  generatedImage: null
};

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GENERATE_IMAGE:
      return { ...state, generatedImage: action.image };
    default:
      return state;
  }
}

