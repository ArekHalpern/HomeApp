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
    // Extract the URL from the array inside the 'data.image' object
    const imageUrl = data.image[0]; // The variable 'imageUrl' is defined here
    dispatch(createImageGenerationAction(imageUrl)); // And used correctly here
  } catch (error) {
    console.error('Error generating image:', error);
    // Handle the error state update or display an error message if needed
  }
};

// INITIAL STATE
const initialState = {
  image: [],
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

