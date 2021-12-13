import {
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_SUCCESS,
  GET_GENERAL_DATA,
  GET_GENERAL_DATA_SUCCESS,
  GET_ONE_PRODUCT,
  GET_ONE_PRODUCT_SUCCESS,
  ADD_TO_CART,
  ADD_TO_CART_SUCCESS,
} from "../constants";

import Auth from "../../_services/auth";
import CartService from "../../_services/cart";

const initState = {
  isLoading: false,
  isAuthenticated: false,
  product: {
    isLoaded : false,
    data: {}
  },
  generalData: {
    isLoaded : false,
    data: {}
  },
  carts: CartService.get()
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
    case ADD_TO_CART:
      return Object.assign({}, state, {
        carts: CartService.get(),
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
      return Object.assign({}, state, {
        generalData: {
          isLoaded : true,
          data : payload.data
        },
        isLoading: false,
      });
    case GET_ONE_PRODUCT_SUCCESS:
      return Object.assign({}, state, {
        product: {
          isLoaded: true,
          data: payload.data
        },
        isLoading: false,
      });
    case ADD_TO_CART_SUCCESS:
      return Object.assign({}, state, {
        carts: CartService.get(),
        isLoading: false,
      });
    default:
      return Object.assign({}, state, {
        isLoading: false
      });
  }
};

export default rootReducer;
