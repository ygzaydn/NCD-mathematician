import React from "react";
import "./styles/App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import { ScoreContextProvider } from "./context/scoreContext";
import Big from "big.js";

const SUGGESTED_DONATION = "10";
const BOATLOAD_OF_GAS = Big(3)
    .times(10 ** 13)
    .toFixed();

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

export default App;
