import {
  CLEAR_ERRORS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
} from "../constants/userConstants";

export const registerUser = (state = { user: {} }, action) => {
  switch (action.type) {
    //request
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    //success
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        success: true,
      };

    //fail
    case REGISTER_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
