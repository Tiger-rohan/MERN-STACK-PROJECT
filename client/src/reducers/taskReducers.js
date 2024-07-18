// src/reducers/taskReducer.js
import {
    CREATE_TASK_REQUEST,
    CREATE_TASK_SUCCESS,
    CREATE_TASK_FAILURE
  } from '../components/Admin/actions/actionTypes';
  
  const initialState = {
    loading: false,
    task: null,
    error: null
  };
  
  const taskReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_TASK_REQUEST:
        return {
          ...state,
          loading: true
        };
      case CREATE_TASK_SUCCESS:
        return {
          ...state,
          loading: false,
          task: action.payload
        };
      case CREATE_TASK_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default taskReducer;
  