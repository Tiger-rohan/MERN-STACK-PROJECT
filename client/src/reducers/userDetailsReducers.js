import { FETCH_USER_DETAILS_SUCCESS, UPDATE_USER_DETAILS_SUCCESS, USER_DETAILS_ERROR } from '../components/Admin/actions/userDetailsAction';

const initialState = {
    userDetails: {},
    error: null
};

const userDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_DETAILS_SUCCESS:
            return {
                ...state,
                userDetails: action.payload,
                error: null
            };
        case UPDATE_USER_DETAILS_SUCCESS:
            return {
                ...state,
                userDetails: action.payload,
                error: null
            };
        case USER_DETAILS_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default userDetailsReducer;
