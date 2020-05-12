import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import DropDownInput from './DropDownInput';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {setMSAOrder} from '../../../Redux/Actions/MSA';
import msaOrderValidate from '../../../Validators/MSA/MSAOrderValidator';
import HelpModal from './HelpModal';
import PairingOrderList from './PairingOrderList';


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

    const onCheckPairs = () => {
        if (msaOrderValidate(pairingOrder, currentSequences.length)) {
            dispatch(setMSAOrder(pairingOrder));
        } else {
            console.log('error in pairing');
        }
    };

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


    return (
        <div>
            <Divider />
            <br />
            Input your desired order to align the sequences,
            one pair of sequences/profiles per one line.
            <br />
            <HelpModal/>
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
                    <PairingOrderList pairingOrder={pairingOrder}/>
                    <br />
                    {pairingOrder.length > 0 ?
                        <Button
                            variant='outlined'
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
                <Button onClick={onCheckPairs}>
                    Check Pairing Validity
                </Button>
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
