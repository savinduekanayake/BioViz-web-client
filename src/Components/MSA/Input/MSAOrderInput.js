import React, {useState, useEffect, useCallback} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import DropDownInput from './DropDownInput';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {setMSAOrder} from '../../../Redux/Actions/MSA';
import msaOrderValidate from '../../../Validators/MSA/MSAOrderValidator';
import HelpModal from './HelpModal';
import PairingOrderList from './PairingOrderList';
import {CircularProgress} from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';


const useStyles = makeStyles((theme) => ({
    availableIconsGrid: {
        margin: 5,
    },
    submitButton: {
        color: 'green',
    },
    avatar: {
        color: 'white',
        backgroundColor: 'red',
        width: 25,
        height: 25,
        fontSize: 15,
    },
}));

export default function MSAOrderInput(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const pairingOrder = useSelector((state) => state.msaOrder);
    const setpairingOrder = useCallback((p) => {
        dispatch(setMSAOrder(p));
    }, [dispatch]);

    useEffect(() => {
        const currentSequences = Array(
            props.sequences.length).fill().map((_, i) => i + 1,
            );
        setavailableSet(new Set(currentSequences));

        setpairingOrder(new Array(0));
        setnextProfileIndex(props.sequences.length + 1);
    }, [props.sequences, setpairingOrder]);


    const currentSequences = Array(
        props.sequences.length).fill().map((_, i) => i + 1,
        );

    const [availableSet, setavailableSet] = useState(new Set(currentSequences));


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

    // const onCheckPairs = () => {
    //     if (msaOrderValidate(pairingOrder, currentSequences.length)) {
    //         dispatch(setMSAOrder(pairingOrder));
    //     } else {
    //         console.log('error in pairing');
    //     }
    // };

    const onReset = () => {
        setavailableSet(new Set(currentSequences));
        setpairingOrder(new Array(0));
        setnextProfileIndex(props.sequences.length + 1);
        dispatch(setMSAOrder([]));
    };

    function makeAvatar(character) {
        return (
            <Avatar className={classes.avatar}>{character}</Avatar>
        );
    }

    const available = [];
    availableSet.forEach((element) => {
        available.push(
            <Grid item key={element}>
                {makeAvatar(element)}
            </Grid>,
        );
    });

    let pairingValidityStatus;
    if (msaOrderValidate(pairingOrder, currentSequences.length)) {
        pairingValidityStatus =
            <>
                <p>Valid </p>
                <CheckCircleOutlineIcon style={{color: 'green'}} size={20} />
            </>;
    } else {
        pairingValidityStatus =
            <>
                <p>Waiting for complete list</p>
                <CircularProgress size={20} />
            </>;
    }

    return (
        <div>
            <Divider />
            <br />
            Sequences will be compared progressively
            with Global Alignment algorithm
            <br/>
            according to the user defined phylogenetic tree.
            <br />
            <HelpModal />
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
                {pairingOrder.length < currentSequences.length - 1 ?
                    available : <Grid item>-None-</Grid>}
            </Grid>
            <br />
            <Grid container
                direction='row'
                spacing={7}
                align="center"
                justify="center"
                alignItems="center"

            >
                <Grid item xs={4}>
                    Your Pair Aligns Will Appear Here
                    {/* {pairingOrderComponent} */}
                    <PairingOrderList pairingOrder={pairingOrder} />
                    <br />
                    {pairingOrder.length > 0 ?
                        <Button
                            variant='outlined'
                            size='small'
                            onClick={onReset}>
                            Reset Pairings
                        </Button> :
                        ''}
                </Grid>
                <Grid item xs={4}>
                    <DropDownInput
                        availableSet={availableSet}
                        onSubmitPair={onSubmitPair}
                        disabledStatus={
                            pairingOrder.length === currentSequences.length - 1
                        } />
                </Grid>
            </Grid>
            <div>
                <h4>Pairing Validity Status</h4>
                {pairingValidityStatus}
            </div>


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
