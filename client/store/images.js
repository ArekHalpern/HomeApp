import axios from "axios";

// ACTION TYPES
const GET_IMAGES = "GET_IMAGES";
const GET_SINGLE_IMAGE = "GET_SINGLE_IMAGE";
const SAVE_IMAGE = 'SAVE_IMAGE';

// ACTION CREATORS
const getImages = images => ({
  type: GET_IMAGES,
  images
});

const getSingleImage = image => ({
  type: GET_SINGLE_IMAGE,
  image
});

const saveImageAction = image => ({
  type: SAVE_IMAGE,
  image
});

//THUNK CREATORS
export const fetchImages = () => async dispatch => {
  try {
    const token = window.localStorage.getItem('token');
    const { data } = await axios.get(`/api/images`, { headers: { Authorization: `Bearer ${token}` } });
    dispatch(getImages(data));
  } catch (error) {
    console.error(error);
  }
};


export const fetchSingleImage = id => async dispatch => {
  try {
    const token = window.localStorage.getItem('token');
    const response = await axios.get(`/api/images/${id}`, { 
      headers: { Authorization: `Bearer ${token}` } 
    });
    dispatch(getSingleImage(response.data));
  } catch (error) {
    console.error('Error fetching image:', error);
  }
};

export const saveImage = (imageData) => async dispatch => {
  try {
    const token = window.localStorage.getItem('token');
    const { data } = await axios.post('/api/images', imageData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(saveImageAction(data));
  } catch (error) {
    console.error('Error saving image:', error);
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



