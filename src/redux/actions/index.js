import {
    AUTHENTICATE_USER,
    GET_GENERAL_DATA,
    GET_ONE_PRODUCT,
    ADD_TO_CART,
    GET_CATEGORIES,
    MOST_VIEW,
    HEADER_TITLE,
    POST_INFORMATION_DELIVERY_USER,
    GET_INFORMATION_DELIVERY_USER,
} from '../constants';

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