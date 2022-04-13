import React from 'react';
import './styles/App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';
import { ScoreContextProvider } from './context/scoreContext';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <ScoreContextProvider>
                    <Router />
                </ScoreContextProvider>
            </BrowserRouter>
        </div>
    );
};

export default App;
