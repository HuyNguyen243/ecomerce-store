import { takeLatest, call, put } from "redux-saga/effects";
import {
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_SUCCESS,
  
  GET_GENERAL_DATA,
  GET_GENERAL_DATA_SUCCESS,

  GET_ONE_PRODUCT,
  GET_ONE_PRODUCT_SUCCESS,

} from '../constants';
import { API_URL_V2 } from '../../_config/api.config';
import Auth from "../../_services/auth";

import { get, post } from './../../api';

export default function* watcherSaga() {
  yield takeLatest(AUTHENTICATE_USER, workerSaga);
  yield takeLatest(GET_GENERAL_DATA, workerSaga);
  yield takeLatest(GET_ONE_PRODUCT, workerSaga);
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
    default:
      action = '';
      type   = '';
      break;
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
  return get(`${API_URL_V2}/products/${id}`);
}
