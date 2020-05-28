import React from 'react';

import CommonScore from '../CommonScoreSchema/ScoreSchema';
import MSASequencesInput from './Input/MSASequencesInput';
import MSAAlgoSelector from './Input/MSAAlgoSelector';
import {Box, FormLabel} from '@material-ui/core';


export default function MSAInput() {
    return (
        <div>
            <Box boxShadow={3} paddingBottom={3}>
                <MSASequencesInput/>
            </Box>
            <MSAAlgoSelector/>
            <Box boxShadow={3} marginTop={7} marginBottom={7} padding={5}>
                <div>
                    <FormLabel>Define your score schema</FormLabel>
                    <br/><br/>
                    <CommonScore />
                </div>
            </Box>


        </div>
    );
}
