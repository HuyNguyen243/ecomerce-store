import {
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_SUCCESS,
  GET_GENERAL_DATA,
  GET_GENERAL_DATA_SUCCESS,
  GET_ONE_PRODUCT,
  GET_ONE_PRODUCT_SUCCESS,
  ADD_TO_CART,
  ADD_TO_CART_SUCCESS,
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  MOST_VIEW,
  MOST_VIEW_SUCCESS,
  HEADER_TITLE,
  POST_INFORMATION_DELIVERY_USER,
  POST_INFORMATION_DELIVERY_USER_SUCCESS,
  GET_INFORMATION_DELIVERY_USER,
  GET_INFORMATION_DELIVERY_USER_SUCCESS,
  TARGET_ONE_INFORMATION_DELIVERY_USER,
  PUT_INFORMATION_DELIVERY_USER,
  PUT_INFORMATION_DELIVERY_USER_SUCCESS,
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
  carts: CartService.get(),
  categories: {
    isLoaded : false,
    data: {}
  },
  mostview: {
    isLoaded : false,
    data: {}
  },
  headerTitles: ""
  ,
  deliveryUser: {
    isLoaded : false,
    data: {}
  },
  userAddress: {
    isLoaded : false,
    data: []
  },
  oneDeliveryUser : {},
  putDeliveryUser: {
    isLoaded : false,
    data: {}
  },
};

const rootReducer = (state = initState, action) => {
  let type = action.type;
  let payload = action.payload;
  switch (type) {
    case AUTHENTICATE_USER:
    case GET_ONE_PRODUCT:
    case GET_GENERAL_DATA:
    case GET_CATEGORIES:
    case MOST_VIEW:
    case POST_INFORMATION_DELIVERY_USER:
    case GET_INFORMATION_DELIVERY_USER:
    case PUT_INFORMATION_DELIVERY_USER:
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
      CartService.save(payload?.data?.carts)
      return Object.assign({}, state, {
        generalData: {
          isLoaded : true,
          data : payload?.data
        },
        carts: payload?.data?.carts,
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
    case GET_CATEGORIES_SUCCESS:
      return Object.assign({}, state, {
        categories: {
          isLoaded: true,
          data: payload.data
        },
        isLoading: false,
      });
      case MOST_VIEW_SUCCESS:
        return Object.assign({}, state, {
          mostview: {
            isLoaded: true,
            data: payload.data
          },
          isLoading: false,
        });
      case HEADER_TITLE:
        return Object.assign({}, state, {
          headerTitles: payload
        });
      case POST_INFORMATION_DELIVERY_USER_SUCCESS:
        let currentAddress = this.state.userAddress.data
        currentAddress.push(payload.data)
        return Object.assign({}, state, {
          deliveryUser: {
            isLoaded: true,
            data: payload.data
          },
          userAddress: {
            data: currentAddress
          },
          isLoading: false,
        });
      case GET_INFORMATION_DELIVERY_USER_SUCCESS:
        return Object.assign({}, state, {
          userAddress: {
            isLoaded: true,
            data: payload.data
          },
          isLoading: false,
        });
      case TARGET_ONE_INFORMATION_DELIVERY_USER:
        return Object.assign({}, state, {
          oneDeliveryUser: payload
        });
      case PUT_INFORMATION_DELIVERY_USER_SUCCESS:
        return Object.assign({}, state, {
          putDeliveryUser: {
            isLoaded: true,
            data: payload.data
          },
          isLoading: false,
        });
    default:
      return Object.assign({}, state, {
        isLoading: false
      });
      
  }
};

export default rootReducer;
