import React from 'react';
import GameTextInput from './GameTextInput';
import {Grid} from '@material-ui/core';
import {setGameInputA, setGameInputB} from '../../Redux/Actions/Game';
import GameFileUpload from './GameFileUpload';
import {useSelector} from 'react-redux';
import GenomeTypeInput from '../GeomeType/GenomeTypeInput';

/**
 * Component to display file upload and text input fields for 2 sequences
 * @return {React.ReactElement}
 */
export default function GameInput() {
    return (
        <div>
            <br/>
            <GenomeTypeInput/>
            <Grid container direction="column" spacing={3}>
                <Grid item>
                    <h3>Input Sequence 1</h3>
                    <div testid={'file1'}>
                    <GameFileUpload
                        inputAction={setGameInputA}
                        value={useSelector((state) => state.GameSeqA)} />
                    </div>
                    <h3>or</h3>
                    <h3>Type sequence in the input field</h3>
                    <GameTextInput
                        inputAction={setGameInputA}
                        value={useSelector((state) => state.GameSeqA)} />
                </Grid>
                <Grid item>
                    <h3>Input Sequence 2</h3>
                    <GameFileUpload
                        inputAction={setGameInputB}
                        value={useSelector((state) => state.GameSeqB)} />
                    <h3>or</h3>
                    <h3>Type sequence in the input field</h3>
                    <GameTextInput
                        inputAction={setGameInputB}
                        value={useSelector((state) => state.GameSeqB)} />
                </Grid>
            </Grid>
        </div>
    );
}
