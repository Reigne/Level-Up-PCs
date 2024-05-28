import {
    CREATE_BRAND_REQUEST,
    CREATE_BRAND_SUCCESS,
    CREATE_BRAND_FAIL,
    CREATE_BRAND_RESET,
    ALL_BRAND_REQUEST,
    ALL_BRAND_SUCCESS,
    ALL_BRAND_FAIL,
    SINGLE_BRAND_REQUEST,
    SINGLE_BRAND_SUCCESS,
    SINGLE_BRAND_FAIL,
    UPDATE_BRAND_REQUEST,
    UPDATE_BRAND_SUCCESS,
    UPDATE_BRAND_FAIL,
    UPDATE_BRAND_RESET,
    DELETE_BRAND_REQUEST,
    DELETE_BRAND_SUCCESS,
    DELETE_BRAND_RESET,
    DELETE_BRAND_FAIL,
    CLEAR_ERRORS,
  } from "../constants/brandConstants";
  
  export const createBrandReducer = (state = { brand: {} }, action) => {
    switch (action.type) {
      case CREATE_BRAND_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_BRAND_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          brand: action.payload.brand,
        };
      case CREATE_BRAND_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case CREATE_BRAND_RESET:
        return {
          ...state,
          success: false,
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
  
  export const brandsReducer = (state = { brands: [] }, action) => {
    switch (action.type) {
      case ALL_BRAND_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ALL_BRAND_SUCCESS:
        return {
          ...state,
          loading: false,
          brands: action.payload,
        };
      case ALL_BRAND_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
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
  
  export const singleBrandReducer = (state = { brand: {} }, action) => {
    switch (action.type) {
      case SINGLE_BRAND_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case SINGLE_BRAND_SUCCESS:
        return {
          ...state,
          loading: false,
          brand: action.payload,
        };
      case SINGLE_BRAND_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
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
  
  export const updateBrandReducer = (state = { brand: {} }, action) => {
    switch (action.type) {
      case UPDATE_BRAND_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case UPDATE_BRAND_SUCCESS:
        return {
          ...state,
          loading: false,
          updateSuccess: action.payload.success,
          brand: action.payload.brands,
        };
      case UPDATE_BRAND_FAIL:
        return {
          ...state,
          loading: false,
          errorUpdate: action.payload,
        };
      case UPDATE_BRAND_RESET: // Handle the reset action
        return {};
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const deleteBrandReducer = (state = { brand: {} }, action) => {
    switch (action.type) {
      case DELETE_BRAND_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_BRAND_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload.success,
        };
      case DELETE_BRAND_FAIL:
        return {
          ...state,
          loading: false,
          errorDelete: action.payload,
        };
      case DELETE_BRAND_RESET:
        return {};
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  