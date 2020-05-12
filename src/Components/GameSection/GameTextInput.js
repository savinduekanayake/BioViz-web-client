import React from 'react';
import TextField from '@material-ui/core/TextField';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

export default function GameTextInput(props) {
    const dispatch = useDispatch();
    const inputA = useSelector((state) => state.GameSeqA);
    let T = 0;

    function inputSeq(event) {
        T = 1;
        console.log('correct');
        dispatch(props.inputAction(event.target.value.trim()));
    }

    return (
        <div testid={'testA'} testvalue={inputA}>
            {T===0?<div testid={'finddiv'} />:''}
            <TextField
                testid={'inputfield'}
                multiline
                rowsMax={4}
                placeholder={'DNA Sequence'}
                style={{width: '100%'}}
                value={props.value}
                onChange={inputSeq} >
            </TextField>
        </div>
    );
}

GameTextInput.propTypes = {
    inputAction: PropTypes.func,
    value: PropTypes.string,
};
