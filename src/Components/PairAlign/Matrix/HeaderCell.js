import React from 'react';
import PropTypes from 'prop-types';


export default function HeaderCell(props) {
    return (
        <div>
            {props.index}
            <br/>
             {props.value}
        </div>
    );
}

HeaderCell.propTypes = {
    value: PropTypes.string,
    index: PropTypes.number,
};

