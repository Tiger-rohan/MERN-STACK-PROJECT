import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // We will create this next

const store = configureStore({
  reducer: rootReducer,
});

export default store;
