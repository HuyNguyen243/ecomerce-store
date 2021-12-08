import {
    AUTHENTICATE_USER,
    GET_GENERAL_DATA,
    GET_ONE_PRODUCT,

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
