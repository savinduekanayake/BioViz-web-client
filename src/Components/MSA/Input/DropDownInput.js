import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: 120,
        margin: theme.spacing(1),
    },
    submitButton: {
        color: 'green',
    },
}));

export default function DropDownInput(props) {
    const classes = useStyles();
    const [errorStatus, seterrorStatus] = useState(false);
    const [seq1, setseq1] = useState(' ');
    const [seq2, setseq2] = useState(' ');
    const errorText = 'Invalid Pair';
    const items = [];
    props.availableSet.forEach((element) => {
        items.push(
            <MenuItem
                key={element}
                value={element}>
                {element}
            </MenuItem>,
        );
    });

    const onChangeSeq1 = (event) => {
        const newSeq1 = event.target.value;
        if ((newSeq1 !== seq2) &&
            (props.availableSet.has(newSeq1))) {
            seterrorStatus(false);
        } else {
            seterrorStatus(true);
        }
        setseq1(newSeq1);
    };
    const onChangeSeq2 = (event) => {
        const newSeq2 = event.target.value;
        if ((newSeq2 !== seq1) &&
            (props.availableSet.has(newSeq2))) {
            seterrorStatus(false);
        } else {
            seterrorStatus(true);
        }
        setseq2(newSeq2);
    };
    const onSubmitPair = () => {
        if ((seq1 !== seq2) &&
            (props.availableSet.has(seq1)) &&
            (props.availableSet.has(seq2))) {
            console.log(seq1, seq2);
            props.onSubmitPair(seq1, seq2);
        } else {
            seterrorStatus(true);
        }
    };
    return (
        <div>

            <Grid container direction='row'>
                <Grid item>
                    <FormControl
                        disabled={props.disabledStatus}
                        error={errorStatus}
                        className={classes.formControl}>
                        <Select value={seq1} onChange={onChangeSeq1}>
                            <MenuItem value={' '}>{' '}</MenuItem>
                            {items}

                        </Select>
                        {errorStatus ?
                            <FormHelperText>{errorText}</FormHelperText> :
                            ''}
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl
                        disabled={props.disabledStatus}
                        error={errorStatus}
                        className={classes.formControl}>
                        <Select value={seq2} onChange={onChangeSeq2}>
                            <MenuItem value={' '}>{' '}</MenuItem>
                            {items}
                        </Select>
                        {errorStatus ?
                            <FormHelperText>{errorText}</FormHelperText> :
                            ''}
                    </FormControl>
                </Grid>
                <Grid item>
                    <Button
                        disabled={props.disabledStatus}
                        variant="outlined"
                        onClick={onSubmitPair}
                        className={classes.submitButton}
                    >Add Pair</Button>

                </Grid>
            </Grid>
        </div>
    );
}

DropDownInput.propTypes = {
    availableSet: PropTypes.instanceOf(Set),
    onSubmitPair: PropTypes.func,
    disabledStatus: PropTypes.bool,
};
