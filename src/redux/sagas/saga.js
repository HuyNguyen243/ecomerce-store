import { takeLatest, call, put } from "redux-saga/effects";
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

  POST_INFORMATION_DELIVERY_USER,
  POST_INFORMATION_DELIVERY_USER_SUCCESS,

  GET_INFORMATION_DELIVERY_USER,
  GET_INFORMATION_DELIVERY_USER_SUCCESS,

  PUT_INFORMATION_DELIVERY_USER,
  PUT_INFORMATION_DELIVERY_USER_SUCCESS,

  GET_PROMOTION_VOUCHERS,
  GET_PROMOTION_VOUCHERS_SUCCESS,

  DELETE_DELIVERY_USER,
  DELETE_DELIVERY_USER_SUCCESS,
} from '../constants';
import { API_URL_V2 } from '../../_config/api.config';
import Auth from "../../_services/auth";
import CartService from "../../_services/cart";
import { get, post } from './../../api';

export default function* watcherSaga() {
  yield takeLatest(AUTHENTICATE_USER, workerSaga);
  yield takeLatest(GET_GENERAL_DATA, workerSaga);
  yield takeLatest(GET_ONE_PRODUCT, workerSaga);
  yield takeLatest(ADD_TO_CART, workerSaga);
  yield takeLatest(GET_CATEGORIES, workerSaga);
  yield takeLatest(MOST_VIEW, workerSaga);
  yield takeLatest(POST_INFORMATION_DELIVERY_USER, workerSaga);
  yield takeLatest(GET_INFORMATION_DELIVERY_USER, workerSaga);
  yield takeLatest(PUT_INFORMATION_DELIVERY_USER, workerSaga);
  yield takeLatest(GET_PROMOTION_VOUCHERS, workerSaga);
  yield takeLatest(DELETE_DELIVERY_USER, workerSaga);
}

function* workerSaga(param) {
  let actionParams = param.payload;
  let actionType = param.type;

  let action = '';
  let type = '';

  switch(actionType) {
    case AUTHENTICATE_USER:
      action = authenticate;
      type   = AUTHENTICATE_USER_SUCCESS;
      break;
    case GET_GENERAL_DATA:
      action = getInitData;
      type   = GET_GENERAL_DATA_SUCCESS;
      break;
    case GET_ONE_PRODUCT:
      action = getOneProduct;
      type   = GET_ONE_PRODUCT_SUCCESS;
      break;
    case ADD_TO_CART:
      action = addToCart;
      type   = ADD_TO_CART_SUCCESS;
      break;
    case GET_CATEGORIES:
      action = getCategoriesByParentId;
      type   = GET_CATEGORIES_SUCCESS;
      break;
    case MOST_VIEW:
        action = getIdMosview;
        type   = MOST_VIEW_SUCCESS;
        break;
    case POST_INFORMATION_DELIVERY_USER:
        action = postDeliveryUser;
        type   = POST_INFORMATION_DELIVERY_USER_SUCCESS;
        break;
    case GET_INFORMATION_DELIVERY_USER:
      action = getDeliveryUser;
      type   = GET_INFORMATION_DELIVERY_USER_SUCCESS;
      break;
    case PUT_INFORMATION_DELIVERY_USER:
      action = putDeliveryUser;
      type   = PUT_INFORMATION_DELIVERY_USER_SUCCESS;
      break;
    case GET_PROMOTION_VOUCHERS:
      action = getPromotionvouchers;
      type   = GET_PROMOTION_VOUCHERS_SUCCESS;
      break;
    case DELETE_DELIVERY_USER:
      action = deleteDeliveryUSer;
      type   = DELETE_DELIVERY_USER_SUCCESS;
      break;
    default:
  }
  if (action !== '' && type !== '') {
    try {
      const payload = yield call(action, actionParams);
      yield put({ type: type, payload });
    } catch (e) {
      yield put({ type: '', payload: e });
    }
  }
}

function authenticate(body) {
  let shouldAuth = false;
  return post(`${API_URL_V2}/login`, body, shouldAuth);
}

function getInitData() {
  let shouldAuth = false;
  return get(`${API_URL_V2}/?token=${Auth.get().token}`, shouldAuth);
}

function getOneProduct(id) {
  return get(`${API_URL_V2}/products/${id}?token=${Auth.get().token}`);
}

function addToCart() {
  let shouldAuth = false;
  let formData = new FormData();
  formData.append('products', JSON.stringify(CartService.get()))
  return post(`${API_URL_V2}/carts?token=${Auth.get().token}`, formData, shouldAuth);
}

function getCategoriesByParentId(id) {
  return get(`${API_URL_V2}/categories/${id}?token=${Auth.get().token}`);
}

function getIdMosview(params) {
  return get(`${API_URL_V2}/products/?token=${Auth.get().token}${params}`);
}

function postDeliveryUser(user) {
  return post(`${API_URL_V2}/users/address?token=${Auth.get().token}`,user);
}

function getDeliveryUser(id) {
  return get(`${API_URL_V2}/users/address/${id}?token=${Auth.get().token}`);
}

function putDeliveryUser(param) {
  return post(`${API_URL_V2}/users/address/${param.id}/update?token=${Auth.get().token}`,param.body);
}

function getPromotionvouchers() {
  return get(`${API_URL_V2}/promotions/vouchers/?token=${Auth.get().token}`);
}

function deleteDeliveryUSer(id) {
  return post(`${API_URL_V2}/users/address/${id}/delete?token=${Auth.get().token}`);
}

