import {
    AUTHENTICATE_USER,
    GET_GENERAL_DATA,
    GET_ONE_PRODUCT,
    ADD_TO_CART,
    GET_CATEGORIES

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