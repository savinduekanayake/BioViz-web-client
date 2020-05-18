import React from 'react';
import TextField from '@material-ui/core/TextField';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

export default function GameTextInput(props) {
    const dispatch = useDispatch();
    // const [functest, setfuncval] = React.useState(false);

    function inputSeq(event) {
        // console.log('correct');
        // setfuncval(true);
        // console.log(functest);
        dispatch(props.inputAction(event.target.value.trim()));
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
                onChange={inputSeq} >
            </TextField>
            {/* {functest? <div testid={'testfunc'}></div>:''} */}
        </div>
    );
}

GameTextInput.propTypes = {
    inputAction: PropTypes.func,
    value: PropTypes.string,
};
