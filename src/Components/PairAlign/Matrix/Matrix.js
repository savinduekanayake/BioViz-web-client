import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';
import {FixedSizeGrid} from 'react-window';
import {makeStyles} from '@material-ui/core/styles';
import {nwResult} from '../DummyData';

const inputLenA = 30;
const inputLenB = 30;
const scoreMatrix = nwResult.result.score_matrix;
const path = nwResult.result.alignments[0].path;
const pathSet = new Set();
path.forEach((p) => {
    pathSet.add(`${p[0]}${p[1]}${p[0] * p[1]}`);
});

const useStyles = makeStyles((theme) => ({
    cell: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    inpath: {
        backgroundColor: 'red',
    },
}));


export default function Matrix() {
    const classes = useStyles();

    const makeCell = ({columnIndex, rowIndex, style}) => {
        const cIdx = columnIndex;
        const rIdx = rowIndex;
        let cell;
        let inPath;
        if (cIdx === 0) {
            if (rIdx === 0) {
                cell = '...';
            } else {
                cell = <b>G</b>;
            }
        } else if (rIdx === 0) {
            cell = <b>A</b>;
        } else {
            cell = <Cell value={scoreMatrix[rIdx - 1][cIdx - 1]} />;
            inPath = pathSet.has(
                `${rIdx - 1}${cIdx - 1}${(rIdx - 1) * (cIdx - 1)}`,
            );
        }

        return (
            <div style={style}
                className={`${classes.cell} ${inPath ? classes.inpath : ''}`}>
                {cell}
            </div>
        );
    };

    makeCell.propTypes = {
        columnIndex: PropTypes.number.isRequired,
        rowIndex: PropTypes.number.isRequired,
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    };

    return (
        <FixedSizeGrid
            className="Grid"
            columnCount={inputLenB}
            columnWidth={50}
            height={300}
            rowCount={inputLenA}
            rowHeight={35}
            width={600}
        >
            {makeCell}
        </FixedSizeGrid>

    );
}
