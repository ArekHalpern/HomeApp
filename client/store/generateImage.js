import axios from "axios";

// ACTION TYPES
const GENERATE_IMAGE = "GENERATE_IMAGE";

// ACTION CREATORS
const createImageGenerationAction = image => ({
  type: GENERATE_IMAGE,
  image
});

// THUNK CREATORS
export const generateImage = (prompt, negativePrompt) => async dispatch => {
  try {
    const { data } = await axios.post(`/api/generate-image`, { prompt, negativePrompt });
    const imageUrl = data.image[0];
    dispatch(createImageGenerationAction(imageUrl));
  } catch (error) {
    console.error('Error generating image:', error);
    // Handle error appropriately
  }
};

// INITIAL STATE
const initialState = {
  image: []
};

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GENERATE_IMAGE:
      return { ...state, image: [action.image] };
    default:
      return state;
  }
}


