import axios from 'axios';
import {useDispatch} from 'react-redux';
// const dispatch = useDispatch();
const uri = 'https://simple-contact-crud.herokuapp.com';
const getContacts = dispatch => {
  return {
    type: 'GET_CONTACTS_FETCHING',
    payload: axios
      .get(uri + `/contact`)
      .then(res => {
        dispatch({
          type: 'GET_CONTACTS_SUCCESS',
          data: res.data,
        });
      })
      .catch(err => {
        dispatch({
          type: 'GET_CONTACTS_ERROR',
          data: err,
        });
      }),
  };
};

const getContactById = (dispatch, id) => {
  return {
    type: 'GET_CONTACT_BY_ID_FETCHING',
    payload: axios
      .get(uri + `/contact/${id}`)
      .then(res => {
        dispatch({
          type: 'GET_CONTACT_BY_ID_SUCCESS',
          data: res.data,
        });
      })
      .catch(err => {
        dispatch({
          type: 'GET_CONTACT_BY_ID_ERROR',
          data: err,
        });
      }),
  };
};

const postContact = (dispatch, data) => {
  return {
    type: 'POST_CONTACT_FETCHING',
    payload: axios
      .post(uri + `/contact`, data)
      .then(res => {
        alert(res.data?.message);
        dispatch({
          type: 'POST_CONTACT_SUCCESS',
          data: res.data,
        });
      })
      .catch(err => {
        alert(err.response?.data?.message);
        dispatch({
          type: 'POST_CONTACT_ERROR',
          data: err.response,
        });
      }),
  };
};

const putContact = (dispatch, id, data) => {
  return {
    type: 'PUT_CONTACT_FETCHING',
    payload: axios
      .put(uri + `/contact/${id}`, data)
      .then(res => {
        dispatch({
          type: 'PUT_CONTACT_SUCCESS',
          data: res.data,
        });
      })
      .catch(err => {
        alert(err.response?.data?.message);
        dispatch({
          type: 'PUT_CONTACT_ERROR',
          data: err.response,
        });
      }),
  };
};

const deleteContact = (dispatch, id) => {
  return {
    type: 'DELETE_CONTACT_FETCHING',
    payload: axios
      .delete(uri + `/contact/${id}`)
      .then(res => {
        alert(res.data?.message);
        dispatch({
          type: 'DELETE_CONTACT_SUCCESS',
          data: res.data,
        });
      })
      .catch(err => {
        console.log('err', err);
        alert(err.response?.data?.message);
        dispatch({
          type: 'DELETE_CONTACT_ERROR',
          data: err.response,
        });
      }),
  };
};

const resetContact = () => {
  return {
    type: 'RESET_CONTACT',
  };
};
const resetPostContact = () => {
  return {
    type: 'RESET_POST_CONTACT',
  };
};

module.exports = {
  getContacts,
  getContactById,
  postContact,
  putContact,
  resetContact,
  resetPostContact,
  deleteContact,
};
