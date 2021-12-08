import {
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_SUCCESS,
  GET_GENERAL_DATA,
  GET_GENERAL_DATA_SUCCESS,
  GET_ONE_PRODUCT,
  GET_ONE_PRODUCT_SUCCESS,
} from "../constants";

import Auth from "../../_services/auth";

const initState = {
  isLoading: false,
  isAuthenticated: false,
  product: {},
  generalData: {},
};

const rootReducer = (state = initState, action) => {
  let type = action.type;
  let payload = action.payload;
  switch (type) {
    case AUTHENTICATE_USER:
    case GET_ONE_PRODUCT:
    case GET_GENERAL_DATA:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case AUTHENTICATE_USER_SUCCESS:
      if (payload.success) {
        Auth.set(payload.data);
      }
      return Object.assign({}, state, {
        isAuthenticated: payload.success,
        isLoading: false,
      });
    case GET_GENERAL_DATA_SUCCESS:
      let responseData = [];
      if (payload.success) {
        responseData = payload.data;
      }
      return Object.assign({}, state, {
        generalData: responseData,
        isLoading: false,
      });
    
    case GET_ONE_PRODUCT_SUCCESS:
      return Object.assign({}, state, {
        product: payload.data,
        isLoading: false,
      });
    default:
      return Object.assign({}, state, {
        isLoading: false
      });
  }
};

export default rootReducer;
