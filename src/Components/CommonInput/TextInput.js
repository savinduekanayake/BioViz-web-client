import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import {useDispatch, useSelector} from 'react-redux';
import validateSequence from '../../Validators/sequence';


export default function TextInput(props) {
    const dispatch = useDispatch();
    const genomeType = useSelector((state) => state.genomeType);
    const [errorStatus, seterrorStatus] = useState(false);

    useEffect(() => {
        seterrorStatus(!validateSequence(props.value, genomeType));
    }, [genomeType, props.value]);

    const DNAseq = props.value;

    const onInputChange = (event) => {
        seterrorStatus(
            !validateSequence(event.target.value.trim(), genomeType));
        if (props.type === 'MSA') {
            dispatch(props.inputHandler(
                event.target.value.trim().toUpperCase(),
                props.MSAkey));
        } else {
            dispatch(props.inputHandler(
                event.target.value.trim().trim().toUpperCase()));
        }
    };
    return (

        <div>
            <TextField
            fullWidth
                multiline
                rowsMax={4}
                placeholder='Type your genome sequence'
                label='Type your genome sequence'
                value={DNAseq}
                onChange={onInputChange}
                error = {errorStatus}
                helperText={errorStatus ?
                    `Invalid ${genomeType} sequence` : null}
                inputProps={{spellCheck: 'false'}}>

            </TextField>
        </div>
    );
}

TextInput.propTypes = {
    type: PropTypes.string,
    inputHandler: PropTypes.func,
    MSAkey: PropTypes.number,
    value: PropTypes.string,
};
