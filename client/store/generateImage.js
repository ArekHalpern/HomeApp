import axios from "axios";

// ACTION TYPES
const GENERATE_IMAGE = "GENERATE_IMAGE";

// ACTION CREATORS
const createImageGenerationAction = result => ({
  type: GENERATE_IMAGE,
  result
});

// THUNK CREATORS
export const generateImage = prompt => async dispatch => {
  console.log('Sending prompt from frontend:', prompt);

  try {
    const { data } = await axios.post(`/api/generate-image`, { prompt });
    dispatch(createImageGenerationAction(data));
  } catch (error) {
    console.error('Error generating image:', error);
    // Handle error appropriately
  }
};

// INITIAL STATE
const initialState = {
  result: null
};

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GENERATE_IMAGE:
      return { ...state, result: action.result };
    default:
      return state;
  }
}

