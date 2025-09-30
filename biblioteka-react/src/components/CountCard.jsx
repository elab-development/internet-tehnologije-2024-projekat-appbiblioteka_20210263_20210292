import React from 'react';
import PropTypes from 'prop-types';
import {FaBook, FaPenNib, FaTag, FaUser} from "react-icons/fa";

const CountCard = props => {

    const { title, count, iconClass } = props;

    const icons = {
        members: <FaUser/>,
        books: <FaBook />,
        authors: <FaPenNib />,
        genre: <FaTag/>,
    }

    return (
        <div className="count-card">
            <div className="icon">
                {icons[iconClass]}
            </div>
            <h2>{count}</h2>
            <p>{title}</p>
        </div>
    );
};

CountCard.propTypes = {
    title: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    iconClass: PropTypes.string.isRequired,
};

export default CountCard;
