import React from 'react';
import PropTypes from 'prop-types';


export default function LeftHeaderCell(props) {
    return (
        <div>
            {props.index} {props.value}
        </div>
    );
}

LeftHeaderCell.propTypes = {
    value: PropTypes.string,
    index: PropTypes.number,
};

