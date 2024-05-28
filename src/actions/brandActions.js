import axios from "axios";

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

export const createBrand = (brandData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_BRAND_REQUEST });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };


    const { data } = await axios.post(
      `/api/v1/brand/create`,
      brandData,
      config
    );



    dispatch({
      type: CREATE_BRAND_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("actions error", error);

    dispatch({
      type: CREATE_BRAND_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const allBrands = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_BRAND_REQUEST });
    const { data } = await axios.get("/api/v1/brands");

    dispatch({
      type: ALL_BRAND_SUCCESS,
      payload: data.brands,
    });
  } catch (error) {
    dispatch({
      type: ALL_BRAND_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const singleBrand = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_BRAND_REQUEST });

    const { data } = await axios.get(`/api/v1/brand/${id}`);

    dispatch({
      type: SINGLE_BRAND_SUCCESS,
      payload: data.brand,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_BRAND_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateBrand = (id, brandData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_BRAND_REQUEST });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.put(
      `/api/v1/brand/${id}`,
      brandData,
      config
    );
    dispatch({
      type: UPDATE_BRAND_SUCCESS,
      payload: data,
    });

    console.log("actions: ", data.success);
  } catch (error) {
    dispatch({
      type: UPDATE_BRAND_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const resetUpdateBrand = () => (dispatch) => {
  dispatch({ type: UPDATE_BRAND_RESET });
};

export const resetDeleteBrand = () => (dispatch) => {
  dispatch({ type: DELETE_BRAND_RESET });
};

export const deleteBrand = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BRAND_REQUEST });
    const { data } = await axios.delete(`/api/v1/brand/${id}`);
    dispatch({
      type: DELETE_BRAND_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_BRAND_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
