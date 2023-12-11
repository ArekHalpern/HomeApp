import axios from "axios";

// ACTION TYPES
const GET_IMAGES = "GET_IMAGES";
const GET_SINGLE_IMAGE = "GET_SINGLE_IMAGE";
const SAVE_IMAGE = 'SAVE_IMAGE';
const EDIT_IMAGE = 'EDIT_IMAGE';
const DELETE_IMAGE = 'DELETE_IMAGE';

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

const editSingleImage = image => ({
  type: EDIT_IMAGE,
  image
});

const deleteSingleImage = image => ({
  type: DELETE_IMAGE,
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

export const editImage = (imageData) => async dispatch => {
  try {
    const token = window.localStorage.getItem('token');
    const { data } = await axios.put(`/api/images/${imageData.id}`, imageData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(editSingleImage(data));
  } catch (error) {
    console.error('Error editing image:', error);
  }
}

export const deleteImage = (imageData) => async dispatch => {
  try {
    const token = window.localStorage.getItem('token');
    const { data } = await axios.delete(`/api/images/${imageData.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(deleteSingleImage(data));
  } catch (error) {
    console.error('Error deleting image:', error);
  }
}

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
    case SAVE_IMAGE:
      return { ...state, images: [...state.images, action.image] };
    case EDIT_IMAGE:
      return {
        ...state, 
        images: state.images.map(image => image.id === action.image.id ? action.image : image),
        selectedImage: action.image
      };
    case DELETE_IMAGE:
      return {
        ...state,
        images: state.images.filter(image => image.id !== action.image.id)
      };
    default:
      return state;
  }
}




