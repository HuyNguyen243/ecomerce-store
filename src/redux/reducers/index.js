import {
  RESET_MODAL_POPUP,

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

  CHECK_HANDLE_GET_DELIVERY_USER,

  GET_PROMOTION_VOUCHERS,
  GET_PROMOTION_VOUCHERS_SUCCESS,

  GET_CODE_PROMOTION,
  
  DELETE_DELIVERY_USER,
  DELETE_DELIVERY_USER_SUCCESS,

  GET_CART,
  GET_CART_SUCCESS,

  APPLY_PROMOTION,
  APPLY_PROMOTION_SUCCESS,

  GET_SHIPPING_FEE,
  GET_SHIPPING_FEE_SUCCESS,

  SUBMIT_ORDER,
  SUBMIT_ORDER_SUCCESS,

  GET_ORDER,
  GET_ORDER_SUCCESS,

  GET_ONE_ORDER,

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
  totalCartPrice: CartService.getTotalPrice(),
  categories: {
    isLoaded : false,
    data: {}
  },
  mostview: {
    isLoaded : false,
    data: {}
  },
  headerTitles: "",
  deliveryUser: {
    isLoaded : false,
    data: {}
  },
  userAddress: {
    isLoaded : false,
    data: []
  },
  oneDeliveryUser : "",
  putDeliveryUser: {
    isLoaded : false,
    data: {}
  },
  modalPopup : {
    active : false,
    data : {}
  },
  checkGetDeliveryUser : {
    active : false,
    data : {}
  },
  promotionVoucher : {
    isLoaded : false,
    data : {}
  },
  codePromotion : "",
  delDeliveryUser : {
    isLoaded : false,
    data : {}
  },
  appliedPromotion : {},
  shippingFee: 0,
  nearestVendorId: '',
  orders: {
    isLoaded : false,
    data: {}
  },
  order: {},
};

const rootReducer = (state = initState, action) => {
  let type = action.type;
  let payload = action.payload;
  switch (type) {
    case RESET_MODAL_POPUP:
      return Object.assign({}, state, {
        modalPopup: {
          active : false,
          data : {}
        }
      });
    case AUTHENTICATE_USER:
    case GET_ONE_PRODUCT:
    case GET_GENERAL_DATA:
    case GET_CATEGORIES:
    case MOST_VIEW:
    case POST_INFORMATION_DELIVERY_USER:
    case GET_INFORMATION_DELIVERY_USER:
    case PUT_INFORMATION_DELIVERY_USER:
    case GET_PROMOTION_VOUCHERS:
    case DELETE_DELIVERY_USER:
    case APPLY_PROMOTION:
    case GET_CART:
    case GET_SHIPPING_FEE:
    case SUBMIT_ORDER:
    case GET_ORDER:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case ADD_TO_CART:
      return Object.assign({}, state, {
        carts: CartService.get(),
        totalCartPrice : CartService.getTotalPrice()
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
        totalCartPrice : CartService.getTotalPrice()
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
        let currentAddress = state.userAddress.data
        if(payload.data !== undefined){
          currentAddress.push(payload.data)
        }
        return Object.assign({}, state, {
          deliveryUser: {
            isLoaded: true,
            data: payload.data
          },
          userAddress: {
            data: currentAddress
          },
          isLoading: false,
          modalPopup: {
            active : true,
            data : {
              success : payload.success,
              message : payload.message
            }
          }
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
          oneDeliveryUser: payload,
          shippingFee : 0
        });
      case PUT_INFORMATION_DELIVERY_USER_SUCCESS:
        return Object.assign({}, state, {
          putDeliveryUser: {
            isLoaded: true,
            data: payload.data
          },
          isLoading: false,
          modalPopup: {
            active : true,
            data : {
              success : payload.success,
              message : payload.message
            }
          }
        });
      case CHECK_HANDLE_GET_DELIVERY_USER:
          return Object.assign({}, state, {
            checkGetDeliveryUser: payload
          });
      case GET_PROMOTION_VOUCHERS_SUCCESS:
        return Object.assign({}, state, {
          promotionVoucher: {
            isLoaded: true,
            data: payload
          },
          isLoading: false,
        });
      case GET_CODE_PROMOTION:
        return Object.assign({}, state, {
          codePromotion: payload
        });
      case DELETE_DELIVERY_USER_SUCCESS:
        return Object.assign({}, state, {
          delDeliveryUser: {
            isLoaded: true,
            data: payload
          },
          isLoading: false,
        });
      case APPLY_PROMOTION_SUCCESS:
        let appliedPromotionCode = payload.success ? payload.data?.code : ''
        return Object.assign({}, state, {
          codePromotion: appliedPromotionCode,
          appliedPromotion: payload.data,
          isLoading: false,
          modalPopup: {
            active : true,
            data : {
              success : payload.success,
              message : payload.message
            }
          }
        });
      case GET_CART_SUCCESS:
        CartService.save(payload?.data)
        return Object.assign({}, state, {
          carts: payload.data,
          isLoading: false,
          totalCartPrice : CartService.getTotalPrice()
        });
      case GET_SHIPPING_FEE_SUCCESS:
        return Object.assign({}, state, {
          shippingFee: payload.success ? payload.data?.shipping_fee : 0,
          nearestVendorId : payload.success ? payload.data?.vendor_id : '',
          isLoading: false,
        });
      case SUBMIT_ORDER_SUCCESS:
        let popupData = {
          active : true,
          data : {
            success : payload.success,
            message : payload.message
          }
        }
        if(payload.success) {
          CartService.empty()
          return Object.assign({}, state, {
            isLoading: false,
            carts: [],
            codePromotion: "",
            appliedPromotion : {},
            shippingFee: 0,
            nearestVendorId: '',
            totalCartPrice: 0,
            oneDeliveryUser: "",
            modalPopup: popupData
          });
        }else {
          return Object.assign({}, state, {
            isLoading: false,
            modalPopup: popupData
          });
        }
      case GET_ONE_ORDER:
        return Object.assign({}, state, {
          order: payload
        });
      case GET_ORDER_SUCCESS:
        return Object.assign({}, state, {
          isLoading: false,
          orders: payload.data
        });
    default:
      return Object.assign({}, state, {
        isLoading: false
      });
  }
};

export default rootReducer;
