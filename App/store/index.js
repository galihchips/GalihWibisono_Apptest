import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import appReducer from '../reducers';
const middleware = [thunk];
const store = configureStore({
  reducer: appReducer,
  middleware: middleware,
});

export default store;
