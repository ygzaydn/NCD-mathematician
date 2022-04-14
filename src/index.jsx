/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import initContract from './utils';

window.Buffer = window.Buffer || require('buffer').Buffer;

window.nearInitPromise = initContract().then(
    ({ contract, currentUser, nearConfig, walletConnection }) => {
        ReactDOM.render(
            <App
                contract={contract}
                currentUser={currentUser}
                nearConfig={nearConfig}
                wallet={walletConnection}
            />,
            document.getElementById('root')
        );
    }
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
