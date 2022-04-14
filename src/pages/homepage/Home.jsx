import React from "react";
import { Title, MenuButton } from "../../components/";
import { useNavigate } from "react-router";

import "./home.css";

const Home = ({ wallet, nearConfig, contract }) => {
    const signIn = () => {
        wallet.requestSignIn(
            {
                contractId: nearConfig.contractName,
                methodNames: [contract.addMessage.name],
            }, //contract requesting access
            "NEAR Mathematician",
            null,
            null
        );
    };
    const navigate = useNavigate();
    return (
        <div className="homepage">
            <Title title="Mathematics Game" />
            <MenuButton text="Start" clickFunc={() => navigate("/game")} />
        </div>
    );
};

export default Home;
