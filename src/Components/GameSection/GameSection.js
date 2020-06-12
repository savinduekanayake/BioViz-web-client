import React, {useState} from 'react';
import GameAlign from './GameAlign';
import GameInput from './GameInput';
import GameResult from './GameResult';
import {Button} from '@material-ui/core';
import {useSelector} from 'react-redux';
import GameIntroduction from './GameIntroduction';
import validateSequence from '../../Validators/sequence';

/**
 * Component to wrap all the components in Game mode
 * @return {React.ReactElement}
 */
export default function GameSection() {
    /**
     * object to keep input sequences
     */
    const [input, setInput] = useState(undefined);
    /**
     * object to keep align results
     */
    const [alignment, setAlignment] = useState(undefined);
    /**
     * keep error status of input score
     */
    const [scoreErr, setErrMsg] = useState(false);
    const inputA = useSelector((state) => state.GameSeqA);
    const inputB = useSelector((state) => state.GameSeqB);
    const matchScore = useSelector((state) => state.matchScore);
    const mismatchPenanlty = useSelector((state) => state.mismatchPenalty);
    const gapPenalty = useSelector((state) => state.gapPenalty);
    const genomeType = useSelector((state)=>state.genomeType);

    /**
     * input sequence validation
     */
    let inputSeqErr = false;
    if (!validateSequence(inputA, genomeType) ||
    !validateSequence(inputB, genomeType)) {
        inputSeqErr = true;
    }

    /**
     * set align results and validate input scores
     * @param {Object} data - align results from GameAlign Component
     */
    function callbackAlign(data) {
        if (matchScore>0 && (mismatchPenanlty<0 && gapPenalty<0)) {
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

    /**
     * adjust input sequences to same length and set to input object
     */
    function onSubmit() {
        setAlignment(undefined);
        if (inputB.length > 0 && inputA.length > inputB.length) {
            const remain = 'e'.repeat(inputA.length - inputB.length);
            /**
             * add trailing gaps 'e', to end of inputB
             */
            setInput({
                seqA: inputA,
                seqB: inputB + remain,
            });
        } else if (inputA.length > 0 && inputB.length > inputA.length) {
            const remain = 'e'.repeat(inputB.length - inputA.length);
            /**
             * add trailing gaps 'e', to end of inputA
             */
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
                disabled={inputSeqErr?true:false}
                onClick={onSubmit} >
                Submit
            </Button>
            {inputSeqErr?
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
