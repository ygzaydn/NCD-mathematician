import React, { useEffect } from 'react';
import { Title, MenuButton, Text } from '../../components/';
import { useNavigate } from 'react-router';
import { getContext } from '../../context/scoreContext';
import PropTypes from 'prop-types';
import { DIVIDER, ATTACHED_GAS, ATTACHED_TOKENS } from '../../constants';

import './home.css';

const Home = ({ wallet, nearConfig, contract, currentUser }) => {
    const {
        difficulty: { name },
        setDifficulty,
        resetLocalhost,
    } = getContext();

    const navigate = useNavigate();

    useEffect(() => {
        resetLocalhost();
        contract.getStorage({ key: currentUser?.accountId }).then((res) => {
            if (res === 'payment completed') {
                navigate('/game');
            }
        });
    }, []);

    const signIn = () => {
        wallet.requestSignIn(
            {
                contractId: nearConfig.contractName,
                methodNames: [contract.predecessor],
            }, //contract requesting access
            'NEAR Mathematician',
            null,
            null
        );
    };

    const signOut = () => {
        wallet.signOut();
        window.location.replace(
            window.location.origin + window.location.pathname
        );
    };

    const startGame = async () => {
        if (currentUser?.accountId) {
            await contract.getTicket({}, ATTACHED_GAS, ATTACHED_TOKENS);
        } else {
            await signIn();
        }
    };

    const toggleDifficulty = () => {
        if (name === 'Easy') {
            setDifficulty({ name: 'Medium', value: 1 });
        }
        if (name === 'Medium') {
            setDifficulty({ name: 'Hard', value: 2 });
        }
        if (name === 'Hard') {
            setDifficulty({ name: 'Easy', value: 0 });
        }
    };

    return (
        <div className="homepage">
            {currentUser?.accountId && (
                <div className="homepage-logout">
                    <Text
                        content={currentUser.accountId}
                        size="2.5rem"
                        center="center"
                    />
                    <Text
                        content={`Balance: ${(
                            currentUser.balance / DIVIDER
                        ).toFixed(5)} NEAR`}
                        size="2.5rem"
                        center="center"
                    />

                    <MenuButton
                        text="Logout"
                        clickFunc={signOut}
                        width="20rem"
                        height="6rem"
                        margin="1rem 0"
                    />
                </div>
            )}

            <Title title="Mathematics Game" />
            {!currentUser?.accountId ? (
                <Text
                    content="Click button below to connect your wallet"
                    size="3.5rem"
                />
            ) : (
                <Text content="Entrance Ticket: 1 NEAR" size="2.5rem" />
            )}
            <MenuButton
                text={currentUser?.accountId ? 'Start' : 'Connect wallet'}
                clickFunc={() => startGame()}
            />
            {currentUser?.accountId && (
                <>
                    <Text content={`Difficulty: ${name}`} size="4.5rem" />
                    <Text
                        content="Change Difficulty"
                        cursor="pointer"
                        size="2.5rem"
                        clickFunc={toggleDifficulty}
                        color="white"
                        background="red"
                    />
                </>
            )}
            <Text content="How to play?" size="3rem" color="yellow" />
            <Text
                content="As you click start game, you'll pay some amount of NEAR to get a ticket. Later than that you'll be asked some math questions, by giving them correct answer you'll get points. When game ends, amount of score you obtain will decide the amount of NEAR you'll gain. As you increase the difficulty, you can have more score, but questions will be much more harder."
                size="2.25rem"
                fontWeight="200"
            />
        </div>
    );
};

Home.propTypes = {
    contract: PropTypes.any,
    currentUser: PropTypes.any,
    nearConfig: PropTypes.any,
    wallet: PropTypes.any,
};

export default Home;
