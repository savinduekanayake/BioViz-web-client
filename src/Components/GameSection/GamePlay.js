import React from 'react';
import CommonScore from '../CommonScoreSchema/ScoreSchema';
import GameInstruction from './GameInstruction';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    title: {
        color: '#1e2e51',
        fontSize: 24,
    },
}));

export default function GamePlay() {
    const classes = useStyles();
    return (
        <div>
        <h2 className={classes.title}>GamePlay</h2>
        <GameInstruction />
        <br />
        <h3 style={{color: '#1e2e51'}}>
            Change input values for Match score, Mismatch penalty and
             Gap penalty on your preference</h3>
        <div style={{textAlign: 'center'}}>
            <div style={{display: 'inline-block'}}>
            <CommonScore />
            </div>
        </div>
        </div>
    );
}

