import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import validateSequence from '../../Validators/sequence';

/**
 * Component to handle text input
 * @param {Object} props - props
 * @return {React.ReactElement}
 */
export default function GameTextInput(props) {
    const dispatch = useDispatch();
    // const pattern = /^[AGCTacgt]+$/;
    const genomeType = useSelector((state)=>state.genomeType);
    const [inputErr, setInputErr] = useState(false);

    useEffect(() => {
        setInputErr(!validateSequence(props.value, genomeType));
    }, [genomeType, props.value]);

    /**
     * store text input in state and handle error status
     * @param {Object} event
     */
    function inputSeq(event) {
        dispatch(props.inputAction(event.target.value.trim().toUpperCase()));
        setInputErr(!validateSequence(event.target.value.trim(), genomeType));
        // if (!event.target.value.match(pattern)) {
        //     setInputErr(true);
        // } else {
        //     setInputErr(false);
        // }
    }

    return (
        <div>
            <TextField
                testid={'inputfield'}
                multiline
                rowsMax={4}
                placeholder={'DNA Sequence'}
                style={{width: '100%'}}
                value={props.value}
                onChange={inputSeq}
                inputProps={{spellCheck: 'false'}}
                error = {inputErr}
                helperText={inputErr ?
                    'Invalid DNA sequence' : null}
                >
            </TextField>
        </div>
    );
}

GameTextInput.propTypes = {
    inputAction: PropTypes.func,
    value: PropTypes.string,
};
