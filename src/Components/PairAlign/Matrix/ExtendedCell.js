import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';


const matrixIds = ['M', 'I\u2081', 'I\u2082'];
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


export default function ExtendedCell(props) {
    const classes = useStyles();
    const cellData = [];
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
        if (props.scores[index] === '-inf') {
            props.scores[index] = '-\u221E';
        }

        const bgColor = index === props.inPathSegment ?
            inPathColor : colors[index];

        const cell = (
            <>
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
            </>

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
