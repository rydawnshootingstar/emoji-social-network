import React from 'react';
import { Router, Switch, Route} from 'react-router-dom';
import App from './App';
import Register from './Register';
import Login from './Login';
import Feedback from './Feedback';
import createHistory from 'history/createBrowserHistory';

//deprecated - support removed in next major release
export const history = createHistory();

export const AppRouter = ()=> (
    <Router history={history}>
        <Switch>
            <Route path="/" component={App} exact={true}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/feedback" component={Feedback}></Route>
        </Switch>
    </Router>
)