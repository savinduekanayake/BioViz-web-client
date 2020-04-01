import React from 'react';
import {Avatar} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';


const algnA = 'GATA-CTACTCAGTATTCTACCACCA-ACGAT-';
const algnB = 'GACATCTA-T-AG-A--ATACGAATATACGATA';


const useStyles = makeStyles((theme) => ({
    avatar: {
        height: '20px',
        width: '20px',
        fontSize: '12px',

    },
    A: {
        color: 'white',
        backgroundColor: 'red',
    },
    C: {
        color: 'white',
        backgroundColor: 'blue',
    },
    G: {
        color: 'white',
        backgroundColor: 'purple',
    },
    T: {
        color: 'white',
        backgroundColor: 'green',
    },
    ga: {
        color: 'black',
        backgroundColor: 'black',
    },

}));

export default function PairAlignAlignment() {
    const classes = useStyles();

    const row1 = [];
    for (let i = 0; i < algnA.length; i++) {
        const char = algnA.charAt(i) === '-' ? 'ga' : algnA.charAt(i);
        row1.push(<td><Avatar variant="square"
            className={`${classes.avatar} ${classes[char]}`}>
            {algnA.charAt(i)}</Avatar></td>);
    }
    const row2 = [];
    for (let j = 0; j < algnB.length; j++) {
        const char = algnB.charAt(j) === '-' ? 'ga' : algnB.charAt(j);
        row2.push(<td><Avatar variant="square"
            className={`${classes.avatar} ${classes[char]}`}>
            {algnB.charAt(j)}</Avatar></td>);
    }

    const middle = [];
    for (let k = 0; k < algnA.length; k++) {
        const char = (algnA.charAt(k) === algnB.charAt(k) &&
            algnA.charAt(k) !== '-') ? '\u007C' : '';

        middle.push(<td><b>{char}</b></td>);
    }

    return (
        <div>
            <table>
                <tr>{row1}</tr>
                <tr>{middle}</tr>
                <tr>{row2}</tr>
            </table>

        </div>
    );
}
