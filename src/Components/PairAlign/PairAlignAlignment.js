import React from 'react';
import PropTypes from 'prop-types';
import {Avatar} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {FixedSizeList} from 'react-window';


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


export default function PairAlignAlignment(props) {
    const classes = useStyles();
    const algnA = props.alignment.algn_a;
    const algnB = props.alignment.algn_b;
    const totalLen = algnA.length;

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
        <div>
            <FixedSizeList
                height={100}
                itemCount={totalLen}
                itemSize={20}
                layout="horizontal"
                width={300}
            >
                {makeSegment}
            </FixedSizeList>
        </div>
    );
}

PairAlignAlignment.propTypes = {
    alignment: PropTypes.shape({
            algn_a: PropTypes.string,
            algn_b: PropTypes.string,
        }),
    index: PropTypes.number,
};
