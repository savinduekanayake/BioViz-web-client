import React from 'react';
import Grid from '@material-ui/core/Grid';
import NumberInput from './NumberInput';
import {
    setMatchScore, setMisMatchPenalty,
    setGapExtendPenalty, setGapOpenPenalty,
} from '../../Redux/Actions/Score';
import TracebackPrioritySelector from './TracebackPrioritySelector';
import SimilarityMatrixInput from './SimilarityMatrixInput';

export default function CommonExtendedScore(props) {
    return (
        <div>
            <Grid container direction='column' spacing={4}>
                <Grid item container direction="row" spacing={3}>
                    <Grid item>
                        <NumberInput
                            inputHandler={setMatchScore}
                            inputSelector="matchScore"
                            label="Match Score"
                            helperText="Must be a positive integer"
                            acceptedType='1' />
                    </Grid>
                    <Grid item>
                        <NumberInput
                            inputHandler={setMisMatchPenalty}
                            inputSelector="mismatchPenalty"
                            label="Mismatch Penalty"
                            helperText="Must be a negative integer"
                            acceptedType='-1' />
                    </Grid>

                    <Grid item>
                        <NumberInput
                            inputHandler={setGapOpenPenalty}
                            inputSelector="gapOpenPenalty"
                            label="Gap Open Penalty"
                            helperText="Must be a negative integer"
                            acceptedType='-1' />
                    </Grid>

                    <Grid item>
                        <NumberInput
                            inputHandler={setGapExtendPenalty}
                            inputSelector="gapExtendPenalty"
                            label="Gap Extend Penalty"
                            helperText="Must be a negative integer"
                            acceptedType='-1' />
                    </Grid>
                    <Grid item>
                        <TracebackPrioritySelector />
                    </Grid>

                </Grid>
                <Grid item>
                    <SimilarityMatrixInput />
                </Grid>
            </Grid>


        </div>
    );
}
