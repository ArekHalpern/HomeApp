import axios from 'axios';

// ACTION TYPES
const GENERATE_REALISTIC_IMAGE = 'GENERATE_REALISTIC_IMAGE';

// ACTION CREATORS
const createRealisticImageAction = image => ({
  type: GENERATE_REALISTIC_IMAGE,
  image,
});

// THUNK CREATORS
export const generateRealisticImage = prompt => async dispatch => {
  try {
    const { data } = await axios.post(`/api/realistic-image`, { prompt });
    dispatch(createRealisticImageAction(data.image));
  } catch (error) {
    console.error('Error generating realistic image:', error);
  }
};

// INITIAL STATE
const initialState = {
  image: [],
};

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GENERATE_REALISTIC_IMAGE:
      return { ...state, image: action.image };
    default:
      return state;
  }
}
