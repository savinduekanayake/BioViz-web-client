import React from 'react';
import GameAlign from './GameAlign';
import GameInput from './GameInput';
import GameResult from './GameResult';
import { Button } from '@material-ui/core';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import { setGameInputA, setGameInputB } from '../../Redux/Actions/Game';

export default function GameSection() {
    const dispatch = useDispatch();
    const [input, setInput] = React.useState(undefined);
    const seqA = useSelector((state) => state.GameSeqA);
    const seqB = useSelector((state) => state.GameSeqB);

    const [alignment, setAlignment] = React.useState(undefined);
    

    function callbackAlign(data){
        setAlignment({
            alignA : data.alignA,
            alignB : data.alignB
        })
        console.log(alignment);
    }

    function onSubmit(){
        setInput({
            inputSeqA : seqA,
            inputSeqB : seqB,

        })
        console.log(input);
    }

    // function changeInput(){
    //     setInput({
    //         undefined
    //     })
    //     dispatch(setGameInputA(''));
    //     dispatch(setGameInputB(''));
    // }

    return (
        <div>
            <h2>Alignment Game</h2>
            <GameInput/>
            <br/>
            <Button variant="contained" color="secondary" onClick={onSubmit} >Submit</Button>
            <br/><br/>
            {/* <Button variant="contained" color="secondary" onClick={changeInput} >Change Input</Button> */}
            {input?
            input.inputSeqA.length>0 && input.inputSeqB.length>0 ? <GameAlign input={input} fetchAlign={callbackAlign}/> :'Input both sequences' :''}
            <br/><br/>
            {alignment? <GameResult aligns={alignment}/>:''}
            
        </div>
    );
}
