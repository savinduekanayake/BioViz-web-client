import React from 'react';
import PropTypes from 'prop-types';
import {LEFT, DIAGONAL, UP} from '../../../config/config';
// import Tooltip from '@material-ui/core/Tooltip';
// import {Button} from '@material-ui/core';
// import {makeStyles} from '@material-ui/core/styles';


// const useStyles = makeStyles((theme) => ({

//     customWidth: {
//         maxWidth: 'none',
//     },

// }));

export default function Cell(props) {
    const left = props.directions.indexOf(LEFT) >= 0 ? '\u2190' :
        '\u00A0\u00A0';
    const diagonal = props.directions.indexOf(DIAGONAL) >= 0 ? '\u2196' :
        '\u00A0\u00A0';
    const up = props.directions.indexOf(UP) >= 0 ? '\u2191' :
        '\u00A0\u00A0';
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>{diagonal}</td>
                        <td>{up}</td>
                    </tr>
                    <tr>
                        <td>{left}</td>
                        <td>{props.value}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    );
}

Cell.propTypes = {
    value: PropTypes.number,
    directions: PropTypes.arrayOf(PropTypes.number),
};
