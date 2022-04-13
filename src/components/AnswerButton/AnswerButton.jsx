import React from 'react';
import PropTypes from 'prop-types';

import './answerbutton.css';
import { AnswerCircle } from '../../icons';

const AnswerButton = ({ info, ind, clickFunc, disabled, correct }) => {
    return (
        <div className={`answerButton answerButton${ind + 1}`}>
            {ind >= 0 && (
                <button
                    id={info}
                    className={`answerButton ${
                        correct & disabled && 'chosenAnswer'
                    }  `}
                >
                    <AnswerCircle
                        number={info}
                        pos={ind + 1}
                        disabled={disabled}
                        onClick={() => (!disabled ? clickFunc(info) : null)}
                    />
                </button>
            )}
        </div>
    );
};

AnswerButton.propTypes = {
    ind: PropTypes.number,
    clickFunc: PropTypes.func,
    info: PropTypes.number,
    disabled: PropTypes.bool,
    correct: PropTypes.bool,
};

export default AnswerButton;
