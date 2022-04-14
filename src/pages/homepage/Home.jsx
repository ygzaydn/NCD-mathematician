import React from 'react';
import { Title, MenuButton, Text } from '../../components/';
import { useNavigate } from 'react-router';
import { getContext } from '../../context/scoreContext';
import PropTypes from 'prop-types';

import './home.css';

const Home = ({ wallet, nearConfig, contract, currentUser }) => {
    const {
        difficulty: { name },
        setDifficulty,
    } = getContext();

    const navigate = useNavigate();

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
        window.location.replace(window.location.origin + window.location.pathname);
      };
   
    const startGame = async () => {
        if (currentUser?.accountId) {
            const res = await contract.sayHi();
            console.log(res);
            navigate('/game');
        } else {
            await signIn();
        }
    };

    const toggleDifficulty = () => {
        if(name === 'Easy'){
            setDifficulty({name: 'Medium', value:1});
        }
        if(name === 'Medium'){
            setDifficulty({name: 'Hard', value:2});
        }
        if(name === 'Hard'){
            setDifficulty({name: 'Easy', value:0});
        }
    };

    return (
        <div className="homepage">
            {currentUser?.accountId && <span className="homepage-logout" onClick={() => signOut()}>Logout</span>}
            <Text content={`Difficulty: ${name}`} size="4.5rem" />
            <Text content="Change Difficulty" cursor="pointer" size="2.5rem" clickFunc={toggleDifficulty}/>
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
                text={currentUser?.accountId ? 'Start' : 'Connect wallet'}
                clickFunc={() => startGame()}
            />
            <Text content="How to play?" size="3rem" />
            <Text
                content="As you click start game, you'll pay some amount of NEAR to get a ticket. Later than that you'll be asked some math questions, by giving them correct answer you'll get points. When game ends, amount of score you obtain will decide the amount of NEAR you'll gain. As you increase the difficulty, you can have more score, but questions will be much more harder."
                size="2.25rem"
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
