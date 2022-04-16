import React from 'react';
import PropTypes from 'prop-types';

import './text.css';
import { Correct, False } from '../../icons';

const Text = ({
    content,
    size,
    padding,
    icon,
    iconText,
    cursor,
    clickFunc,
    center,
    color,
    fontWeight,
    background,
}) => (
    <div className="text" style={{ justifyContent: center || 'default' }}>
        <h2
            className="text__content"
            style={{
                fontSize: size || 'default',
                padding: padding || 'default',
                cursor: cursor || 'default',
                color: color || 'default',
                fontWeight: fontWeight || 'default',
                background: background || 'default',
            }}
            onClick={() => (clickFunc ? clickFunc() : {})}
        >
            {content}
        </h2>
        {icon && (
            <div className="text__icon">
                {iconText === 'correct' ? <Correct /> : <False />}
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
    cursor: PropTypes.string,
    clickFunc: PropTypes.func,
    center: PropTypes.string,
    color: PropTypes.string,
    fontWeight: PropTypes.string,
    background: PropTypes.string,
};

export default Text;
