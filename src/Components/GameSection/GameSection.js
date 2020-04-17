import React from 'react';
import GameAlign from './GameAlign';
import GameInput from './GameInput';
import GameResult from './GameResult';
import { Button } from '@material-ui/core';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';

export default function GameSection() {
    const dispatch = useDispatch();
    const [input, setInput] = React.useState(undefined);
    const [alignment, setAlignment] = React.useState(undefined);
    const seqA = useSelector((state) => state.GameSeqA);
    const seqB = useSelector((state) => state.GameSeqB);
    const matchScore = useSelector((state) => state.matchScore);
    const mismatchPenanlty = useSelector((state) => state.mismatchPenalty);
    const gapPenalty = useSelector((state) => state.gapPenalty);

    function callbackAlign(data){
        setAlignment({
            alignA : data.alignA,
            alignB : data.alignB,
            match : matchScore,
            mismatch : mismatchPenanlty,
            gap : gapPenalty
        })
    }

    function onSubmit(){
        setInput({
            algnA : seqA,
            algnB : seqB,
        })
    }

    return (
        <div>
            <h2>Alignment Game</h2>
            <GameInput/>
            <br/>
            <Button variant="contained" color="secondary" onClick={onSubmit} >Submit</Button>
            <br/><br/>
            {input?
            input.algnA.length>0 && input.algnB.length>0 ? <GameAlign input={input} fetchAlign={callbackAlign}/> :'Input both sequences' :''}
            <br/><br/>
            {alignment? <GameResult aligns={alignment}/>:''}
            
        </div>
    );
}
