import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import {useSelector, useDispatch} from 'react-redux';


export default function NumberInput(props) {
    const dispatch = useDispatch();
    const ms = useSelector((state) => state[props.inputSelector]);

    const [errorStatus, setErrorStatus] = React.useState(false);

    const onInputChange = (event) => {
        const val = Math.floor(Number(event.target.value));
        if (val) {
            if (props.acceptedType === '1') {
                if (val > 0) {
                    dispatch(props.inputHandler(val));
                    setErrorStatus(false);
                } else {
                    dispatch(props.inputHandler(event.target.value));
                    setErrorStatus(true);
                }
            } else if (props.acceptedType === '-1') {
                if (val < 0) {
                    dispatch(props.inputHandler(val));
                    setErrorStatus(false);
                } else {
                    dispatch(props.inputHandler(event.target.value));
                    setErrorStatus(true);
                }
            }
        } else {
            dispatch(props.inputHandler(event.target.value));
            setErrorStatus(true);
        }
    };

    return (

        <div>
            <TextField
                error={errorStatus}
                label={props.label}
                value={ms}
                helperText={errorStatus ? props.helperText : ''}
                variant="outlined"
                type="number"
                onChange={onInputChange}
            />
        </div>
    );
}

NumberInput.propTypes = {
    inputSelector: PropTypes.string,
    inputHandler: PropTypes.func,
    acceptedType: PropTypes.string,
    label: PropTypes.string,
    helperText: PropTypes.string,
};
