import React from 'react';
import {Box} from '@material-ui/core';
import PropTypes from 'prop-types';
import MinimizeIcon from '@material-ui/icons/Minimize';
import DoneOutlineRoundedIcon from '@material-ui/icons/DoneOutlineRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    A: {
        color: 'red',
    },
    C: {
        color: 'blue',
    },
    G: {
        color: 'purple',
    },
    T: {
        color: 'green',
    },
    label: {
        color: '#7984d3de',
    },
    score: {
        color: '#c7ba78de',
    },
    sc: {
        color: '#d3d6f0',
    },
    box: {
        backgroundColor: '#141938',
        color: '#e9e3e3de',
        borderRadius: '10px',
        padding: 10,
        paddingBottom: 40,
    },
    table: {
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    tablerow: {
        width: 1500,
        overflowX: 'scroll',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}));

export default function GameResult(props) {
    const classes = useStyles();
    const alignA = props.aligns.alignA;
    const alignB = props.aligns.alignB;
    const matchScore = props.aligns.match;
    const mismatchPenanlty = props.aligns.mismatch;
    const gapPenalty = props.aligns.gap;
    const minLength = Math.min(alignA.length, alignB.length);
    const row = [];
    let score = 0;
    let matchSc = 0;
    let mismatchSc = 0;
    let gapSc = 0;


    for (let i = 0; i < minLength; i++) {
        if ((alignA.charAt(i) === '-' || alignB.charAt(i) === '-') ||
            (alignA.charAt(i) === 'e' || alignB.charAt(i) === 'e')) {
            score += gapPenalty;
            gapSc += gapPenalty;
            row.push({type: <MinimizeIcon />, index: i+1});
        } else if (alignA.charAt(i) === alignB.charAt(i)) {
            score += matchScore;
            matchSc += matchScore;
            row.push({type: <DoneOutlineRoundedIcon
                 className={classes[alignA.charAt(i)]} />, index: i+1});
        } else {
            score += mismatchPenanlty;
            mismatchSc += mismatchPenanlty;
            row.push({type: <CloseRoundedIcon style={{color: '#9b8989'}} />,
             index: i+1});
        }
    }

    const result = row.map(
        (ele) => <td key={ele.index}>{ele.type}
            <h4 style={{color: '#868dac'}}>{ele.index}</h4></td>);

    return (
        <Box className={classes.box}>
            <br />
            <h2>Result</h2>
            <h3>Alignment Status</h3>
            <table className={classes.tablerow}>
                <tbody>
                    <tr>
                        {result}
                    </tr>
                </tbody>
            </table>
            <table className={classes.table}>
                <tbody>
                    <tr className={classes.label}>
                        <td><h4>Match</h4></td>
                        <td><DoneOutlineRoundedIcon
                            style={{color: '#787d94'}} /></td>
                        <td style={{minWidth: 15}}></td>
                        <td><h4>Mismatch</h4></td>
                        <td><CloseRoundedIcon style={{color: '#9b8989'}} /></td>
                        <td style={{minWidth: 15}}></td>
                        <td><h4>Gap</h4></td>
                        <td><MinimizeIcon style={{color: '#e9e3e3de'}} /></td>
                    </tr>
                </tbody>
            </table>
            <h3>Alignment Score</h3>
            <table className={classes.table}>
                <tbody>
                    <tr className={classes.score}>
                        <td><h3>Total Score</h3></td>
                            <td style={{minWidth: 5}}></td>
                        <td><h3 className={classes.sc}>{score}</h3></td>
                            <td style={{minWidth: 30}}></td>
                        <td><h3>Match Score</h3></td>
                            <td style={{minWidth: 2}}></td>
                        <td><h3 className={classes.sc}>{matchSc}</h3></td>
                            <td style={{minWidth: 30}}></td>
                        <td><h3>Mismatch Penalty</h3></td>
                            <td style={{minWidth: 5}}></td>
                        <td><h3 className={classes.sc}>{mismatchSc}</h3></td>
                            <td style={{minWidth: 30}}></td>
                        <td><h3>Gap Penalty</h3></td>
                            <td style={{minWidth: 5}}></td>
                        <td><h3 className={classes.sc}>{gapSc}</h3></td>
                    </tr>
                </tbody>
            </table>
        </Box>

    );
}

GameResult.propTypes = {
    aligns: PropTypes.shape({
        alignA: PropTypes.string,
        alignB: PropTypes.string,
        match: PropTypes.number,
        mismatch: PropTypes.number,
        gap: PropTypes.number,

    }),
};
