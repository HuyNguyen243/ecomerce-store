import {
    RESET_MODAL_POPUP,
    AUTHENTICATE_USER,
    GET_GENERAL_DATA,
    GET_ONE_PRODUCT,
    ADD_TO_CART,
    GET_CATEGORIES,
    MOST_VIEW,
    HEADER_TITLE,
    POST_INFORMATION_DELIVERY_USER,
    GET_INFORMATION_DELIVERY_USER,
    TARGET_ONE_INFORMATION_DELIVERY_USER,
    PUT_INFORMATION_DELIVERY_USER,
    CHECK_HANDLE_GET_DELIVERY_USER,
    GET_PROMOTION_VOUCHERS,
    GET_CODE_PROMOTION,
    DELETE_DELIVERY_USER,
    APPLY_PROMOTION,
    GET_CART,
    GET_SHIPPING_FEE,
    SUBMIT_ORDER,
    GET_ORDER,
    GET_ONE_ORDER,
    GET_TITLE_CATEGORIES
} from '../constants';

export const resetPopup = (id) => {
    return { type: RESET_MODAL_POPUP , payload: ''};
}

export const authenticateUser = (id) => {
    return { type: AUTHENTICATE_USER , payload: id};
}

export const getInitData = () => {
    return { type: GET_GENERAL_DATA , payload: ''};
}

export const getOneProduct = (id) => {
    return { type: GET_ONE_PRODUCT , payload: id};
}

export const addCart = () => {
    return { type: ADD_TO_CART , payload: ''};
}

export const getCategoriesByParentId = (id) => {
    return { type: GET_CATEGORIES , payload: id};
}

export const getIdMosview = (params) => {
    return { type: MOST_VIEW , payload: params};
}

export const headTitles = (key) => {
    return { type: HEADER_TITLE , payload: key};
}

export const postDeliveryUser = (user) => {
    return { type: POST_INFORMATION_DELIVERY_USER , payload: user};
}

export const getDeliveryUser = (id) => {
    return { type: GET_INFORMATION_DELIVERY_USER , payload: id};
}

export const getParentInformationDeviveryUser= (user) => {
    return { type: TARGET_ONE_INFORMATION_DELIVERY_USER , payload: user};
}

export const putDeliveryUser = (id,address) => {
    return { type: PUT_INFORMATION_DELIVERY_USER , payload: {id: id, body: address}};
}

export const checkGetDelivetyUser = (param) => {
    return { type: CHECK_HANDLE_GET_DELIVERY_USER , payload: param};
}

export const getPromotionvouchers = () => {
    return { type: GET_PROMOTION_VOUCHERS , payload: ''};
}

export const getCodePromotion = (code) => {
    return { type: GET_CODE_PROMOTION , payload: code};
}

export const deleteDeliveryUSer = (id) => {
    return { type: DELETE_DELIVERY_USER , payload: id};
}

export const applyPromotion = (body) => {
    return { type: APPLY_PROMOTION , payload: body};
}

export const getUserCarts = () => {
    return { type: GET_CART , payload: ""};
}

export const getOrderShippingFee = (params) => {
    return { type: GET_SHIPPING_FEE, payload: params};
}

export const createOrder = (body) => {
    return { type: SUBMIT_ORDER, payload: body };
}

export const getListOrders = () => {
    return { type: GET_ORDER, payload: '' };
}

export const getOneOrder = (order) => {
    return { type: GET_ONE_ORDER, payload: order };
}

export const getParentTitleCategories = (id) => {
    return { type: GET_TITLE_CATEGORIES, payload: id};
}