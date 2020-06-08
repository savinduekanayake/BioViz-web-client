import React from 'react';
import PairAlignInput from './PairAlignInput';
import Button from '@material-ui/core/Button';
import {useSelector, useDispatch} from 'react-redux';
import {
    fetchNW, fetchSW,
    fetchNWExtended, fetchSWExtended,
} from '../../API/PairAlign';
import PairAlignResult from './PairAlignResult';
import LoadingOverlay from './LoadingOverlay';
import GenomeTypeInput from '../GeomeType/GenomeTypeInput';
import {Box} from '@material-ui/core';
import {getSubstring} from '../../util/substring';
import {setSnackBar} from '../../Redux/Actions/Snackbar';

/**
 * Wrapper component for PairAlign section
 * @return {React.ReactElement}
 */
export default function PairAlignContent() {
    const dispatch = useDispatch();

    /**
     * state variable to store result from backend
     */
    const [result, setResult] = React.useState(false);

    /**
     * loading status when fetching data
     */
    const [loading, setloading] = React.useState(false);

    /**
     * getting all input data from redux-store
     */
    const genomeType = useSelector((state) => state.genomeType);
    const seqA = getSubstring(useSelector((state) => state.P1));
    const seqAname = useSelector((state) => state.P1.name);
    const seqBname = useSelector((state) => state.P2.name);
    const seqB = getSubstring(useSelector((state) => state.P2));
    const match = useSelector((state) => state.matchScore);
    const mismatch = useSelector((state) => state.mismatchPenalty);
    const gap = useSelector((state) => state.gapPenalty);
    const gapOpen = useSelector((state) => state.gapOpenPenalty);
    const gapExtend = useSelector((state) => state.gapExtendPenalty);
    const scoringMethod = useSelector((state) => state.scoringMethod);
    const tracebackPriority = useSelector((state) => state.tracebackPriority);
    const similarityMatrixName =
        useSelector((state) => state.similarityMatrixName);
    const DNASimilarityMatrix =
        useSelector((state) => state.DNASimilarityMatrix);
    const algo = useSelector((state) => state.pAlgo);


    /**
     * Callback function when data is received
     * @param {Object} data - data from backend API
     */
    const onReceive = (data) => {
        console.log(data);
        setloading(false);
        if (data.error === undefined) {
            setResult({
                result: data.response.result, input: {
                    seqA, seqAname, seqB, seqBname, match,
                    mismatch, gap, gapOpen, gapExtend, scoringMethod,
                    tracebackPriority, similarityMatrixName,
                    DNASimilarityMatrix, genomeType,
                },
            });
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
        setResult(undefined);
        setloading(true);

        /**
         * Selecting backend endpoint
         * according to the algorithm and scoring method
         */
        if (algo === 'GLOBAL') {
            if (scoringMethod === 'BASIC') {
                fetchNW(seqA, seqB, match, mismatch, gap, onReceive);
            } else {
                fetchNWExtended(seqA, seqB, match, mismatch, gapOpen,
                    gapExtend, tracebackPriority, genomeType,
                    similarityMatrixName, DNASimilarityMatrix, onReceive);
            }
        } else {
            if (scoringMethod === 'BASIC') {
                fetchSW(seqA, seqB, match, mismatch, gap, onReceive);
            } else {
                fetchSWExtended(seqA, seqB, match, mismatch, gapOpen,
                    gapExtend, tracebackPriority, genomeType,
                    similarityMatrixName, DNASimilarityMatrix, onReceive);
            }
        }
    };

    return (
        <div>
            <h2>PairAlign Mode</h2>
            <Box boxShadow={3} padding={5} marginBottom={3}>
                <GenomeTypeInput />
            </Box>
            <PairAlignInput />
            <br />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={onSubmit}>
                Submit
            </Button>
            <br />
            {loading ? <LoadingOverlay /> : ''}

            <br />{result ?
                <Box boxShadow={3} padding={2}> <PairAlignResult
                    input={result.input}
                    result={result.result} />
                </Box> :
                ''}

        </div>
    );
}
