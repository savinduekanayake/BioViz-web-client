import React from 'react';
import PairAlignInput from './PairAlignInput';
import Matrix from './Matrix/Matrix';
import PairAlignAlignment from './PairAlignAlignment';
import Button from '@material-ui/core/Button';
import {useSelector} from 'react-redux';
import {fetchNW} from '../../API/PairAlign';

export default function PairAlignContent() {
    // const [received, setReceived] = React.useState(false);
    const [result, setResult] = React.useState(undefined);

    const onReceive = (data)=>{
        console.log(data);
        if (data) {
            // setReceived(true);
            setResult(data.result);
        }
    };

    const onSubmit = () => {
        fetchNW(seqA, seqB, match, mismatch, gap, onReceive);
    };
    const seqA = useSelector((state)=>state.P1);
    const seqB = useSelector((state)=>state.P2);
    const match = useSelector((state)=>state.matchScore);
    const mismatch = useSelector((state)=>state.mismatchPenalty);
    const gap = useSelector((state)=>state.gapPenalty);
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

            <br />{result ?
            <div><PairAlignAlignment result={result}/><br/>
            <Matrix input={{seqA, seqB}} result={result}/></div> :
            ''}
        </div>
    );
}
