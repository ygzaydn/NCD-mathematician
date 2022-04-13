import React, { useEffect, useRef, useState } from 'react';
import { Stickman } from '../../icons';
import { AnswerButton, Text } from '../../components';
import './game.css';
import { getContext } from '../../context/scoreContext';
import { useNavigate } from 'react-router';

const Game = () => {
    const gridRef = useRef(null);
    const dialogRef = useRef(null);
    const [question, setQuestion] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [correct, setCorrect] = useState(false);
    const [turn, setTurn] = useState(1);
    const [disabled, setDisabled] = useState(false);

    const navigate = useNavigate();

    const { generateQuestion, generateAnswers, setInformation, information } =
        getContext();

    useEffect(() => {
        setQuestion(generateQuestion());
        setInformation({
            question: {
                total: 0,
                correct: 0,
            },
            score: 0,
            tour: 1,
            summary: [],
        });
    }, []);

    useEffect(() => {
        if (turn === 11) {
            navigate('/result');
        }
        setQuestion(generateQuestion());
    }, [turn]);

    useEffect(() => {
        if (question[0] && question[1]) {
            setAnswers(generateAnswers(question));
        }
    }, [question]);

    const answerChecker = (answer) => {
        return answer === question[0] * question[1];
    };

    const answer = (answer) => {
        setDisabled(true);
        const gridInfo = gridRef.current;
        const dialogInfo = dialogRef.current;
        dialogInfo.style.visibility = 'visible';
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
                summary: [
                    ...information.summary,
                    {
                        question: `${question[0]} x ${question[1]} = ${answer}`,
                        answer: true,
                    },
                ],
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
                summary: [
                    ...information.summary,
                    {
                        question: `${question[0]} x ${question[1]} = ${answer}`,
                        answer: false,
                    },
                ],
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
            <div ref={dialogRef} className="gamepage__dialog">
                {turn !== 10 ? (
                    <>
                        {correct ? 'Correct ' : 'Wrong '} answer, new question
                        will appear in 3seconds!
                        {!correct && (
                            <>
                                <br />
                                <br />
                            </>
                        )}
                        {!correct &&
                            `Correct answer is:  ${question[0] * question[1]}`}
                    </>
                ) : (
                    'Game completed, results will be shown in 3seconds!'
                )}
            </div>
            <div className="gamepage__upper">
                <Text content={`Score: ${information.score}`} size="4rem" />
                <Text content={`Tour: ${information.tour}`} size="4rem" />
                <Text
                    content={`Questions: ${information.question.correct}/${information.question.total}`}
                    size="4rem"
                />
            </div>
            <div className="gamepage__lower">
                <div className="gamepage__left">
                    <Stickman text={`${question[0]} x ${question[1]}`} />
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
