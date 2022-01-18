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
  GET_ONE_ORDER_SUCCESS,

  GET_TITLE_CATEGORIES,

  DELETE_ORDER_PRODUCT,
  DELETE_ORDER_PRODUCT_SUCCESS,

  ON_CHANGE_LANG,

  GET_ID_BUTTON_TABS,

  SHOW_LOADER,
  
  SHOW_POPUP,

  SHOW_LOADING_ADDTOCART,

} from "../constants";

import Auth from "../../_services/auth";
import CartService from "../../_services/cart";
import LocaleHelper from './../../_helpers/locale';

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
  getTitleCategories : "",

  deleteoderproduct : {
    isLoaded : false,
    data : {}
  },
  reOderProduct : "",
  idBtnTabs: "",
  showSpinner:"",
  showPopUpAdventisement: "",
  loadingAddtoCart:""
};

const rootReducer = (state = initState, action) => {
  let type = action.type;
  let payload = action.payload;
  switch (type) {
    case ON_CHANGE_LANG:
      if(state.generalData?.data?.productByPromotion?.length > 0) {
        LocaleHelper.parseData('name', state.generalData?.data?.productByPromotion)
        LocaleHelper.parseData('title', state.generalData?.data?.banners)
        LocaleHelper.parseData('name', state.generalData?.data?.productByCategory)
      }
      if(state.categories?.data?.length > 0) {
        LocaleHelper.parseData('name', state.categories?.data)
      }
      if(state.mostview?.data?.length > 0) {
        LocaleHelper.parseData('name', state.mostview?.data)
      }
      if(state.product?.data?.name !== undefined) {
        LocaleHelper.parseData('name', [state.product?.data])
      }
      if(state.carts?.length > 0) {
        LocaleHelper.parseData('name', state.carts)
      }
      if(state.order?.reference_items?.length > 0) {
        LocaleHelper.parseData('name', state.order?.reference_items)
      }
      return Object.assign({}, state, {
        modalPopup: {
          active : false,
          data : {}
        }
      });
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
    case GET_ONE_ORDER:
    case DELETE_ORDER_PRODUCT:
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
      if(payload?.success) {
        LocaleHelper.parseData('name', payload?.data?.productByPromotion)
        LocaleHelper.parseData('title', payload?.data?.banners)
        LocaleHelper.parseData('name', payload?.data?.productByCategory)
      }
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
      LocaleHelper.parseData('name', [payload.data])
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
      if(payload?.success) {
        LocaleHelper.parseData('name', payload?.data)
      }
      return Object.assign({}, state, {
        categories: {
          isLoaded: true,
          data: payload.data
        },
        isLoading: false,
      });
      case MOST_VIEW_SUCCESS:
        if(payload?.success) {
          LocaleHelper.parseData('name', payload?.data)
        }
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
        let allAdress = state.userAddress.data;
        if(payload.data !== undefined){
          for(let i = 0 ;i < allAdress.length ; i++){
            if(payload.data.is_default === 1){
                allAdress[i].is_default = 0
            }
            if(allAdress[i]._id === payload.data._id){
                allAdress[i] = payload.data
            }
          }
        }
          return Object.assign({}, state, {
            putDeliveryUser: {
              isLoaded: true,
              data: payload.data
            },
            userAddress: {
              isLoaded: true,
              data: allAdress
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
        let allAdress2 = state.userAddress.data;
        if(payload.data !== undefined){
          for(let i = 0 ;i < allAdress2.length ; i++){
            if(allAdress2[i]._id === payload.data._id){
              allAdress2.splice(allAdress2[i],1)
            }
          }
        }
        return Object.assign({}, state, {
          delDeliveryUser: {
            isLoaded: true,
            data: payload
          },
          userAddress: {
            data: allAdress2
          },
          isLoading: false,
        });
      case APPLY_PROMOTION_SUCCESS:
        let appliedPromotionCode = "";
        if(payload.success) {
          appliedPromotionCode = payload.data?.code
          CartService.save(payload.data?.carts)
        }
        return Object.assign({}, state, {
          codePromotion: appliedPromotionCode,
          appliedPromotion: payload.data,
          isLoading: false,
          carts: CartService.get(),
          totalCartPrice: CartService.getTotalPrice(),
          modalPopup: {
            active : true,
            data : {
              success : payload.success,
              message : payload.message
            }
          }
        });
      case GET_CART_SUCCESS:
        LocaleHelper.parseData('name', payload?.data)
        CartService.save(payload?.data)
        return Object.assign({}, state, {
          carts: payload.data,
          isLoading: false,
          totalCartPrice : CartService.getTotalPrice()
        });
      case GET_SHIPPING_FEE_SUCCESS:
        return Object.assign({}, state, {
          shippingFee: payload.success ? payload.data : 0,
          nearestVendorId : payload.success ? payload.data?.vendor_id : '',
          isLoading: false,
        });
      case GET_ONE_ORDER_SUCCESS:
        if(payload.success) {
          LocaleHelper.parseData('name', payload?.data?.reference_items)
        }
        return Object.assign({}, state, {
          order: payload.data,
          isLoading: false
        });
      case GET_ORDER_SUCCESS:
        return Object.assign({}, state, {
          isLoading: false,
          orders: payload.data
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
      case GET_TITLE_CATEGORIES:
          // LocaleHelper.parseData('name', [payload])
          return Object.assign({}, state, {
            getTitleCategories: payload
          });
      case DELETE_ORDER_PRODUCT_SUCCESS:
        return Object.assign({}, state, {
          deleteoderproduct: {
            isLoaded: true,
            data: payload.data
          },
          order : payload.data,
          isLoading: false,
        });
      case GET_ID_BUTTON_TABS:
        return Object.assign({}, state, {
          idBtnTabs: payload
        });
      case SHOW_LOADER:
          return Object.assign({}, state, {
            showSpinner: payload
          });
      case SHOW_POPUP:
          return Object.assign({}, state, {
            showPopUpAdventisement: payload
          });
      case SHOW_LOADING_ADDTOCART:
        return Object.assign({}, state, {
          loadingAddtoCart: payload
        });
    default:
      return Object.assign({}, state, {
        isLoading: false
      });
  }
};

export default rootReducer;
