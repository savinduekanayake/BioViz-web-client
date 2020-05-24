import React from 'react';
import PropTypes from 'prop-types';

import {makeStyles} from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import {useDispatch} from 'react-redux';

const useStyles = makeStyles((theme) => ({
    input: {
        width: 300,
    },
}));

export default function NameInput(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const sequenceName = props.sequenceName;

    const onInputChange = (event) => {
        if (props.type === 'MSA') {
            dispatch(props.nameInputHandler(event.target.value.trim(),
                props.MSAkey));
        } else {
            dispatch(props.nameInputHandler(event.target.value.trim()));
        }
    };


    return (
        <div>
            <TextField
                className={classes.input}
                label="Give a unique name for the sequence"
                value={sequenceName}
                onChange={onInputChange}
            />

        </div>
    );
}

NameInput.propTypes = {
    sequenceName: PropTypes.string,
    nameInputHandler: PropTypes.func,
    MSAkey: PropTypes.number,
    type: PropTypes.string,
};

