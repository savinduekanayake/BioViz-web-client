import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {useDispatch, useSelector} from 'react-redux';
import {setScoringMethod} from '../../Redux/Actions/Score';

/**
 * Component to select between basic and extended scoring methods.
 * Contains 2 radio buttons.
 * @param {Object} props
 * @return {React.ReactElement}
 */
export default function ScoringMethodSelector() {
    const dispatch = useDispatch();

    const handleChange = (event)=>{
        dispatch(setScoringMethod(event.target.value));
    };

    const value = useSelector((state) => state.scoringMethod);
    return (
        <div>
            <FormControl component="fieldset">
            <FormLabel component="legend">Select Scoring Method</FormLabel>
            <RadioGroup aria-label="scoring-method"
                value={value} name='scoring-method' onChange={handleChange}>
                <FormControlLabel
                    value='BASIC' control={<Radio />} label="Basic" />
                <FormControlLabel
                    value='EXTENDED' control={<Radio />} label="Extended" />

            </RadioGroup>
            </FormControl>

        </div>
    );
}
