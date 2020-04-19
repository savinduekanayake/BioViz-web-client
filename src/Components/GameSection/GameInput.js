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
                    <span>
                        Input sequence should contain only A C G T - characters
                    </span>
                    <h3>Input Sequence 1</h3>
                    <GameFileUpload inputAction={setGameInputA}
                        value={useSelector((state) => state.GameSeqA)} />
                    <GameTextInput inputAction={setGameInputA}
                        value={useSelector((state) => state.GameSeqA)} />
                </Grid>
                {errMsgA ? <span>Invalid input A</span> : ''}

                <Grid item>
                    <h3>Input Sequence 2</h3>
                    <GameFileUpload inputAction={setGameInputB}
                        value={useSelector((state) => state.GameSeqB)} />
                    <GameTextInput inputAction={setGameInputB}
                        value={useSelector((state) => state.GameSeqB)} />
                </Grid>
                {errMsgB ? <span>Invalid input B</span> : ''}
            </Grid>
        </div>
    );
}

GameInput.propTypes = {
    errMsgA: PropTypes.string,
    errMsgB: PropTypes.string,
};
