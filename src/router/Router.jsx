import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Game from '../pages/game/Game';
import Home from '../pages/homepage/Home';
import Results from '../pages/results/Result';
import PropTypes from 'prop-types';

const Router = ({ contract, currentUser, nearConfig, wallet }) => (
    <Routes>
        <Route
            path="/"
            element={
                <Home
                    contract={contract}
                    currentUser={currentUser}
                    nearConfig={nearConfig}
                    wallet={wallet}
                />
            }
        />
        <Route
            path="/game"
            element={
                <Game
                    contract={contract}
                    currentUser={currentUser}
                    nearConfig={nearConfig}
                    wallet={wallet}
                />
            }
        />
        <Route
            path="/result"
            element={
                <Results
                    contract={contract}
                    currentUser={currentUser}
                    nearConfig={nearConfig}
                    wallet={wallet}
                />
            }
        />
    </Routes>
);

Router.propTypes = {
    contract: PropTypes.any,
    currentUser: PropTypes.any,
    nearConfig: PropTypes.any,
    wallet: PropTypes.any,
};

export default Router;
