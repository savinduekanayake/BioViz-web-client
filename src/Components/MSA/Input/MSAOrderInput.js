import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import DropDownInput from './DropDownInput';
import PropTypes from 'prop-types';


const useStyles = makeStyles((theme) => ({
    availableIconsGrid: {
        margin: 5,
    },
    submitButton: {
        color: 'green',
    },
}));

export default function MSAOrderInput(props) {
    const classes = useStyles();
    useEffect(() => {
        const currentSequences = Array(
            props.sequences.length).fill().map((_, i) => i + 1,
            );
        setavailableSet(new Set(currentSequences));
        setpairingOrder(new Array(0));
        setnextProfileIndex(props.sequences.length + 1);
    }, [props.sequences]);


    const currentSequences = Array(
        props.sequences.length).fill().map((_, i) => i + 1,
        );

    const [availableSet, setavailableSet] = useState(new Set(currentSequences));
    const [pairingOrder, setpairingOrder] = useState(new Array(0));
    const [nextProfileIndex,
        setnextProfileIndex] = useState(props.sequences.length + 1);

    const onSubmitPair = (seq1, seq2) => {
        const newOrder = pairingOrder;
        newOrder.push([seq1, seq2, nextProfileIndex]);
        setpairingOrder(newOrder);
        const newSet = availableSet;
        newSet.delete(seq1);
        newSet.delete(seq2);
        newSet.add(nextProfileIndex);
        setavailableSet(newSet);
        setnextProfileIndex(nextProfileIndex + 1);
    };

    const onReset = () => {
        setavailableSet(new Set(currentSequences));
        setpairingOrder(new Array(0));
        setnextProfileIndex(props.sequences.length + 1);
    };


    const pairingOrderComponent = pairingOrder.map((element) => {
        return (
            <div key={element[2]}>
                {element[0]} + {element[1]} {'->'} {element[2]}
            </div>
        );
    });
    const available = [];
    availableSet.forEach((element) => {
        available.push(
            <Grid item key={element}>
                <Avatar>{element}</Avatar>
            </Grid>,
        );
    });


    return (
        <div>
            <Divider />
            <br />
            Input your desired order to align the sequences,
            one pair of sequences/profiles per one line.
            <br />
            <br />
            <br />
            Currently available for pairing
            <Grid
                container
                direction='row'
                spacing={2}
                align="center"
                justify="center"
                alignItems="center"
                className={classes.availableIconsGrid}>
                {available}
            </Grid>
            <br />
            <Grid container
                direction='row'
                spacing={7}
                align="center"
                justify="center"
                alignItems="center"

            >
                <Grid item>
                    Your Pair Aligns
                    {pairingOrderComponent}
                    <br />
                    <Button
                        variant='outlined'
                        onClick={onReset}>
                        Reset Alignments
                    </Button>
                </Grid>
                <Grid item>
                    <DropDownInput
                        availableSet={availableSet}
                        onSubmitPair={onSubmitPair} />
                </Grid>
            </Grid>


        </div>
    );
}

MSAOrderInput.propTypes = {
    sequences: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.number,
            seq: PropTypes.string,
        }),
    ),
};
