import { combineReducers } from 'redux';
import userReducer from './userSlice';
import projectReducer from './projectSlice';
import taskReducer from './taskSlice';

const rootReducer = combineReducers({
  user: userReducer,
  project: projectReducer,
  task: taskReducer,
});

export default rootReducer;
