import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';
import HeaderCell from './HeaderCell';
import {FixedSizeGrid} from 'react-window';
import {makeStyles} from '@material-ui/core/styles';
import LeftHeaderCell from './LeftHeaderCell';
import {Grid} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    cell: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        verticalAlign: 'middle',

    },
    inpath: {
        backgroundColor: 'red',
    },
    hideScroll: {
        '&::-webkit-scrollbar': {
            width: '0.5em',
            height: '0.2em',
        },
        '&::-webkit-scrollbar-button': {
            background: '#ccc',
        },
        '&::-webkit-scrollbar-track-piece': {
            background: '#888',
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#eee',
        },
    },
}));


export default function Matrix(props) {
    const headerRef = React.createRef();
    const leftHeaderRef = React.createRef();
    const classes = useStyles();
    const gridRef = React.createRef();

    const inputLenA = props.input.seqA.length;
    const inputLenB = props.input.seqB.length;
    const scoreMatrix = props.result.score_matrix;
    const path = props.result.alignments[props.selected].path;
    const pathSet = new Set();
    path.forEach((p) => {
        pathSet.add(`${p[0]}${p[1]}${p[0] * p[1]}`);
    });

    const scrollToPath = () => {
        gridRef.current.scrollToItem({
            align: 'center',
            columnIndex: path[path.length - 1][1],
            rowIndex: path[path.length - 1][0],
        });
    };
    useEffect(() => {
        scrollToPath();
    });

    const makeHeaderCell = ({columnIndex, style}) => {
        const cIdx = columnIndex;
        const headerCell = cIdx === 0 ? '' :
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


    const makeLeftHeaderCell = ({rowIndex, style}) => {
        const rIdx = rowIndex;
        const leftHeaderCell = rIdx === 0 ? '' :
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


    const makeCell = ({columnIndex, rowIndex, style}) => {
        const cIdx = columnIndex;
        const rIdx = rowIndex;


        const cell = <Cell value={scoreMatrix[rIdx][cIdx]} />;
        const inPath = pathSet.has(
            `${rIdx}${cIdx}${(rIdx) * (cIdx)}`,
        );


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
        <div>
            <Grid container direction="row" spacing={1}>
                <Grid item>
                    <div style={{height: 35}}>&nbsp;</div>
                    <br/>
                    <FixedSizeGrid
                        className="Grid"
                        columnCount={1}
                        columnWidth={30}
                        height={300}
                        rowCount={inputLenA + 1}
                        rowHeight={35}
                        width={30}
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
                        columnWidth={30}
                        height={35}
                        rowCount={1}
                        rowHeight={35}
                        width={300}
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
                        columnWidth={30}
                        height={300}
                        rowCount={inputLenA + 1}
                        rowHeight={35}
                        width={300}
                        ref={gridRef}
                        onScroll={({scrollLeft, scrollTop}) =>{
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

Matrix.propTypes = {
    input: PropTypes.shape({
        seqA: PropTypes.string,
        seqB: PropTypes.string,
    }),
    result: PropTypes.shape({
        score_matrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
        alignments: PropTypes.arrayOf(
            PropTypes.shape({
                path: PropTypes.arrayOf(
                    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))),
            })),
    }),
    selected: PropTypes.number,
};

