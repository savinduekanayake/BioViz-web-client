import React from 'react';
import GameAlign from './GameAlign';
import GameInput from './GameInput';
import GameResult from './GameResult';
import { Button } from '@material-ui/core';
import {useSelector} from 'react-redux';

export default function GameSection() {
    const [input, setInput] = React.useState(undefined);
    const [alignment, setAlignment] = React.useState(undefined);
    const [inputErrorA , setMsgA] = React.useState(false);
    const [inputErrorB , setMsgB] = React.useState(false);
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
        // input validation
        const array = ['A','C','G','T','-'];
        let A = 0;
        let B = 0;
        for (let i = 0; i < seqA.length; i++) {
            if(!array.includes(seqA.charAt(i))){
                setMsgA(true);
                A = 1;
                break
            }
        }
        if(A===0 && inputErrorA){
            setMsgA(false)
        }
        for (let j = 0; j < seqB.length; j++) {
            if(!array.includes(seqB.charAt(j))){
                setMsgB(true);
                B = 1;
                break
            }   
        }
        if(B===0 && inputErrorB){
            setMsgB(false)
        }
        // adjust input sequences for same length
        if(seqB.length>0 && seqA.length>seqB.length){
            const remain = 'e'.repeat(seqA.length-seqB.length)
            setInput({
                algnA : seqA,
                algnB : seqB + remain,
            })
        }else if(seqA.length>0 && seqB.length>seqA.length){
            const remain = 'e'.repeat(seqB.length-seqA.length)
            setInput({
                algnA : seqA + remain,
                algnB : seqB,
            })
        }else{
            setInput({
                algnA : seqA,
                algnB : seqB,
            })
        }    
    }
       

    return (
        <div>
            <h2>Alignment Game</h2>
            <GameInput errMsgA={inputErrorA} errMsgB={inputErrorB}/>
            <br/>
            <Button variant="contained" color="secondary" onClick={onSubmit} >Submit</Button>
            <br/><br/>
            
            {input? 
            (inputErrorA||inputErrorB)?'INVALID INPUT.READ INSTRUCTIONS CAREFULLY TO INPUT THE SEQUENCES':
            (input.algnA==='' || input.algnB==='') ?'Input both sequences':<GameAlign input={input} fetchAlign={callbackAlign}/>:''}

            {/* {input?
            input.algnA.length>0 && input.algnB.length>0 ?
            (inputErrorA||inputErrorB)?'INVALID INPUT.READ INSTRUCTIONS CAREFULLY TO INPUT THE SEQUENCES':<GameAlign input={input} fetchAlign={callbackAlign}/> :'Input both sequences' :''} */}
            <br/><br/>
            {alignment? <GameResult aligns={alignment}/>:''}
            
        </div>
    );
}
