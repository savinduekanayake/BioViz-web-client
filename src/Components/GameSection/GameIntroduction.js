import React from 'react';
import {Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    box: {
        borderRadius: '10px',
        padding: 5,
    },

    line: {
        color: '#1e2e51',
        fontWeight: 'bolder',
    },
}));

/**
 * Component to view introduction
 * @return {React.ReactElement}
 */
export default function GameIntroduction() {
    const classes = useStyles();

    return (
        <Box boxShadow={6} className={classes.box}>
            <h3>Introduction</h3>
            <div className={classes.line}>
            <p>In this game you have to align two sequences
                 to get the same characters to the same
                  position-which indicate matches
                   in the alignment of two sequences.</p>
            <p>Identity of the alignment is calculated as:
                 no of matches/length of alignment. Try to acheive maximum
                  identity by aligning more matches with lesser gaps.</p>
            <p>Input sequence should only contain &apos;A&apos; &apos;C&apos;
                &apos;G&apos; &apos;T&apos; characters.
            </p>
            </div>
        </Box>
    );
}
