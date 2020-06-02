import React from 'react';
import {Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    box: {
        // backgroundColor: '#b7c0d138',
        borderRadius: '10px',
        padding: 10,
        paddingBottom: 20,
        paddingTop: 20,
    },

    line: {
        color: '#1e2e51',
        fontWeight: 'bolder',
    },
}));

export default function GameIntroduction() {
    const classes = useStyles();

    return (
        <Box boxShadow={6} className={classes.box}>
            <h3>Introduction</h3>
            <div className={classes.line}>
            <p>In this game you have to align 2 sequences
                 to get same characters to the same
                  position-which indicate a match</p>
            <p>Try to get the best identity</p>
            <p>Input sequence should only contain A C G T characters.
                 Use `-` to indicate any gaps in the sequence
            </p>
            </div>
        </Box>
    );
}
