import React from 'react';
import { Title, Text, MenuButton } from '../../components/';
import { useNavigate } from 'react-router';
import { getContext } from '../../context/scoreContext';

import './home.css';

const Home = () => {
    const { readLocalhost } = getContext();

    const {
        tour,
        question: { total, correct },
        score,
    } = readLocalhost();
    const navigate = useNavigate();
    return (
        <div className="homepage">
            <Title title="Mathematics Game" />
            {tour > 0 ? (
                <>
                    <Text content={`Total Point: ${score}`} />
                    <Text content={`Total Questions: ${total}`} />
                    <Text content={`Correct Answers: ${correct}`} />
                </>
            ) : (
                <>
                    <Text content="You don't have previous score data, click Start to begin" />
                </>
            )}

            <MenuButton text="Start" clickFunc={() => navigate('/game')} />
        </div>
    );
};

export default Home;
