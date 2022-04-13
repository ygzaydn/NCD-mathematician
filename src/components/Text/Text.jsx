import React from 'react';
import PropTypes from 'prop-types';

import './text.css';
import { Correct, False } from '../../icons';

const Text = ({ content, size, padding, icon, iconText }) => (
    <div className="text">
        <h2
            className="text__content"
            style={{
                fontSize: size || 'default',
                padding: padding || 'default',
            }}
        >
            {content}
        </h2>
        {icon && (
            <div className="text__icon">
                {iconText == 'correct' ? <Correct /> : <False />}
            </div>
        )}
    </div>
);

Text.propTypes = {
    content: PropTypes.string,
    size: PropTypes.string,
    padding: PropTypes.string,
    icon: PropTypes.bool,
    iconText: PropTypes.string,
};

export default Text;
