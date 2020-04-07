import React from 'react';
import PropTypes from 'prop-types';
import {Avatar} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {FixedSizeList} from 'react-window';


const algnA = `GATA-CTACTCAGTATTCTACCACCA-ACGAT\
-GACATCTA-T-AG-A--ATACGAATATACGATA`;
const algnB = `GACATCTA-T-AG-A--ATACGAATATACGAT\
AGATA-CTACTCAGTATTCTACCACCA-ACGAT-`;
const totalLen = algnA.length;


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
    emptyRow: {
        '& tr': {
            height: '20px',

        },
    },

}));


export default function PairAlignAlignment() {
    const classes = useStyles();
    // const row1 = [];
    // for (let i = 0; i < algnA.length; i++) {
    //     const char = algnA.charAt(i) === '-' ? 'ga' : algnA.charAt(i);
    //     row1.push(<td><Avatar variant="square"
    //         className={`${classes.avatar} ${classes[char]}`}>
    //         {algnA.charAt(i)}</Avatar></td>);
    // }
    // const row2 = [];
    // for (let j = 0; j < algnB.length; j++) {
    //     const char = algnB.charAt(j) === '-' ? 'ga' : algnB.charAt(j);
    //     row2.push(<td><Avatar variant="square"
    //         className={`${classes.avatar} ${classes[char]}`}>
    //         {algnB.charAt(j)}</Avatar></td>);
    // }

    // const middle = [];
    // for (let k = 0; k < algnA.length; k++) {
    //     const char = (algnA.charAt(k) === algnB.charAt(k) &&
    //         algnA.charAt(k) !== '-') ? '\u007C' : '';

    //     middle.push(<td><b>{char}</b></td>);
    // }
    const makeSegment = ({index, style}) => {
        const classA = algnA.charAt(index) === '-' ? 'ga' : algnA.charAt(index);
        const classB = algnB.charAt(index) === '-' ? 'ga' : algnB.charAt(index);
        const middle = (algnA.charAt(index) === algnB.charAt(index) &&
            algnA.charAt(index) !== '-') ? '\u007C' : '';
        return (
            <div style={style}>
                <table className={classes.emptyRow}>
                    <tr><Avatar variant="square"
                        className={`${classes.avatar} ${classes[classA]}`}>
                        {algnA.charAt(index)}</Avatar></tr>
                    <tr><b>{middle}</b></tr>
                    <tr> <Avatar variant="square"
                        className={`${classes.avatar} ${classes[classB]}`}>
                        {algnB.charAt(index)}</Avatar></tr>
                </table>


            </div>
        );
    };
    makeSegment.propTypes = {
        index: PropTypes.number.isRequired,
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    };


    return (
        // <div>
        //     <table>
        //         <tr>{row1}</tr>
        //         <tr>{middle}</tr>
        //         <tr>{row2}</tr>
        //     </table>

        // </div>

        <div>
            <FixedSizeList
                height={100}
                itemCount={totalLen}
                itemSize={20}
                layout="horizontal"
                width={800}
            >
                {makeSegment}
            </FixedSizeList>
        </div>
    );
}


