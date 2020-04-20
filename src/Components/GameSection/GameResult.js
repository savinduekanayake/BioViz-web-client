import React from 'react';
import {Box} from '@material-ui/core';
import PropTypes from 'prop-types';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import MinimizeIcon from '@material-ui/icons/Minimize';


export default function GameResult(props) {
    // const classes = useStyles();
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
            row.push({type: <CheckIcon style={{color: '#4caf50'}} />,
             index: i+1});
        } else {
            score += mismatchPenanlty;
            mismatchSc += mismatchPenanlty;
            row.push({type: <ClearIcon style={{color: '#ce1414'}} />,
             index: i+1});
        }
    }

    const result = row.map(
        (ele) => <td key={ele.index}>{ele.type}<br/>{ele.index}</td>);

    return (
        <Box style={{
            backgroundColor: '#d9dee1',
            height: '400px',
            borderRadius: '10px',
            padding: 10,
        }}>
            <br />
            <h3>Result</h3>
            <table style={{marginLeft: 'auto', marginRight: 'auto'}}>
                <tbody>
                    <tr>
                        <td>Match</td>
                        <td><CheckIcon style={{color: '#4caf50'}} /></td>
                        <td style={{minWidth: 15}}></td>
                        <td>Mismatch</td>
                        <td><ClearIcon style={{color: '#ce1414'}} /></td>
                        <td style={{minWidth: 15}}></td>
                        <td>Gap</td>
                        <td><MinimizeIcon /></td>
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
                    <tr>
                        <td>Score</td><td style={{minWidth: 5}}></td>
                        <td>{score}</td><td style={{minWidth: 20}}></td>
                        <td >Match Score</td><td style={{minWidth: 2}}></td>
                        <td>{matchSc}</td><td style={{minWidth: 20}}></td>
                        <td>Mismatch Penalty</td>
                            <td style={{minWidth: 5}}></td>
                        <td>{mismatchSc}</td><td style={{minWidth: 20}}></td>
                        <td >Gap Penalty</td><td style={{minWidth: 5}}></td>
                        <td>{gapSc}</td>
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
