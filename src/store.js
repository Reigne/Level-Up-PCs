import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import { registerUser } from "./reducers/userReducers";
import {
  createCategoryReducer,
  categoriesReducer,
  singleCategoryReducer,
  updateCategoryReducer,
  deleteCategoryReducer,
} from "./reducers/categoryReducers";

import {
  createBrandReducer,
  brandsReducer,
  singleBrandReducer,
  updateBrandReducer,
  deleteBrandReducer,
} from "./reducers/brandReducers";

import {
  createProductReducer,
  productsReducer,
  singleProductReducer,
  updateProductReducer,
  deleteProductReducer,
} from "./reducers/productReducers";

const reducer = combineReducers({
  register: registerUser,
  createCategory: createCategoryReducer,
  categories: categoriesReducer,
  singleCategory: singleCategoryReducer,
  updateCategory: updateCategoryReducer,
  deleteCategory: deleteCategoryReducer,
  createBrand: createBrandReducer,
  brands: brandsReducer,
  singleBrand: singleBrandReducer,
  updateBrand: updateBrandReducer,
  deleteBrand: deleteBrandReducer,
  createProduct: createProductReducer,
  products: productsReducer,
  singleProduct: singleProductReducer,
  updateProduct: updateProductReducer,
  deleteProduct: deleteProductReducer,
});

const middlware = [thunk];
const store = createStore(
  reducer,
  // initialState,
  composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
