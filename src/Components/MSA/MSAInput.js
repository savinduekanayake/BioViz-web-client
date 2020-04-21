import React from 'react';

import CommonScore from '../CommonScoreSchema/ScoreSchema';
import MSASequencesInput from './Input/MSASequencesInput';
import MSAAlgoSelector from './Input/MSAAlgoSelector';
import {Box} from '@material-ui/core';


export default function MSAInput() {
    return (
        <div>
            <MSASequencesInput/>
            <MSAAlgoSelector/>
            <Box boxShadow={3} marginTop={7} marginBottom={7} padding={5}>
                <CommonScore />
            </Box>


        </div>
    );
}
