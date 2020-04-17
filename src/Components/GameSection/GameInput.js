import React from 'react'
import GameTextInput from './GameTextInput'
import CommonScore from '../CommonScoreSchema/ScoreSchema'
import Button from '@material-ui/core/Button'
import { colors } from '@material-ui/core'

export default function GameInput() {

    function submit(){
    }


    return (
        <div>
            <GameTextInput/>
            <br/>
            <br/>
            <CommonScore/>
            <br/>
            <Button variant="contained" color="secondary" type='submit'>Submit</Button>
        </div>
    )
}
