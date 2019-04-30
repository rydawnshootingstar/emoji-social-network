import {createStore,combineReducers} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from '../reducers/user';
import url from '../reducers/url';

//dev tools - if they exist 
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(combineReducers({
        user: user,
        url: url
        }),  composeWithDevTools() //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

return store;
};

