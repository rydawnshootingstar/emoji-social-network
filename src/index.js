import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import 'semantic-ui-less/semantic.less';
import firebase from './firebase/firebase';
import { Provider} from 'react-redux';
import { setUser, clearUser } from './actions/index';
import configureStore from './store/configureStore';
import Spinner from './components/Spinner';
import {AppRouter, history} from './components/AppRouter';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;

const renderApp = ()=>{
    if(!hasRendered){
        ReactDOM.render(jsx, document.getElementById('root'));
        hasRendered = true;
    }
};

//load page until asyc actions are completed
ReactDOM.render(<Spinner/>, document.getElementById('root'));

firebase.auth().onAuthStateChanged((user)=> {
    if(user){
        console.log(user);
        store.dispatch(setUser({userName: user.displayName, userID: user.uid}));
        renderApp();
        history.push('/');
    }else{
        store.dispatch(clearUser());
        renderApp();
        history.push('/login');
    }
});
