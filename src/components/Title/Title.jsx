import React from 'react';
import PropTypes from 'prop-types';
import { UnderlineSVG } from '../../icons';
import './title.css';

const Title = ({ title, smallUnderline }) => (
    <div className="title" style={smallUnderline && { width: 'min-content' }}>
        <h2 className="title__text">{title}</h2>
        <UnderlineSVG width="100%" />
    </div>
);

Title.propTypes = {
    title: PropTypes.string,
    smallUnderline: PropTypes.bool,
};

export default Title;
