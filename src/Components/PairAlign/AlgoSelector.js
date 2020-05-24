import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {useDispatch, useSelector} from 'react-redux';
import {setPAlgo} from '../../Redux/Actions/PairAlign';


export default function AlgoSelector() {
    const dispatch = useDispatch();

    const handleChange = (event)=>{
        dispatch(setPAlgo(event.target.value));
    };

    const value = useSelector((state) => state.pAlgo);
    return (
        <div>
            <FormControl component="fieldset">
            <FormLabel component="legend">Select Algorithm</FormLabel>
            <RadioGroup aria-label="algorithm"
                value={value} name='algorithm' onChange={handleChange}>
                <FormControlLabel
                    value='GLOBAL'
                    control={<Radio />}
                    label="Needleman Wunsch" />
                <FormControlLabel
                    value='LOCAL'
                    control={<Radio />}
                    label="Smith Waterman" />

            </RadioGroup>
            </FormControl>

        </div>
    );
}
