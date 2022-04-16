import React, { useEffect, useRef, useState } from 'react';
import { Stickman } from '../../icons';
import { AnswerButton, Text } from '../../components';
import './game.css';
import { getContext } from '../../context/scoreContext';
import { useNavigate } from 'react-router';

const Game = () => {
    const gridRef = useRef(null);
    const dialogRef = useRef(null);
    const textRef = useRef(null);
    const [question, setQuestion] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [correct, setCorrect] = useState(false);
    const [turn, setTurn] = useState(1);
    const [disabled, setDisabled] = useState(false);

    const navigate = useNavigate();

    const {
        generateQuestion,
        generateAnswers,
        setInformation,
        information,
        difficulty: { name },
    } = getContext();

    useEffect(() => {
        setQuestion(generateQuestion());
        setInformation({
            question: {
                total: 0,
                correct: 0,
            },
            score: 0,
        });
    }, []);

    useEffect(() => {
        if (turn >= 11) {
            navigate('/result');
        }
        setQuestion(generateQuestion());
    }, [turn]);

    useEffect(() => {
        if (question[0] && question[1]) {
            setAnswers(generateAnswers(question));
        }
    }, [question]);

    useEffect(() => {
        const timer = () => setTimeout(() => answer(0), 3000);
        let timerId = timer();
        if (disabled) {
            clearTimeout(timerId);
        }
        return () => clearTimeout(timerId);
    }, [disabled]);

    const answerChecker = (answer) => {
        return answer === question[0] * question[1];
    };

    const popupTextHandler = (answer) => {
        if (turn === 10) {
            return 'Game completed, results will appear in 3 seconds';
        }
        if (answer === 0) {
            return 'Time is up, next question will appear in 3 seconds';
        }
        if (correct) {
            return 'Your answer is correct, next question will appear in 3 seconds';
        } else {
            return 'Wrong ansnwer,  next question will appear in 3 seconds';
        }
    };

    const answer = (answer) => {
        const gridInfo = gridRef.current;
        const dialogInfo = dialogRef.current;

        dialogInfo.style.visibility = 'visible';
        setDisabled(true);

        textRef.current.innerHTML = popupTextHandler(answer);
        if (answerChecker(answer)) {
            gridInfo.className = 'gamepage gamepage--correct';
            setCorrect(true);
            setInformation({
                ...information,
                score: information.score + Math.ceil(Math.sqrt(answer)),
                question: {
                    total: information.question.total + 1,
                    correct: information.question.correct + 1,
                },
            });
        } else {
            gridInfo.className = 'gamepage gamepage--false';
            setCorrect(false);
            setInformation({
                ...information,
                question: {
                    ...information.question,
                    total: information.question.total + 1,
                },
            });
        }

        setTimeout(() => {
            dialogInfo.style.visibility = 'hidden';
            gridInfo.className = 'gamepage';
            setTurn(turn + 1);
            setDisabled(false);
        }, 3000);
    };

    return (
        <section ref={gridRef} className="gamepage">
            <span className="difficulty-span">Difficulty: {name}</span>
            <div ref={dialogRef} className="gamepage__dialog">
                <h2 ref={textRef}></h2>
            </div>
            <div className="gamepage__upper">
                <Text content={`Score: ${information.score}`} size="3rem" />
                <Text
                    content={`Questions: ${information.question.correct}/${information.question.total}`}
                    size="3rem"
                />
            </div>
            <div className="gamepage__lower">
                <div className="gamepage__left">
                    <Stickman
                        text={`${question[0]} x ${question[1]}`}
                        height="100%"
                    />
                </div>
                <div className="gamepage__right">
                    <div className="gamepage__right--down">
                        {answers?.map((el, ind) => (
                            <AnswerButton
                                key={ind + el + Math.random() * 5}
                                info={el}
                                disabled={disabled}
                                ind={ind}
                                clickFunc={() => answer(el)}
                                correct={
                                    parseInt(el) === question[0] * question[1]
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Game;
