import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import HeaderCell from './HeaderCell';
import {FixedSizeGrid} from 'react-window';
import {makeStyles} from '@material-ui/core/styles';
import LeftHeaderCell from './LeftHeaderCell';
import {Grid} from '@material-ui/core';
import ExtendedCell from './ExtendedCell';


const useStyles = makeStyles((theme) => ({
    cell: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        verticalAlign: 'middle',
        borderWidth: 2,
        borderStyle: 'solid',
    },
    inpath: {
        backgroundColor: 'lightgreen',
    },
    /**
     * making scrollbars smaller for better usability
     */
    hideScroll: {
        '&::-webkit-scrollbar': {
            width: '0.5em',
            height: '0.5em',
        },
        '&::-webkit-scrollbar-button': {
            background: '#aaa',
        },
        '&::-webkit-scrollbar-track-piece': {
            background: '#000',
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#fff',
        },
    },
    matrix: {
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 10,
    },
}));

const cellSize = 40;
const matrixSize = 400;

/**
 * Component to display DP matrix for extended scoring method (with affine gaps)
 * @param {Object} props
 * @return {React.ReactElement}
 */
export default function ExtendedMatrix(props) {
    /**
     * Ref s are used to synchronize matrix scrolling with
     * header rows and header columns
     */
    const headerRef = React.createRef();
    const leftHeaderRef = React.createRef();
    const gridRef = React.createRef();

    const classes = useStyles();

    const inputLenA = props.input.seqA.length;
    const inputLenB = props.input.seqB.length;
    const scoreMatrix = props.result.score_matrix;
    const directionMatrix = props.result.direction_matrix;
    const path = props.result.alignments.length>0 ?
        props.result.alignments[props.selected].path : [];
    const pathSet = new Set();

    /**
     * convering path array to a set of string elements for faster lookups
     */
    path.forEach((p) => {
        pathSet.add(`${p[0]}|${p[1]}|${p[2]}`);
    });

    /**
     * During initial rendering, scroll to the begining
     * of the path in the matrix
     */
    const scrollToPath = () => {
        if (path.length > 0) {
            gridRef.current.scrollToItem({
                align: 'center',
                columnIndex: path[path.length - 1][1],
                rowIndex: path[path.length - 1][0],
            });
        }
    };
    useEffect(() => {
        scrollToPath();
    });

    /**
     * Function to create a header cell
     * @param {Object} param
     * @param {Number} param.columnIndex - column index of cell
     * @return {React.ReactElement}
     */
    const makeHeaderCell = ({columnIndex, style}) => {
        const cIdx = columnIndex;
        const headerCell = cIdx === 0 ? 'Seq. 2' :
            <HeaderCell value={props.input.seqB[cIdx - 1]} index={cIdx} />;
        return (
            <div style={style} className={classes.cell}>
                {headerCell}
            </div>
        );
    };
    makeHeaderCell.propTypes = {
        columnIndex: PropTypes.number.isRequired,
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    };


    /**
     * Function to create a left header cell
     * @param {Object} param
     * @param {Number} param.rowIndex - row index of cell
     * @return {React.ReactElement}
     */
    const makeLeftHeaderCell = ({rowIndex, style}) => {
        const rIdx = rowIndex;
        const leftHeaderCell = rIdx === 0 ? 'Seq. 1' :
            <LeftHeaderCell value={props.input.seqA[rIdx - 1]} index={rIdx} />;
        return (
            <div style={style} className={classes.cell}>
                {leftHeaderCell}
            </div>
        );
    };
    makeLeftHeaderCell.propTypes = {
        rowIndex: PropTypes.number.isRequired,
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    };


    /**
     * Function to create a cell in matrix
     * @param {Object} param
     * @param {Number} param.columnIndex - column index of cell
     * @param {Number} param.rowIndex - row index of cell
     * @return {React.ReactElement}
     */
    const makeCell = ({columnIndex, rowIndex, style}) => {
        const cIdx = columnIndex;
        const rIdx = rowIndex;
        let inPathSegment;
        for (let index = 0; index < 3; index++) {
            if (pathSet.has(`${rIdx}|${cIdx}|${index}`)) {
                inPathSegment = index;
                break;
            }
        }


        const cell = <ExtendedCell
            scores={scoreMatrix[rIdx][cIdx]}
            directions={directionMatrix[rIdx][cIdx]}
            cellSize={cellSize}
            inPathSegment={inPathSegment}/>;


        return (
            <div style={style}
                className={`${classes.cell}`}>
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
        <div className={classes.matrix}>
            <Grid container direction="row" spacing={1} align="center"
                justify="center"
                alignItems="center">
                <Grid item>
                    <div style={{height: cellSize}}>&nbsp;</div>
                    <br />
                    <FixedSizeGrid
                        className="Grid"
                        columnCount={1}
                        columnWidth={cellSize}
                        height={matrixSize}
                        rowCount={inputLenA + 1}
                        rowHeight={cellSize*3}
                        width={cellSize}
                        ref={leftHeaderRef}
                        style={{
                            overflowX: 'hidden',
                            overflowY: 'hidden',
                        }}
                    >

                        {makeLeftHeaderCell}
                    </FixedSizeGrid>
                </Grid>
                <Grid item>
                    <FixedSizeGrid
                        className="Grid"
                        columnCount={inputLenB + 1}
                        columnWidth={cellSize*3}
                        height={cellSize}
                        rowCount={1}
                        rowHeight={cellSize}
                        width={matrixSize}
                        ref={headerRef}
                        style={{
                            overflowX: 'hidden',
                            overflowY: 'hidden',
                        }}

                    >
                        {makeHeaderCell}
                    </FixedSizeGrid>
                    <br />

                    <FixedSizeGrid
                        className={classes.hideScroll}
                        columnCount={inputLenB + 1}
                        columnWidth={cellSize*3}
                        height={matrixSize}
                        rowCount={inputLenA + 1}
                        rowHeight={cellSize*3}
                        width={matrixSize}
                        ref={gridRef}
                        /**
                         * synchronizing scorlling of matrix and
                         * header rows, header columns
                         */
                        onScroll={({scrollLeft, scrollTop}) => {
                            headerRef.current.scrollTo({scrollLeft});
                            leftHeaderRef.current.scrollTo({scrollTop});
                        }
                        }

                    >
                        {makeCell}
                    </FixedSizeGrid>

                </Grid>
            </Grid>

        </div>

    );
}


ExtendedMatrix.propTypes = {
    input: PropTypes.shape({
        seqA: PropTypes.string,
        seqB: PropTypes.string,
    }),
    result: PropTypes.shape({
        score_matrix: PropTypes.arrayOf(PropTypes.arrayOf(
            PropTypes.arrayOf(PropTypes.oneOfType(
                [PropTypes.number, PropTypes.string])))),
        direction_matrix: PropTypes.arrayOf(
            PropTypes.arrayOf(
                PropTypes.arrayOf(PropTypes.number))),
        alignments: PropTypes.arrayOf(
            PropTypes.shape({
                path: PropTypes.arrayOf(
                    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))),
            })),
    }),
    selected: PropTypes.number,
};

