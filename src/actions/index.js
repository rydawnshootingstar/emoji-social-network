import * as actionTypes from './types';

//user actions
export const setUser = ({userName, userID})=> {
    return{
        type: actionTypes.SET_USER,
        payload: {
            userName: userName,
            userID: userID
        }
    };
};

export const clearUser = ()=> {
    return{
        type: actionTypes.CLEAR_USER
    };
};

//form actions
export const setUrlValue = ({url})=> {
    return {
        type: actionTypes.SET_URL_VALUE,
        payload: {
            url
        }
    };
};

export const clearUrlValue = ()=> {
    return {
        type: actionTypes.CLEAR_URL_VALUE
    }
}