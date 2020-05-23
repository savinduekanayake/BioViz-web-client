import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {useDispatch, useSelector} from 'react-redux';
import {setGenomeType} from '../../Redux/Actions/Mode';


export default function GenomeTypeInput() {
    const dispatch = useDispatch();

    const handleChange = (event)=>{
        dispatch(setGenomeType(event.target.value));
    };

    const value = useSelector((state) => state.genomeType);
    return (
        <div>
            <FormControl component="fieldset">
            <FormLabel component="legend">Select Genome Type</FormLabel>
            <RadioGroup aria-label="genome-type"
                value={value} name='genome-type' onChange={handleChange}>
                <FormControlLabel
                    value='DNA' control={<Radio />} label="DNA" />
                <FormControlLabel
                    value='PROTEIN' control={<Radio />} label="Protein" />

            </RadioGroup>
            </FormControl>

        </div>
    );
}
