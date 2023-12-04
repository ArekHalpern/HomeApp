import axios from "axios";

// ACTION TYPES
const GET_IMAGES = "GET_IMAGES";
const GET_SINGLE_IMAGE = "GET_SINGLE_IMAGE";

// ACTION CREATORS
const getImages = images => ({
  type: GET_IMAGES,
  images
});

const getSingleImage = image => ({
  type: GET_SINGLE_IMAGE,
  image
});

//THUNK CREATORS
export const fetchImages = () => async dispatch => {
  try {
    const { data } = await axios.get(`/api/images`);
    dispatch(getImages(data));
  } catch (error) {
    console.error(error);
  }
};

export const fetchSingleImage = id => async dispatch => {
  try {
    const { data } = await axios.get(`/api/images/${id}`);
    console.log(data); 
    dispatch(getSingleImage(data));
  } catch (error) {
    console.error(error);
  }
};

// INITIAL STATE
const initialState = {
  images: [],
  selectedImage: {}
};

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_IMAGES:
      return { ...state, images: action.images };
    case GET_SINGLE_IMAGE:
      return { ...state, selectedImage: action.image };
    default:
      return state;
  }
}



