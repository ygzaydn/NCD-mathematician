import React, { useEffect } from 'react';

import { Text, Title, MenuButton } from '../../components';
import { getContext } from '../../context/scoreContext';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import Big from 'big.js';
import './result.css';

const ATTACHED_GAS = Big(1)
    .times(10 ** 14)
    .times(3)
    .toFixed(); // NEAR --> 10k picoNEAR conversion

const Game = ({ contract, currentUser }) => {
    const { writeLocalhost, information } = getContext();
    const navigate = useNavigate();
    useEffect(() => {
        writeLocalhost(information);
        contract.getStorage({ key: currentUser?.accountId }).then((res) => {
            if (res === 'payment completed') {
                if (currentUser?.accountId) {
                    contract.finishGame(
                        {
                            amount: Big(1)
                                .times(10 ** 24)
                                .times(information.score / 100)
                                .toFixed(5),
                        },
                        ATTACHED_GAS,
                        0
                    );
                }
            }
        });
    }, []);

    const restartPage = () => {
        navigate('/');
    };

    return (
        <section className="resultpage">
            <div className="resultpage__leftgrid">
                <Title title="Final" smallUnderline />
                <Text
                    content={`Point: ${information.score}`}
                    padding="1rem 0"
                />
                <Text
                    content={`Questions: ${information.question.total}`}
                    padding="1rem 0"
                />
                <Text
                    content={`Correct Answer: ${information.question.correct}`}
                    padding="1rem 0"
                />
                <MenuButton text="Restart" clickFunc={() => restartPage()} />
            </div>
            <div className="resultpage__rightgrid">
                <Title title="All Question" smallUnderline />
                {information.summary.map((el, ind) => (
                    <Text
                        content={el.question}
                        padding=".5rem 0"
                        size="4.5rem"
                        icon
                        iconText={el.answer ? 'correct' : 'false'}
                        key={ind}
                    />
                ))}
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
