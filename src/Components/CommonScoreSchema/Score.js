import React from 'react';
import {useSelector} from 'react-redux';
import CommonScore from './ScoreSchema';
import CommonExtendedScore from './ExtendedScoreSchema';
import {Grid} from '@material-ui/core';
import ScoringMethodSelector from './ScoringMethodSelector';

/**
 * Wrapper component for score schema input.
 * Includes a selector to select between basic and extended score methods
 * @param {Object} props
 * @return {React.ReactElement}
 */
export default function Score() {
    const scoringMethod = useSelector((state) => state.scoringMethod);
    const scoreInput = scoringMethod === 'BASIC' ? <CommonScore /> :
        <CommonExtendedScore />;
    return (
        <div>
            <Grid container direction='column' spacing={2}>
                <Grid item>
                    <ScoringMethodSelector />
                </Grid>
                <Grid item>
                    {scoreInput}
                </Grid>
            </Grid>

        </div>
    );
}
