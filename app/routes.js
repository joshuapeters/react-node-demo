import React from 'react';
import {IndexRoute, Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import Login from './components/Account/Login';
import Signup from './components/Account/Signup';
import Profile from './components/Account/Profile';
import Forgot from './components/Account/Forgot';
import Reset from './components/Account/Reset';
import Students from "./components/Students";
import Create from "./components/Create"
import * as ActionTypes from './actions/ActionTypes'

export default function getRoutes(store) {
    const ensureAuthenticated = (nextState, replace) => {
        if (!store.getState().auth.token) {
            replace('/login');
        }
    };
    const skipIfAuthenticated = (nextState, replace) => {
        if (store.getState().auth.token) {
            replace('/');
        }
    };
    const clearMessages = () => {
        store.dispatch({
            type: 'CLEAR_MESSAGES'
        });
    };
    const clearAddOrUpdate = () => {
        store.dispatch({
            type: ActionTypes.CLEAR_ADD_OR_UPDATE
        })
    };


    return (
        <Route path="/" component={App}>
            <IndexRoute component={Home} onLeave={clearMessages}/>
            <Route path="/students" component={Students} onEnter={ensureAuthenticated} onLeave={clearMessages}/>
            <Route path="/create" component={Create} onEnter={ensureAuthenticated} onLeave={clearMessages}/>
            <Route path="/edit/:id" component={Create} onEnter={ensureAuthenticated} onLeave={clearMessages}/>
            <Route path="/contact" component={Contact} onLeave={clearMessages}/>
            <Route path="/login" component={Login} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
            <Route path="/signup" component={Signup} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
            <Route path="/account" component={Profile} onEnter={ensureAuthenticated} onLeave={clearMessages}/>
            <Route path="/forgot" component={Forgot} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
            <Route path='/reset/:token' component={Reset} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
            <Route path="*" component={NotFound} onLeave={clearMessages}/>
        </Route>
    );
}
