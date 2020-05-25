import React from 'react';
import PairAlignInput from './PairAlignInput';
import Button from '@material-ui/core/Button';
import {useSelector} from 'react-redux';
import {
    fetchNW, fetchSW,
    fetchNWExtended, fetchSWExtended,
} from '../../API/PairAlign';
import PairAlignResult from './PairAlignResult';
import LoadingOverlay from './LoadingOverlay';
import GenomeTypeInput from '../GeomeType/GenomeTypeInput';
import {Box} from '@material-ui/core';
import {getSubstring} from '../../util/substring';

export default function PairAlignContent() {
    const [result, setResult] = React.useState(false);
    const [loading, setloading] = React.useState(false);
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

    const onReceive = (data) => {
        console.log(data);
        setloading(false);
        if (data) {
            setResult({
                result: data.result, input: {
                    seqA, seqAname, seqB, seqBname, match,
                    mismatch, gap, gapOpen, gapExtend, scoringMethod,
                    tracebackPriority, similarityMatrixName,
                    DNASimilarityMatrix, genomeType,
                },
            });
        }
    };

    const onSubmit = () => {
        setResult(undefined);
        setloading(true);
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
            <Box boxShadow={3} padding={5}>
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
