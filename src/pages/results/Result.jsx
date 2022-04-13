import React, { useEffect } from 'react';

import { Text, Title, MenuButton } from '../../components';
import { getContext } from '../../context/scoreContext';
import { useNavigate } from 'react-router';
import './result.css';

const Game = () => {
    const { writeLocalhost, information, setInformation } = getContext();
    const navigate = useNavigate();
    useEffect(() => {
        writeLocalhost(information);
    }, []);

    const restartPage = () => {
        setInformation({ ...information, tour: information.tour + 1 });
        navigate('/game');
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

export default Game;
