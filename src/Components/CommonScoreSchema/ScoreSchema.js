import React from 'react';
import Grid from '@material-ui/core/Grid';
import NumberInput from './NumberInput';
import {
    setMatchScore, setMisMatchPenalty,
    setGapPenalty,
} from '../../Redux/Actions/Score';

export default function CommonScore(props) {
    return (
        <div>

            <Grid container direction="row" spacing={3}>
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
                        inputHandler={setGapPenalty}
                        inputSelector="gapPenalty"
                        label="Gap Penalty"
                        helperText="Must be a negative integer"
                        acceptedType='-1' />
                </Grid>

            </Grid>
        </div>
    );
}
