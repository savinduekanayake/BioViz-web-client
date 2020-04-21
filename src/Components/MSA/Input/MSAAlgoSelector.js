import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {useDispatch, useSelector} from 'react-redux';
import {setMSAAlgo} from '../../../Redux/Actions/MSA';
import MSAOrderInput from './MSAOrderInput';
import Box from '@material-ui/core/Box';


export default function MSAAlgoSelector() {
    const dispatch = useDispatch();

    const handleChange = (event) => {
        dispatch(setMSAAlgo(event.target.value));
    };

    const value = useSelector((state) => state.msaAlgo);
    const msaSequences = useSelector((state) => state.MSASeq);

    let msaOrderInput = '';
    if (value === '2') {
        msaOrderInput = <MSAOrderInput sequences={msaSequences} />;
    }
    return (
        <div>
            <Box boxShadow={3} marginTop={7} padding={5}>
                <div>
                    <FormControl component="fieldset">
                        <FormLabel
                            component="label">
                            Select Algorithm
                        </FormLabel>
                        <RadioGroup
                            aria-label="algorithm"
                            value={value}
                            name='algorithm'
                            onChange={handleChange}>
                            <FormControlLabel
                                value='1'
                                control={<Radio />}
                                label="Progressive Algorithm" />
                            <FormControlLabel
                                value='2'
                                control={<Radio />}
                                label="User Defined" />

                        </RadioGroup>
                    </FormControl>
                </div>
                <div>
                    {msaOrderInput}
                </div>
            </Box>

        </div>
    );
}
