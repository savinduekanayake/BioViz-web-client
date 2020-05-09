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
        height: '25px',
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

        const upper = <Avatar variant="square"
            className={`${classes.avatar} ${classes[classA]}`}>
            {algnA.charAt(index)}</Avatar>;


        const lower = <Avatar variant="square"
            className={`${classes.avatar} ${classes[classB]}`}>
            {algnB.charAt(index)}</Avatar>;

        const middle = (algnA.charAt(index) === algnB.charAt(index) &&
            algnA.charAt(index) !== '-') ? '\u007C' : '';

        return (
            <div style={style}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                {upper}
                            </td>
                        </tr>
                        <tr className={classes.emptyRow}>
                            <td><b>{middle}</b></td>
                        </tr>
                        <tr>
                            <td>
                                {lower}
                            </td>
                        </tr>
                    </tbody>
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
                width={Math.min(500, 20 * totalLen)}
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
};
