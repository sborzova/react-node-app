import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import * as serviceWorker from './serviceWorker';
import Keycloak from 'keycloak-js';
import axios from "axios";

const kc = Keycloak('./keycloak.json');
const token = localStorage.getItem('kc_token');
const refreshToken = localStorage.getItem('kc_refreshToken');


kc.init({onLoad: 'login-required', promiseType: 'native', token, refreshToken})
    .then(authenticated => {
        if (authenticated) {
            updateLocalStorage();
            ReactDOM.render(<App/>, document.getElementById('root'));
        }
    });

axios.interceptors.request.use(config => (
    kc.updateToken(10)
        .then(refreshed => {
            if (refreshed) {
                updateLocalStorage()
            }
            config.headers.Authorization = 'Bearer ' + kc.token;
            return Promise.resolve(config)
        })
        .catch(() => {
            kc.login();
        })
));

const updateLocalStorage = () => {
    localStorage.setItem('kc_token', kc.token);
    localStorage.setItem('kc_refreshToken', kc.refreshToken);
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
