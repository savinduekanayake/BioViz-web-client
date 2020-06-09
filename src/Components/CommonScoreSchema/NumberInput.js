import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import {useSelector, useDispatch} from 'react-redux';

/**
 * Component to input an integer value.
 * @param {Object} props
 * @return {React.ReactElement}
 */
export default function NumberInput(props) {
    const dispatch = useDispatch();
    // current value from redux store
    const ms = useSelector((state) => state[props.inputSelector]);

    const [errorStatus, setErrorStatus] = React.useState(false);

    const onInputChange = (event) => {
        const val = Math.floor(Number(event.target.value));
        if (val) {
            // accepting positive numbers
            if (props.acceptedType === '1') {
                if (val > 0) {
                    dispatch(props.inputHandler(val));
                    setErrorStatus(false);
                } else {
                    dispatch(props.inputHandler(event.target.value));
                    setErrorStatus(true);
                }
            } else if (props.acceptedType === '-1') {
                // accepting negative numbers
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

    /**
     * '1' for positive integer acceptance
     * '-1' for negative integer acceptance
     */
    acceptedType: PropTypes.string,
    label: PropTypes.string,
    helperText: PropTypes.string,
};
