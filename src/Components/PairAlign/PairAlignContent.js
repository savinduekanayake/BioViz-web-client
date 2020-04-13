import React from 'react';
import PairAlignInput from './PairAlignInput';
import Button from '@material-ui/core/Button';
import {useSelector} from 'react-redux';
import {fetchNW, fetchSW} from '../../API/PairAlign';
import PairAlignResult from './PairAlignResult';
import LoadingOverlay from './LoadingOverlay';

export default function PairAlignContent() {
    const [result, setResult] = React.useState(undefined);
    const [loading, setloading] = React.useState(false);
    const seqA = useSelector((state) => state.P1);
    const seqB = useSelector((state) => state.P2);
    const match = useSelector((state) => state.matchScore);
    const mismatch = useSelector((state) => state.mismatchPenalty);
    const gap = useSelector((state) => state.gapPenalty);
    const algo = useSelector((state) => state.pAlgo);

    const onReceive = (data) => {
        console.log(data);
        setloading(false);
        if (data) {
            setResult({result: data.result, input: {seqA, seqB}});
        }
    };

    const onSubmit = () => {
        setResult(undefined);
        setloading(true);
        if (algo === '1') {
            fetchNW(seqA, seqB, match, mismatch, gap, onReceive);
        } else {
            fetchSW(seqA, seqB, match, mismatch, gap, onReceive);
        }
    };

    return (
        <div>
            <h2>PairAlign Mode</h2>
            <PairAlignInput />
            <br />
            <Button
                variant="outlined"
                color="secondary"
                onClick={onSubmit}>
                Submit
            </Button>
            <br />
            {loading? <LoadingOverlay/>:''}

            <br />{result ?
                <div> <PairAlignResult
                    input={result.input}
                    result={result.result} />
                </div>:
                ''}

        </div>
    );
}
