import React from 'react';
import PropTypes from 'prop-types';

import './menuButton.css';
import { MenuCircle } from '../../icons';

const MenuButton = ({ text, clickFunc, width, height, margin }) => (
    <div className="menuButton">
        <button className="menuButton" onClick={() => clickFunc()}>
            <MenuCircle
                color="white"
                width={width || '35rem'}
                height={height || '10rem'}
                text={text}
                margin={margin}
            />
        </button>
    </div>
);

MenuButton.propTypes = {
    text: PropTypes.string,
    clickFunc: PropTypes.func,
    width: PropTypes.string,
    height: PropTypes.string,
    margin: PropTypes.string,
};

export default MenuButton;
