import React from 'react';
import MSAInput from './MSAInput';
import {useSelector} from 'react-redux';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import {fetchMSAProgressiveOptimal, fetchMSAProgressive} from '../../API/MSA';
import MSAResult from './MSAResult';
import LoadingOverlay from './LoadingOverlay';
import msaOrderValidate from '../../Validators/MSA/MSAOrderValidator';


export default function MSAContent() {
    const [result, setResult] = React.useState(undefined);
    const [loading, setloading] = React.useState(false);
    const sequences_ = useSelector((state) => state.MSASeq);
    const match = useSelector((state) => state.matchScore);
    const mismatch = useSelector((state) => state.mismatchPenalty);
    const gap = useSelector((state) => state.gapPenalty);
    const msaAlgo = useSelector((state) => state.msaAlgo);
    const msaOrder = useSelector((state) => state.msaOrder);


    const sequences = sequences_.map((element) => element.seq);


    const onReceive = (data) => {
        console.log(data);
        setloading(false);
        if (data) {
            setResult({result: data.result, input: sequences});
        }
    };

    const onSubmit = () => {
        if (msaAlgo === '2') {
            if (msaOrderValidate(msaOrder, sequences.length)) {
                setResult(undefined);
                setloading(true);
                fetchMSAProgressive(
                    sequences,
                    msaOrder,
                    match,
                    mismatch,
                    gap,
                    onReceive);
            }
        } else {
            setResult(undefined);
            setloading(true);
            fetchMSAProgressiveOptimal(
                sequences,
                match,
                mismatch,
                gap,
                onReceive);
        }
    };
    return (
        <div>
            <h2>MSA Mode</h2>
            <MSAInput />
            <Button
                variant="contained"
                fullWidth
                color="primary"
                onClick={onSubmit}>
                Submit
            </Button>
            {loading ? <LoadingOverlay /> : ''}
            <br />
            {result ?
                <Box boxShadow={3} padding={3} marginTop={7}>
                    <div><MSAResult result={result.result} /></div>
                </Box> :
                ''}

        </div>
    );
}
