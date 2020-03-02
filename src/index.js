import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { reducer } from './reducer'
import { createStore } from 'redux'

const initializeState = () => {
    return {
        ssn: '',
        email: '',
        phone: '',
        country: '',
    }
}

const loadState = () => {
    try {
        let serializedState = localStorage.getItem("rocker-test-state");

        if (serializedState === null) {
            return initializeState();
        }
        return JSON.parse(serializedState);
    }
    catch (err) {
        return initializeState();
    }
}

const saveState = (state) => {
    try {
        let serializedState = JSON.stringify(state);
        localStorage.setItem("rocker-test-state", serializedState);
    }
    catch (err) {
    }
}

const store = createStore(reducer, loadState())

store.subscribe(() => {
    //this is just a function that saves state to localStorage
    saveState(store.getState());
});

ReactDOM.render(
    <Provider store={store} >
        <App />
    </Provider>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
