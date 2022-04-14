import React from "react";
import "./styles/App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import { ScoreContextProvider } from "./context/scoreContext";

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
