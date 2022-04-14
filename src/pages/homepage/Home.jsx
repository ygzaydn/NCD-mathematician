import React from "react";
import { Title, MenuButton, Text } from "../../components/";
import { useNavigate } from "react-router";
import { getContext } from "../../context/scoreContext";

import "./home.css";

const Home = ({ wallet, nearConfig, contract, currentUser }) => {
    const {
        difficulty: { name },
    } = getContext();
    const navigate = useNavigate();
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

    const startGame = async () => {
        if (currentUser?.accountId) {
            await contract.enterGame();
            navigate("/game");
        } else {
            await signIn();
        }
    };

    return (
        <div className="homepage">
            <Text content={`Difficulty: ${name}`} size="4.5rem" />
            <Title title="Mathematics Game" />
            {currentUser?.accountId ? (
                <Text
                    content={`Hello ${currentUser?.accountId}`}
                    size="3.5rem"
                />
            ) : (
                <Text
                    content="Click button below to connect your wallet"
                    size="3.5rem"
                />
            )}
            <MenuButton
                text={currentUser?.accountId ? "Start" : "Click your wallet"}
                clickFunc={() => startGame()}
            />
            <Text content="How to play?" size="3rem" />
            <Text
                content="As you click start game, you'll be asked some math questions, by giving them correct answer you'll get points. When game ends, amount of score you obtain will decide the amount of NEAR you'll gain. As you increase the difficulty, you can have more score."
                size="2.25rem"
            />
        </div>
    );
};

export default Home;
