import React, {Fragment} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

/**
 * In JSON response from backend matrices are denoted by
 * M -> 0
 * I1 -> 1
 * I2 -> 2
 */
const matrixIds = ['M', 'I\u2081', 'I\u2082'];

/**
 * Unicode values for arrows
 */
const arrows = ['\u2190', '\u2196', '\u2191'];


const colors = ['#00000030', '#00000060', '#00000075'];
const inPathColor = '#00FF0040';

const useStyles = makeStyles((theme) => ({
    zeroPadding: {
        '& tr': {
            '& td': {
                padding: 0,
            },
        },

    },
    table: {
        '& tbody': {
            '& tr': {

                borderWidth: 1,
                borderStyle: 'dashed',

            },
        },

        'width': '100%',
        'height': '100%',
        'borderSpacing': 0,
    },
}));


/**
 * Function to create matrix cell component.
 * (in extended scoring method)
 * @param {Object} props
 * @return {React.ReactElement}
 */
export default function ExtendedCell(props) {
    const classes = useStyles();
    const cellData = [];

    /**
     * Looping for all 3 matrices in a particular cell
     */
    for (let index = 0; index < 3; index++) {
        let directionArrow = '';
        let directionMatrices = [];
        if (props.directions[index].length > 0) {
            if (props.directions[index][0] !== 0) {
                directionArrow = arrows[props.directions[index][0][1] - 1];
                directionMatrices = props.directions[index].map((element) => {
                    return matrixIds[element[0]];
                });
            }
        }

        /**
         * Rendering symbol for infinity
         */
        if (props.scores[index] === '-inf') {
            props.scores[index] = '-\u221E';
        }

        /**
         * determining which part in the cell is in the path
         */
        const bgColor = index === props.inPathSegment ?
            inPathColor : colors[index];

        /**
         * For matrix M, do not show direction arrows or direction matrices
         * as there can be more than 4
         * space is not enough
         */
        if (index===0) {
            directionArrow = '';
            directionMatrices=[];
        }


        const cell = (
            <Fragment key={index}>
                <tr
                    style={{
                        height: props.cellSize / 2,
                        backgroundColor: bgColor,
                    }}
                >
                    <td
                        style={{
                            width: props.cellSize,
                            borderRight: 'thin dashed',
                        }}
                    >
                        {directionArrow}
                    </td>
                    <td
                        rowSpan="2"
                        style={{width: props.cellSize * 2, fontSize: 18}}>
                        <b>
                            {`${matrixIds[index]} : ${props.scores[index]}`}
                        </b>
                    </td>
                </tr>
                <tr
                    style={{
                        height: props.cellSize / 2,
                        backgroundColor: bgColor,
                    }}
                >
                    <td
                        style={{
                            width: props.cellSize,
                            borderRight: 'thin dashed',
                        }}
                    >
                        {directionMatrices.join(' ')}
                    </td>
                </tr>
            </Fragment>

        );


        cellData.push(cell);
    }
    return (
        <div style={{width: props.cellSize * 3, height: props.cellSize * 3}}>
            <table className={classes.table}>
                <tbody className={classes.zeroPadding}>
                    {cellData}
                </tbody>
            </table>

        </div>
    );
}

ExtendedCell.propTypes = {
    cellSize: PropTypes.number,
    inPathSegment: PropTypes.number,
    scores: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.number, PropTypes.string,
        ]),
    ),
    directions: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.oneOfType(
                [
                    PropTypes.number,
                    PropTypes.arrayOf(PropTypes.number),
                ],
            ),
        ),
    ),
};
