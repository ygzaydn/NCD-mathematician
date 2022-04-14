import React from 'react';
import './styles/App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';
import { ScoreContextProvider } from './context/scoreContext';

import PropTypes from 'prop-types';

const App = ({ contract, currentUser, nearConfig, wallet }) => {
    return (
        <div>
            <BrowserRouter>
                <ScoreContextProvider>
                    <Router
                        contract={contract}
                        currentUser={currentUser}
                        nearConfig={nearConfig}
                        wallet={wallet}
                    />
                </ScoreContextProvider>
            </BrowserRouter>
        </div>
    );
};

App.propTypes = {
    contract: PropTypes.any,
    currentUser: PropTypes.any,
    nearConfig: PropTypes.any,
    wallet: PropTypes.any,
};

export default App;
