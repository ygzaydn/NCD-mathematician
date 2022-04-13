import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

const initialState = {
    question: {
        total: 0,
        correct: 0,
    },
    score: 0,
    tour: 0,
    summary: [],
};

export const ScoreContext = React.createContext(null);

export const ScoreContextProvider = ({ children }) => {
    const [information, setInformation] = useState(initialState);

    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem('scoretable'));
        if (!storage) {
            localStorage.setItem(
                'scoretable',
                JSON.stringify({ ...initialState })
            );
        }
    }, []);

    const readLocalhost = () => {
        const data = localStorage.getItem('scoretable');
        if (data) {
            return JSON.parse(data);
        } else return initialState;
    };

    const writeLocalhost = (item) => {
        const data = JSON.parse(localStorage.getItem('scoretable'));

        const dataToWrite = {
            ...data,
            score: data.score + item.score,
            tour: data.tour + item.tour,
            question: {
                total: data.question.total + item.question.total,
                correct: data.question.correct + item.question.correct,
            },
            summary: [...item.summary],
        };
        localStorage.setItem('scoretable', JSON.stringify(dataToWrite));
    };

    const shuffleArray = (array) => {
        let currentIndex = array.length,
            randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }

        return array;
    };

    const generateQuestion = () => {
        let firstNumber = parseInt(Math.random() * 10);
        let secondNumber = parseInt(Math.random() * 10);
        if (!firstNumber) {
            firstNumber++;
        }
        if (!secondNumber) {
            secondNumber++;
        }
        return [firstNumber, secondNumber];
    };

    const generateAnswers = (question) => {
        const correctAnswer = question[0] * question[1];
        const random = parseInt(Math.random() * 10) % 2;
        let fakeAnswerFirst = (question[random] + 1) * question[1 - random];
        let fakeAnswerSecond = (question[1 - random] + 1) * question[random];
        if (fakeAnswerFirst === fakeAnswerSecond) {
            fakeAnswerSecond = (question[1 - random] + 2) * question[random];
        }
        if (fakeAnswerFirst === fakeAnswerSecond) {
            fakeAnswerFirst = (question[random] + 2) * question[1 - random];
        }
        const result = [correctAnswer, fakeAnswerFirst, fakeAnswerSecond];
        return shuffleArray(result);
    };

    const value = {
        information,
        setInformation,
        readLocalhost,
        writeLocalhost,
        generateQuestion,
        generateAnswers,
    };

    return (
        <ScoreContext.Provider value={{ ...value }}>
            {children}
        </ScoreContext.Provider>
    );
};

ScoreContextProvider.propTypes = {
    children: PropTypes.any,
};

export const getContext = () => {
    return useContext(ScoreContext);
};
