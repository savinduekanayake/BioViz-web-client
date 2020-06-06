import React from 'react';
import GameAlign from './GameAlign';
import GameInput from './GameInput';
import GameResult from './GameResult';
import {Button} from '@material-ui/core';
import {useSelector} from 'react-redux';
import GameIntroduction from './GameIntroduction';

export default function GameSection() {
    const [input, setInput] = React.useState(undefined);
    const [alignment, setAlignment] = React.useState(undefined);
    const [scoreErr, setErrMsg] = React.useState(false);
    const inputA = useSelector((state) => state.GameSeqA);
    const inputB = useSelector((state) => state.GameSeqB);
    const matchScore = useSelector((state) => state.matchScore);
    const mismatchPenanlty = useSelector((state) => state.mismatchPenalty);
    const gapPenalty = useSelector((state) => state.gapPenalty);
    const pattern = /^[AGCT]+$/;
    let inputErr = false;
    if (!inputA.match(pattern) || !inputB.match(pattern)) {
        inputErr = true;
    }

    function callbackAlign(data) {
        if (matchScore>0 && (mismatchPenanlty<0 && gapPenalty<0)) {
            // input score validation
            setAlignment({
                alignA: data.alignA,
                alignB: data.alignB,
                identity: data.identity,
                match: matchScore,
                mismatch: mismatchPenanlty,
                gap: gapPenalty,
            });
            if (scoreErr===true) {
                setErrMsg(false);
            }
        } else {
            setErrMsg(true);
        }
    }

    function onSubmit() {
        setAlignment(undefined);
        // adjust input sequences for same length
        if (inputB.length > 0 && inputA.length > inputB.length) {
            const remain = 'e'.repeat(inputA.length - inputB.length);
            // add trailing gaps 'e', to end of inputB
            setInput({
                seqA: inputA,
                seqB: inputB + remain,
            });
        } else if (inputA.length > 0 && inputB.length > inputA.length) {
            const remain = 'e'.repeat(inputB.length - inputA.length);
            // add trailing gaps 'e', to end of inputA
            setInput({
                seqA: inputA + remain,
                seqB: inputB,
            });
        } else {
            setInput({
                seqA: inputA,
                seqB: inputB,
            });
        }
    }

    return (
        <div>
            <h2>Alignment Game</h2>
            <GameIntroduction/>
            <GameInput/>
            <br />
            <Button
                testid='submitBtn'
                variant="outlined"
                color="secondary"
                disabled={inputErr?true:false}
                onClick={onSubmit} >
                Submit
            </Button>
            {inputErr?
                <div>
                <span style={{color: '#ea0909'}}>invalid input</span>
                </div>:null}
            <br /><br />
            {input ?
                <GameAlign
                    input={input}
                    fetchAlign={callbackAlign} /> :
                <div testid={'inputNotSet'}/>}
            <button style={{display: 'none'}} testid={'testCallback'}
                    onClick={callbackAlign}></button>
            {scoreErr?
                <div testid={'testscore'}>
                    <h3 style={{color: '#ea0909'}}>
                        INVALID SCORING SCHEMA. SUBMIT AGAIN
                         WITH VALID SCORE/PENALTY
                    </h3>
                </div>:
                alignment ? <GameResult aligns={alignment} />:
                <div testid={'alignmentNotSet'}/>}
        </div>
    );
}
