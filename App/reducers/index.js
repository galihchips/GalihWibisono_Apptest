import {combineReducers} from 'redux';

const initialState = {
  fetching: false,
  success: false,
  error: false,
  listContact: null,
  contact: null,
  message: null,
};

const dataContact = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CONTACTS_FETCHING':
      return {...state, fetching: true, success: false, error: false};
      break;
    case 'GET_CONTACTS_SUCCESS':
      return {
        ...state,
        fetching: false,
        success: true,
        error: false,
        listContact: action.data,
      };
      break;
    case 'GET_CONTACTS_ERROR':
      return {...state, error: action.payload, fetching: false};
      break;
    case 'GET_CONTACT_BY_ID_FETCHING':
      return {...state, fetching: true, success: false, error: false};
      break;
    case 'GET_CONTACT_BY_ID_SUCCESS':
      return {
        ...state,
        fetching: false,
        success: true,
        error: false,
        contact: action.data,
      };
      break;
    case 'GET_CONTACT_BY_ID_ERROR':
      return {...state, error: action.payload, fetching: false};
      break;
    case 'POST_CONTACT_FETCHING':
      return {...state, fetching: true, success: false, error: false};
      break;
    case 'POST_CONTACT_SUCCESS':
      return {
        ...state,
        fetching: false,
        success: true,
        error: false,
        message: action.data.message,
      };
      break;
    case 'POST_CONTACT_ERROR':
      return {...state, error: action.payload, fetching: false};
      break;
    case 'PUT_CONTACT_FETCHING':
      return {...state, fetching: true, success: false, error: false};
      break;
    case 'PUT_CONTACT_SUCCESS':
      return {
        ...state,
        fetching: false,
        success: true,
        error: false,
        message: action.data.message,
      };
      break;
    case 'PUT_CONTACT_ERROR':
      return {...state, error: action.payload, fetching: false};
      break;

    case 'DELETE_CONTACT_FETCHING':
      return {...state, fetching: true, success: false, error: false};
      break;
    case 'DELETE_CONTACT_SUCCESS':
      return {
        ...state,
        fetching: false,
        success: true,
        error: false,
        message: action.data.message,
      };
      break;
    case 'DELETE_CONTACT_ERROR':
      return {...state, error: action.payload, fetching: false};
      break;
    case 'RESET_POST_CONTACT':
      return {...state, message: null, success: false};
    case 'RESET_CONTACT':
      return {...state, contact: null};
    default:
  }
  return state;
};

const appReducer = combineReducers({
  data: dataContact,
});

export default appReducer;
