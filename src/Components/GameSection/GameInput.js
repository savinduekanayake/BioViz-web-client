import React from 'react'
import GameTextInput from './GameTextInput'
import { colors, Grid } from '@material-ui/core'
import { setGameInputA, setGameInputB } from '../../Redux/Actions/Game'
import GameFileUpload from './GameFileUpload'
import {useSelector} from 'react-redux';


export default function GameInput() {

    return (
        <div>
            <Grid container direction="column" spacing={3}>
                <Grid item>
                    <h3>Input Sequence 1</h3>
                    <GameFileUpload inputAction={setGameInputA}
                        value={useSelector((state) => state.GameSeqA)}/>
                    <GameTextInput inputAction={setGameInputA}
                        value={useSelector((state) => state.GameSeqA)}/>
                </Grid>

                <Grid item>
                    <h3>Input Sequence 2</h3>
                    <GameFileUpload inputAction={setGameInputB}
                        value={useSelector((state) => state.GameSeqB)}/>
                    <GameTextInput inputAction={setGameInputB}
                        value={useSelector((state) => state.GameSeqB)}/>
                </Grid>
            </Grid>
        </div>
    )
}
