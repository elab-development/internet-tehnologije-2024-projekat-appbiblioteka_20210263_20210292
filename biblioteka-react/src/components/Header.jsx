import React from 'react';
import PropTypes from 'prop-types';

const Header = props => {
    return (
        <div className="header">
            <div>
                <h1 className="library-title">{props.title}</h1>
            </div>
        </div>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Header;
