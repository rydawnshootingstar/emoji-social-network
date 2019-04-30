import * as actionTypes from '../actions/types';

const initialUserState = {
    userName: null,
    isLoading: true
}

const user = (state = initialUserState, action)=> {
    switch(action.type){
        case actionTypes.SET_USER: 
            return{
                userName: action.payload.userName,
                userID: action.payload.userID,
                isLoading: false
            }

        case actionTypes.CLEAR_USER:
            return{
                ...state,
                userName: null
            };

        default: return state;
    }
}


export default user;