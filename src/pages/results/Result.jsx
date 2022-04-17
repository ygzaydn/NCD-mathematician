import React, { useState, useEffect } from 'react';

import { Text, Title, MenuButton } from '../../components';
import { getContext } from '../../context/scoreContext';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import Big from 'big.js';
import './result.css';
import { ATTACHED_GAS, DIVIDER } from '../../constants';

const Game = ({ contract, currentUser }) => {
    const [prevRuns, setPrevRuns] = useState([]);
    const { writeLocalhost, information, readLocalhost } = getContext();
    const navigate = useNavigate();
    const {
        question: { total },
        score,
        question: { correct },
    } = readLocalhost();

    const calculateProfit = () => {
        let profit = 0;
        if (information.score > 100) {
            profit = (information.score - 100) / 100;
        } else if (score > 0) {
            profit = (score - 100) / 100;
        } else {
            profit = 0.25;
        }
        return profit;
    };

    useEffect(() => {
        writeLocalhost(information);

        contract.getStorage({ key: currentUser?.accountId }).then((res) => {
            if (res === 'payment completed') {
                setTimeout(() => {
                    if (currentUser?.accountId) {
                        contract.finishGame(
                            {
                                amount: Big(1)
                                    .times(10 ** 24)
                                    .times(calculateProfit())
                                    .toFixed(5),
                            },
                            ATTACHED_GAS,
                            0
                        );
                    }
                }, 3000);
            }
        });
        getMap().then((res) => {
            setPrevRuns([...res]);
        });
    }, []);

    const restartPage = () => {
        navigate('/');
    };

    const getMap = async () =>
        await contract.getMap({ key: currentUser.accountId });

    return (
        <section className="resultpage">
            <div className="resultpage__leftgrid">
                <Title title="Final" smallUnderline />
                <Text
                    content={`Point: ${score}`}
                    padding="1rem 0"
                    size="4rem"
                />
                <Text
                    content={`Questions: ${total}`}
                    padding="1rem 0"
                    size="4rem"
                />
                <Text
                    content={`Correct Answer: ${correct}`}
                    padding="1rem 0"
                    size="4rem"
                />
                <MenuButton text="Restart" clickFunc={() => restartPage()} />
            </div>
            <div className="resultpage__rightgrid">
                <Title title="Previous Records" smallUnderline />
                {!prevRuns.length ? (
                    <Text
                        content="No previous record found"
                        padding="1rem 0"
                        size="4rem"
                    />
                ) : (
                    <>
                        {prevRuns.map((el, ind) => (
                            <Text
                                key={el + ind}
                                content={`+${(el / DIVIDER).toFixed(4)} NEAR`}
                                size="2rem"
                            />
                        ))}
                    </>
                )}
            </div>
        </section>
    );
};

Game.propTypes = {
    contract: PropTypes.any,
    currentUser: PropTypes.any,
    nearConfig: PropTypes.any,
    wallet: PropTypes.any,
};

export default Game;
