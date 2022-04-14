import React from "react";
import { Route, Routes } from "react-router-dom";
import Game from "../pages/game/Game";
import Home from "../pages/homepage/Home";
import Results from "../pages/results/Result";

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

export default Router;
