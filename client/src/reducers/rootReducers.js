import { combineReducers } from 'redux';
import userDetailsReducer from './userDetailsReducers'; // Adjust the path as necessary
import taskReducer from './taskReducers';

const rootReducer = combineReducers({
  userDetails: userDetailsReducer,
  task: taskReducer,
  // Add other reducers here
});

export default rootReducer;
