import React from 'react';
import GameTextInput from './GameTextInput';
import {Grid} from '@material-ui/core';
import {setGameInputA, setGameInputB} from '../../Redux/Actions/Game';
import GameFileUpload from './GameFileUpload';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';


export default function GameInput(props) {
    const errMsgA = props.errMsgA;
    const errMsgB = props.errMsgB;

    return (
        <div>
            <Grid container direction="column" spacing={3}>
                <Grid item>
                    <h4 style={{color: '#141938'}}>
                        Input sequence should only contain A C G T characters
                        <br/>Use `-` to indicate any gaps in the sequence
                        <br/>Make sure to input both sequences
                    </h4>
                    <h3>Input Sequence 1</h3>
                    <GameFileUpload inputAction={setGameInputA}
                        value={useSelector((state) => state.GameSeqA)} />
                    <GameTextInput inputAction={setGameInputA}
                        value={useSelector((state) => state.GameSeqA)} />
                </Grid>
                {errMsgA ? <h3 style={{color: '#ea0909'}}>
                    Input sequence 1 is invalid</h3> : ''}

                <Grid item>
                    <h3>Input Sequence 2</h3>
                    <GameFileUpload inputAction={setGameInputB}
                        value={useSelector((state) => state.GameSeqB)} />
                    <GameTextInput inputAction={setGameInputB}
                        value={useSelector((state) => state.GameSeqB)} />
                </Grid>
                {errMsgB ? <h3 style={{color: '#ea0909'}}>
                    Input sequence 2 is invalid</h3> : ''}
            </Grid>
        </div>
    );
}

GameInput.propTypes = {
    errMsgA: PropTypes.bool,
    errMsgB: PropTypes.bool,
};
