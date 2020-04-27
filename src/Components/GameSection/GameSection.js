import React from 'react';
import GameAlign from './GameAlign';
import GameInput from './GameInput';
import GameResult from './GameResult';
import {Button} from '@material-ui/core';
import {useSelector} from 'react-redux';

export default function GameSection() {
    const [input, setInput] = React.useState(undefined);
    const [alignment, setAlignment] = React.useState(undefined);
    const [inputErrorA, setMsgA] = React.useState(false);
    const [inputErrorB, setMsgB] = React.useState(false);
    const inputA = useSelector((state) => state.GameSeqA);
    const inputB = useSelector((state) => state.GameSeqB);
    const matchScore = useSelector((state) => state.matchScore);
    const mismatchPenanlty = useSelector((state) => state.mismatchPenalty);
    const gapPenalty = useSelector((state) => state.gapPenalty);

    function callbackAlign(data) {
        setAlignment({
            alignA: data.alignA,
            alignB: data.alignB,
            match: matchScore,
            mismatch: mismatchPenanlty,
            gap: gapPenalty,
        });
    }

    function onSubmit() {
        setAlignment(undefined);
        // input validation
        const array = ['A', 'C', 'G', 'T', '-'];
        let A = 0; // no invalid characters in inputA
        let B = 0; // no invalid characters in inputB
        for (let i = 0; i < inputA.length; i++) {
            if (!array.includes(inputA.charAt(i))) {
                setMsgA(true);
                A = 1; // invalid character in inputA
                break;
            }
        }
        if (A === 0 && inputErrorA) {
            setMsgA(false);
            // set error msg A to false if there are no invalid characters
            // in current inputA and if there was a error in previous inputA
        }
        for (let j = 0; j < inputB.length; j++) {
            if (!array.includes(inputB.charAt(j))) {
                setMsgB(true);
                B = 1; // invalid character in inputB
                break;
            }
        }
        if (B === 0 && inputErrorB) {
            setMsgB(false);
        }
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
            <GameInput errMsgA={inputErrorA} errMsgB={inputErrorB} />
            <br />
            <Button
                variant="contained"
                color="secondary"
                onClick={onSubmit} >
                Submit
            </Button>
            <br /><br />
            {input ?
                (inputErrorA || inputErrorB) ?
                    <h3 style={{color: '#ea0909'}}>INVALID INPUT.
                    READ INSTRUCTIONS CAREFULLY TO INPUT THE SEQUENCES</h3> :
                    (input.seqA === '' || input.seqB === '') ?
                    <h3 style={{color: '#ea0909'}}>INPUT BOTH SEQUENCES</h3> :
                        <GameAlign
                        input={input}
                        fetchAlign={callbackAlign} /> : ''}
            <br />
            {alignment ? <GameResult aligns={alignment} /> : ''}

        </div>
    );
}
