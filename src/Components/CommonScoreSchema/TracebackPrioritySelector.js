import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import {setTracebackPriority} from '../../Redux/Actions/Score';

/**
 * Component to select between LOWROAD and HIGHROAD traceback priorities
 * Contains 2 radio buttons.
 * @param {Object} props
 * @return {React.ReactElement}
 */
const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 200,
    },
}));

export default function TracebackPrioritySelector() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleChange = (event) => {
        dispatch(setTracebackPriority(event.target.value));
    };

    const value = useSelector((state) => state.tracebackPriority);
    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="priority-select-input-label">
                    Select Traceback Priority
                </InputLabel>
                <Select
                    labelId="priority-select-input-label"
                    id="priority-select-input"
                    value={value}
                    onChange={handleChange}
                    label='Select Traceback Priority'
                >
                    <MenuItem value={'LOWROAD'}>Low road</MenuItem>
                    <MenuItem value={'HIGHROAD'}>High road</MenuItem>
                </Select>
            </FormControl>

        </div>
    );
}
