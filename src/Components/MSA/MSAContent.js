import React from 'react';
import MSAInput from './MSAInput';
import {useSelector, useDispatch} from 'react-redux';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import {fetchMSAProgressiveOptimal, fetchMSAProgressive} from '../../API/MSA';
import MSAResult from './MSAResult';
import LoadingOverlay from './LoadingOverlay';
import msaOrderValidate from '../../Validators/MSA/MSAOrderValidator';
import {getSubstring} from '../../util/substring';
import {setSnackBar} from '../../Redux/Actions/Snackbar';
import GenomeTypeInput from '../GeomeType/GenomeTypeInput';

/**
 * Wrapper component for MSA section
 * @return {React.ReactElement}
 */
export default function MSAContent() {
    const dispatch = useDispatch();

    /**
     * state variable to store result from backend
     */
    const [result, setResult] = React.useState(undefined);

    /**
     * loading status when fetching data
     */
    const [loading, setloading] = React.useState(false);

    /**
     * getting all input data from redux-store
     */
    const genomeType = useSelector((state) => state.genomeType);
    const sequences_ = useSelector((state) => state.MSASeq);
    const match = useSelector((state) => state.matchScore);
    const mismatch = useSelector((state) => state.mismatchPenalty);
    const gap = useSelector((state) => state.gapPenalty);
    const msaAlgo = useSelector((state) => state.msaAlgo);
    const msaOrder = useSelector((state) => state.msaOrder);
    const similarityMatrixName =
        useSelector((state) => state.similarityMatrixName);
    const DNASimilarityMatrix =
        useSelector((state) => state.DNASimilarityMatrix);

    /**
     * slicing sequences according to the given range
     */
    const sequences = sequences_.map((element) => getSubstring(element));

    const sequencesNames = sequences_.map((element) => element.name);

    /**
     * Callback function when data is received
     * @param {Object} data - data from backend API
     * @param {Number} data.error - error status
     * @param {Object} data.respone - actual data
     */
    const onReceive = (data) => {
        console.log(data);
        setloading(false);
        if (data.error === undefined) {
            setResult({
                result: data.response.result,
                input: {sequences, sequencesNames, match, mismatch, gap,
                    genomeType, similarityMatrixName, DNASimilarityMatrix}});
        } else if (data.error === 400) {
            dispatch(setSnackBar('Plese check your input'));
        } else {
            dispatch(setSnackBar('Could not load results. Try again later'));
        }
    };

    /**
     * Callback function when Submit button is clicked
     */
    const onSubmit = () => {
        /**
         * selecting the endpoint based on the algorithm type
         */
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
                    genomeType,
                    similarityMatrixName,
                    DNASimilarityMatrix,
                    onReceive);
            } else {
                dispatch(setSnackBar('Invalid pairing order.'));
            }
        } else {
            setResult(undefined);
            setloading(true);
            fetchMSAProgressiveOptimal(
                sequences,
                match,
                mismatch,
                gap,
                genomeType,
                similarityMatrixName,
                DNASimilarityMatrix,
                onReceive);
        }
    };
    return (
        <div>
            <h1>MSA Mode</h1>
            <Box boxShadow={3} padding={5} marginBottom={3}>
                <GenomeTypeInput/>
            </Box>
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
                    <div>
                        <MSAResult
                            result={result.result}
                            input={result.input} />
                    </div>
                </Box> :
                ''}

        </div>
    );
}
