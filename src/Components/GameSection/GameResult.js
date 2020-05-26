import React from 'react';
import {Box} from '@material-ui/core';
import PropTypes from 'prop-types';
import MinimizeIcon from '@material-ui/icons/Minimize';
import DoneOutlineRoundedIcon from '@material-ui/icons/DoneOutlineRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
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
    scLabel: {
        color: '#c7ba78de',
        paddingRight: 5,
        fontWeight: 'bolder',
        fontSize: 17,
    },
    sc: {
        color: '#d3d6f0',
        paddingRight: 30,
        fontWeight: 'bolder',
        fontSize: 16,
    },
    box: {
        backgroundColor: '#141938',
        color: '#e9e3e3de',
        borderRadius: '10px',
        padding: 30,
        paddingTop: 10,
        paddingBottom: 40,
    },
    table: {
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    tablerow: {
        maxWidth: 1300,
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
    const identity = props.aligns.identity;
    const row = [];
    let score = 0;
    let matchSc = 0;
    let mismatchSc = 0;
    let gapSc = 0;


    for (let i = 0; i < alignA.length; i++) {
        if ((alignA.charAt(i) === '-' || alignB.charAt(i) === '-') ||
            (alignA.charAt(i) === 'e' || alignB.charAt(i) === 'e')) {
                // if gap in the middle or end
            score += gapPenalty;
            gapSc += gapPenalty;
            row.push({type: <MinimizeIcon />, index: i+1});
        } else if (alignA.charAt(i) === alignB.charAt(i)) {
                // if 2 elements are matching
            score += matchScore;
            matchSc += matchScore;
            row.push({type: <DoneOutlineRoundedIcon
                 className={classes[alignA.charAt(i)]} />, index: i+1});
        } else {
                // if 2 elements mismatch
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
                    <tr>
                        <td className={classes.label}><h4>Match</h4></td>
                        <td><DoneOutlineRoundedIcon
                            style={{color: '#787d94', marginRight: 15}} /></td>
                        <td className={classes.label}><h4>Mismatch</h4></td>
                        <td><CloseRoundedIcon
                            style={{color: '#9b8989', marginRight: 15}} /></td>
                        <td className={classes.label}><h4>Gap</h4></td>
                        <td><MinimizeIcon
                            style={{color: '#e9e3e3de'}} /></td>
                    </tr>
                </tbody>
            </table>
            <label className={classes.scLabel}>Identity
                <label
                    className={classes.sc}
                    style={{paddingLeft: 10, paddingRight: 0}}>
                    {identity.toFixed(3)}
                </label>
            </label>
            <h3>Alignment Score</h3>
            <table className={classes.table}>
                <tbody>
                    <tr>
                        <td className={classes.scLabel}>Total Score</td>
                        <td className={classes.sc}
                            testid={'score'} value={score}>
                            {score}</td>
                        <td className={classes.scLabel}>Match Score</td>
                        <td className={classes.sc}
                            testid={'matchSc'} value={matchSc}>
                            {matchSc}</td>
                        <td className={classes.scLabel}>Mismatch Penalty</td>
                        <td className={classes.sc}
                            testid={'mismatchSc'} value={mismatchSc}>
                            {mismatchSc}</td>
                        <td className={classes.scLabel}>Gap Penalty</td>
                        <td className={classes.sc}
                            testid={'gapSc'} value={gapSc}>
                            {gapSc}</td>
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
        identity: PropTypes.number,

    }),
};
