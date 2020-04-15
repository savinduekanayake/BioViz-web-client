import React from 'react';
import MSAInput from './MSAInput';
import {useSelector} from 'react-redux';
import Button from '@material-ui/core/Button';

import {fetchMSAProgressiveOptimal} from '../../API/MSA';
import MSAResult from './MSAResult';
import LoadingOverlay from './LoadingOverlay';


export default function MSAContent() {
    const [result, setResult] = React.useState(undefined);
    const [loading, setloading] = React.useState(false);
    const sequences_ = useSelector((state) => state.MSASeq);
    const match = useSelector((state) => state.matchScore);
    const mismatch = useSelector((state) => state.mismatchPenalty);
    const gap = useSelector((state) => state.gapPenalty);

    const sequences = sequences_.map((element)=> element.seq);


    const onReceive = (data) => {
        console.log(data);
        setloading(false);
        if (data) {
            setResult({result: data.result, input: sequences});
        }
    };

    const onSubmit = () => {
        setResult(undefined);
        setloading(true);
        fetchMSAProgressiveOptimal(sequences, match, mismatch, gap, onReceive);
    };
    return (
        <div>
            <MSAInput/>
            <Button
                variant="outlined"
                color="secondary"
                onClick={onSubmit}>
                Submit
            </Button>
            {loading? <LoadingOverlay/>:''}
            <br/>
            {result? <div><MSAResult result={result.result}/></div> :''}

        </div>
    );
}
