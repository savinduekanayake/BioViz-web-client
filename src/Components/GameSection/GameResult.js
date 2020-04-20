import React from 'react';
import {Box} from '@material-ui/core';
import PropTypes from 'prop-types';
// import CheckIcon from '@material-ui/icons/Check';
// import ClearIcon from '@material-ui/icons/Clear';
import MinimizeIcon from '@material-ui/icons/Minimize';
// import DragHandleIcon from '@material-ui/icons/DragHandle';
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
        color: '#1a2155de',
    },
    score: {
        color: '#153463de',
    },
    sc: {
        color: '#484954',
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
            row.push({type: <CloseRoundedIcon style={{color: '#312f2f'}} />,
             index: i+1});
        }
    }

    const result = row.map(
        (ele) => <td key={ele.index}>{ele.type}
            <h5 style={{color: '#40455e'}}>{ele.index}</h5></td>);

    return (
        <Box style={{
            backgroundColor: '#d9dee1',
            borderRadius: '10px',
            padding: 10,
            paddingBottom: 40,
        }}>
            <br />
            <h2>Result</h2>
            <table style={{marginLeft: 'auto', marginRight: 'auto'}}>
                <tbody>
                    <tr className={classes.label}>
                        <td><h4>Match</h4></td>
                        <td><DoneOutlineRoundedIcon
                            style={{color: '#787d94'}} /></td>
                        <td style={{minWidth: 15}}></td>
                        <td><h4>Mismatch</h4></td>
                        <td><CloseRoundedIcon style={{color: '#312f2f'}} /></td>
                        <td style={{minWidth: 15}}></td>
                        <td><h4>Gap</h4></td>
                        <td><MinimizeIcon style={{color: '#000000de'}} /></td>
                    </tr>
                </tbody>
            </table>
            <br />
            <h3>Alignment Status</h3>
            <table style={{marginLeft: 'auto', marginRight: 'auto'}}>
                <tbody>
                    <tr>
                        {result}
                    </tr>
                </tbody>
            </table>
            <br />
            <h3>Total Score</h3>
            <table style={{marginLeft: 'auto', marginRight: 'auto'}}>
                <tbody>
                    <tr className={classes.score}>
                        <td><h3>Score</h3></td>
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
