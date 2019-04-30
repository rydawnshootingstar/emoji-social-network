import * as actionTypes from '../actions/types';

const initialURLState = {
    url: ''
}

const url = (state = initialURLState, action)=> {
    switch(action.type){
        case actionTypes.SET_URL_VALUE:
        return {
            ...state,
            url: action.payload.url
        }
        case actionTypes.CLEAR_URL_VALUE:
        return {
            ...state,
            url: ''
        }

        default: return state;
    }
}

export default url;